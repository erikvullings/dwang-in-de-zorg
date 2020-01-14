import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, FileInput, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { createPatch } from 'rfc6902';
import {
  IActivity,
  ICareProvider,
  ILocation,
  IMutation,
  isLocationActive,
  toQueryTarget
} from '../../../../common/dist';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { pdokLocationSvc } from '../../services/pdok-service';
import { CareProviderForm } from '../../template/form';
import { capitalizeFirstLetter, importCsv, kvkToAddress } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

interface ILocationVM extends ILocation, IActivity {
  isActief: boolean;
}

const locationToViewModel = (l: ILocation) => {
  const now = Date.now();
  const lvm = l as ILocationVM;
  const { aant } = lvm;
  // console.table(lvm);
  if (aant && aant instanceof Array && aant.length > 0) {
    const { de, di } = aant[aant.length - 1];
    lvm.isActief = isLocationActive(lvm);
    if (!lvm.isActief && di && di < now) {
      aant.push({ dc: now });
    } else {
      lvm.di = di;
      lvm.de = de;
    }
  }
  return lvm;
};

const careProviderToViewModel = (cp: Partial<ICareProvider>) => {
  if (cp && cp.locaties) {
    cp.locaties = cp.locaties.map(locationToViewModel);
  }
  return cp;
};

const locationFromViewModel = (l: ILocation) => {
  const lvm = l as ILocationVM;
  const { aant, de, di } = lvm;
  delete lvm.isActief;
  delete lvm.de;
  delete lvm.di;
  if (aant && aant.length > 0) {
    const laatsteAantekening = aant[aant.length - 1];
    if (!laatsteAantekening.di) {
      laatsteAantekening.dc = Date.now();
    }
    if (di) {
      laatsteAantekening.di = new Date(di).valueOf();
    } else {
      delete laatsteAantekening.di;
    }
    if (de) {
      laatsteAantekening.de = new Date(de).valueOf();
    } else {
      delete laatsteAantekening.de;
    }
  } else if (di) {
    lvm.aant = [{ dc: Date.now(), di }];
  }
  return lvm;
};

const careProviderFromViewModel = (cp: Partial<ICareProvider>) => {
  if (cp && cp.locaties) {
    cp.locaties = cp.locaties.map(locationFromViewModel);
  }
  return cp;
};

const close = async (e?: UIEvent) => {
  // log('closing...');
  dashboardSvc.switchTo(Dashboards.SEARCH);
  if (e) {
    e.preventDefault();
  }
};

export const EditForm = () => {
  const state = {
    cp: {} as Partial<ICareProvider>,
    originalCareProvider: {} as Partial<ICareProvider>,
    loaded: false,
    isValid: false,
    form: Auth.isAdmin() ? CareProviderForm(true) : CareProviderForm(false),
    error: '',
    /** Relevant context for the Form, can be used with show/disabling */
    context: {
      admin: true
    },
    canSave: false,
    csvImport: false,
    isBusy: false
  };

  /** Remove empty/non-informative fields from mutating the locations.aant array */
  // const cleanup = (mut: IMutation) => {
  //   if (!mut.added || !mut.added.locaties) { return mut; }

  // };

  const onsubmit = async () => {
    // log('submitting...');
    state.canSave = false;
    const { cp, originalCareProvider, csvImport } = state;
    if (cp) {
      // console.log(JSON.stringify(cp, null, 2));
      if (csvImport) {
        state.csvImport = false;
        await careProvidersSvc.save(careProviderFromViewModel(cp));
      } else {
        const restoredCP = toQueryTarget(careProviderFromViewModel(cp));
        const mutation = {
          editor: Auth.email,
          docId: cp.$loki!,
          saveChanges: 'mutaties',
          patch: createPatch(originalCareProvider, restoredCP)
        } as IMutation;
        await careProvidersSvc.patch(restoredCP, mutation);
      }
      state.originalCareProvider = deepCopy(careProvidersSvc.getCurrent());
      state.cp = careProviderToViewModel(careProvidersSvc.getCurrent());
    }
  };

  const formChanged = (cp?: Partial<ICareProvider>, section?: string) => {
    const locaties = 'locaties';
    state.canSave = true;
    if (!cp) {
      return;
    }
    if (!section || section.toLowerCase() !== locaties) {
      return;
    }
    const i = m.route.param(locaties) ? +m.route.param(locaties) - 1 : 0;
    if (cp && cp.locaties && cp.locaties.length > i) {
      const loc = cp.locaties[i];
      // console.log(JSON.stringify(loc, null, 2));
      const { originalCareProvider: ocp } = state;
      const orgKvk = ocp ? ocp.kvk : 0;
      const orgLoc = ocp && ocp.locaties && ocp.locaties[i] ? ocp.locaties[i] : undefined;
      const orgLocNmr = orgLoc ? orgLoc.nmr : undefined;
      const orgLocPc = orgLoc ? orgLoc.pc : undefined;
      const orgLocHn = orgLoc ? orgLoc.hn : undefined;
      // console.table({
      //   kvk: cp.kvk, orgKvk, nmr: loc.nmr, orgLocNmr, pc: loc.pc, orgLocPc, hn: loc.hn, orgLocHn
      // });
      if (cp.kvk && (orgKvk !== cp.kvk || orgLocNmr !== loc.nmr)) {
        kvkToAddress(cp.kvk, loc, loc.nmr);
      } else if (loc.pc && loc.hn && (loc.pc !== orgLocPc || loc.hn !== orgLocHn)) {
        pdokLocationSvc(loc);
      }
      if (!loc.isWzd) {
        loc.isWzdAcco = 'nee';
        loc.isWzdAmbu = 'nee';
      }
      if (loc.isWzdAcco === 'nee') {
        loc.isWzdAmbu = 'nee';
      }
      if (!loc.isWvggz) {
        loc.isWvggzAcco = 'nee';
        loc.isWvggzAmbu = 'nee';
        loc.zv = undefined;
      }
      if (loc.isWvggzAcco === 'nee') {
        loc.isWvggzAmbu = 'nee';
      }
      loc.mutated = Date.now();
      // console.log('Mutated on ' + new Date());
      m.redraw();
    }
  };

  const onUnload = (e: BeforeUnloadEvent) => {
    if (!state.canSave) {
      return undefined;
    }
    const confirmationMessage =
      'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
  };

  return {
    oninit: () => {
      window.addEventListener('beforeunload', onUnload);
      return new Promise(async (resolve, reject) => {
        const cp = await careProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
        state.originalCareProvider = cp ? deepCopy(cp) : ({} as ICareProvider);
        state.cp = cp ? careProviderToViewModel(cp) : ({} as ICareProvider);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },
    onremove: () => window.removeEventListener('beforeunload', onUnload),
    view: () => {
      const { cp, form, context, loaded, canSave } = state;
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      const sections = form
        .filter(c => c.type === 'section')
        .map(c => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id)
        }));
      const section = m.route.param('section') || sections[0].id;
      const canCrud = Auth.canCRUD(cp);
      const canEdit = Auth.canEdit(cp);

      return m('.row', [
        // m(
        //   '.col.s12.l3',
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            }
          },
          [
            m('h5.primary-text', { style: 'margin-left: 20px;' }, 'Registratieformulier'),
            ...sections.map(s =>
              m(
                'li',
                m(
                  m.route.Link,
                  { href: dashboardSvc.route(Dashboards.EDIT).replace(':id', `${cp.$loki}?section=${s.id}`) },
                  m('span.primary-text', s.title)
                )
              )
            ),
            m('.buttons', [
              m(Button, {
                label: 'Wijzigingen annuleren',
                disabled: !canSave,
                iconName: 'clear_all',
                className: 'right col s12',
                onclick: async () => {
                  const newCp = await careProvidersSvc.load(cp.$loki);
                  if (newCp) {
                    state.originalCareProvider = deepCopy(newCp);
                    state.cp = careProviderToViewModel(newCp);
                    state.canSave = false;
                  }
                }
              }),
              m(Button, {
                label: 'Bewaar wijzigingen',
                iconName: 'save',
                class: `green col s12 ${canSave ? '' : 'disabled'}`,
                onclick: async () => {
                  await onsubmit();
                }
              }),
              Auth.isAdmin() &&
                m(Button, {
                  modalId: 'delete-cp',
                  label: 'Verwijder registratie',
                  iconName: 'delete',
                  class: 'red col s12'
                })
            ]),
            Auth.isOwner(cp) &&
              m(
                'li',
                m(
                  '.col.s12',
                  m(Chips, {
                    label: 'Eigenaar(s)',
                    placeholder: '+gebruikersnaam',
                    onchange: async chips => {
                      cp.owner = chips.map(({ tag }) => tag);
                      if (cp.owner.length === 0) {
                        M.toast({ html: 'Er moet minimaal één eigenaar zijn.', classes: 'red' });
                        cp.owner.push(Auth.username);
                      }
                      await onsubmit();
                    },
                    data: (cp.owner || []).map(owner => ({ tag: owner }))
                  })
                )
              ),
            canCrud &&
              m(
                'li',
                m(
                  '.col.s12',
                  m(Chips, {
                    label: 'Wijzigingen toegestaan van',
                    placeholder: '+gebruikersnaam',
                    onchange: async chips => {
                      cp.canEdit = chips.map(({ tag }) => tag);
                      await onsubmit();
                    },
                    data: (cp.canEdit || []).map(editor => ({ tag: editor }))
                  })
                )
              ),
            Auth.isAdmin() &&
              m(FileInput, {
                placeholder: 'Importeer en vervang locaties',
                multiple: false,
                accept: ['.csv', 'text/csv', 'application/vnd.ms-excel'],
                onchange: async (files: FileList) => {
                  state.isBusy = true;
                  importCsv(state.cp, files)
                    .then(_ => {
                      state.canSave = state.csvImport = true;
                      state.cp = careProviderToViewModel(state.cp);
                      m.redraw();
                    })
                    .catch(e =>
                      M.toast({ html: `Bij het verwerken van de CSV is iets misgegaan: ${e}`, classes: 'red' })
                    )
                    .finally(() => (state.isBusy = false));
                }
              })
          ]
        ),
        state.isBusy
          ? m(CircularSpinner, {
              className: 'center-align',
              style: 'margin-top: 40%;'
            })
          : m('.contentarea', [
              m(LayoutForm, {
                key: section,
                form,
                obj: cp,
                disabled: !canEdit,
                onchange: () => formChanged(state.cp, section),
                context,
                section
              })
            ]),
        m(ModalPanel, {
          id: 'delete-cp',
          title: 'Verwijder registratie',
          description: 'Weet u zeker dat u deze registratie wilt verwijderen? U kunt dit niet ongedaan maken.',
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Verwijder',
              onclick: async () => {
                careProvidersSvc.delete(cp.$loki);
                close();
              }
            },
            {
              label: 'Afbreken'
            }
          ]
        })
      ]);
    }
  };
};
