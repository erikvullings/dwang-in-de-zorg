import { detailedDiff } from 'deep-object-diff';
import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { IActivity, ICareProvider, ILocation, isLocationActive, toQueryTarget } from '../../../../common/dist';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { CareProviderForm } from '../../template/form';
import { capitalizeFirstLetter } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

const log = console.log;

interface ILocationVM extends ILocation, IActivity {
  isActief: boolean;
}

const locationToViewModel = (l: ILocation) => {
  const now = Date.now();
  const lvm = l as ILocationVM;
  const { aantekeningen } = lvm;
  // console.table(lvm);
  if (aantekeningen && aantekeningen instanceof Array && aantekeningen.length > 0) {
    const { datumEinde, datumIngang } = aantekeningen[aantekeningen.length - 1];
    lvm.isActief = isLocationActive(lvm);
    if (!lvm.isActief && datumIngang && datumIngang < now) {
      aantekeningen.push({ createdAt: now });
    } else {
      lvm.datumIngang = datumIngang;
      lvm.datumEinde = datumEinde;
    }
  }
  return lvm;
};

const careProviderToViewModel = (careProvider: Partial<ICareProvider>) => {
  const cp = deepCopy(careProvider);
  if (cp && cp.locaties) {
    cp.locaties = cp.locaties.map(locationToViewModel);
  }
  return cp;
};

const locationFromViewModel = (l: ILocation) => {
  const lvm = l as ILocationVM;
  const { aantekeningen, datumEinde, datumIngang } = lvm;
  delete lvm.isActief;
  delete lvm.datumEinde;
  delete lvm.datumIngang;
  if (aantekeningen && aantekeningen.length > 0) {
    const laatsteAantekening = aantekeningen[aantekeningen.length - 1];
    if (datumIngang) {
      laatsteAantekening.datumIngang = new Date(datumIngang).valueOf();
    }
    if (datumEinde) {
      laatsteAantekening.datumEinde = new Date(datumEinde).valueOf();
    }
  }
  return lvm;
};

const careProviderFromViewModel = (careProvider: Partial<ICareProvider>) => {
  const cp = deepCopy(careProvider);
  if (cp && cp.locaties) {
    cp.locaties = cp.locaties.map(locationFromViewModel);
  }
  return cp;
};

const close = async (e?: UIEvent) => {
  log('closing...');
  m.route.set('/');
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
    form: CareProviderForm,
    error: '',
    /** Relevant context for the Form, can be used with show/disabling */
    context: {
      admin: true,
    },
  };

  const onsubmit = async () => {
    log('submitting...');
    const { cp, originalCareProvider } = state;
    if (cp) {
      // console.log(JSON.stringify(cp, null, 2));
      const restoredCP = toQueryTarget(careProviderFromViewModel(cp));
      const mutation = detailedDiff(originalCareProvider, restoredCP);
      console.log(JSON.stringify(mutation, null, 2));
      await careProvidersSvc.save(restoredCP);
      state.cp = careProviderToViewModel(careProvidersSvc.getCurrent());
    }
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const cp = await careProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
        state.originalCareProvider = cp ? cp : ({} as ICareProvider);
        state.cp = cp ? careProviderToViewModel(cp) : ({} as ICareProvider);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },

    view: () => {
      const { cp, form, context, loaded } = state;
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      const sections = form
        .filter(c => c.type === 'section')
        .map(c => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id),
        }));
      const section = m.route.param('section') || sections[0].id;
      return m('.row', [
        // m(
        //   '.col.s12.l3',
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
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
                label: 'Toon registratie',
                iconName: 'visibility',
                className: 'right col s12',
                onclick: () => dashboardSvc.switchTo(Dashboards.READ, { id: cp.$loki }),
              }),
              // m(Button, {
              //   label: 'Save event',
              //   iconName: 'save',
              //   class: `green col s12 ${hasChanged ? '' : 'disabled'}`,
              //   onclick: onsubmit,
              // }),
              m(Button, {
                modalId: 'delete-event',
                label: 'Verwijder registratie',
                iconName: 'delete',
                class: 'red col s12',
              }),
            ]),
            Auth.isOwner(cp)
              ? m(
                  'li',
                  m(
                    '.col.s12',
                    m(Chips, {
                      label: 'Eigenaar(s)',
                      placeholder: '+email',
                      onchange: async chips => {
                        cp.owner = chips.map(({ tag }) => tag);
                        if (cp.owner.length === 0) {
                          M.toast({ html: 'Er moet minimaal één eigenaar zijn.', classes: 'red' });
                          cp.owner.push(Auth.email);
                        }
                        await onsubmit();
                      },
                      data: (cp.owner || []).map(owner => ({ tag: owner })),
                    })
                  )
                )
              : undefined,
            Auth.canCRUD(cp)
              ? m(
                  'li',
                  m(
                    '.col.s12',
                    m(Chips, {
                      label: 'Wijzigingen toegestaan van',
                      placeholder: '+email',
                      onchange: async chips => {
                        cp.canEdit = chips.map(({ tag }) => tag);
                        await onsubmit();
                      },
                      data: (cp.canEdit || []).map(editor => ({ tag: editor })),
                    })
                  )
                )
              : undefined,
          ]
        ),
        // ),
        m('.contentarea', [
          m(LayoutForm, {
            key: section,
            form,
            obj: cp,
            onchange: async () => {
              // console.log(JSON.stringify(event, null, 2));
              // console.log(JSON.stringify(event.memberCountries, null, 2));
              // state.cp = cp;
              // console.log(JSON.stringify(cp, null, 2));
              // const mutation = detailedDiff(state.originalCareProvider, cp);
              // console.log(JSON.stringify(mutation, null, 2));
              await onsubmit();
            },
            context,
            section,
          }),
        ]),
        m(ModalPanel, {
          id: 'delete-event',
          title: 'Verwijder registratie',
          description: 'Weet u zeker dat u deze registratie wilt verwijderen? U kunt dit niet ongedaan maken.',
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Delete',
              onclick: async () => {
                careProvidersSvc.delete(cp.$loki);
                close();
              },
            },
            {
              label: 'Discard',
            },
          ],
        }),
      ]);
    },
  };
};
