import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { ICareProvider, toQueryTarget, ILocation, IActivity, isLocationActive } from '../../../../common/dist';
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
  // const wasActief =
  //   laatsteAantekening.datumIngang < now && (!laatsteAantekening.datumEinde || laatsteAantekening.datumEinde > now);
  // if (isActief && !wasActief) {
  //   // became active, so create a new aantekening
  //   aantekeningen.push({ createdAt: now, datumIngang, datumEinde });
  // } else if (!isActief) {
  //   // stopped being active
  //   laatsteAantekening.datumEinde = datumEinde;
  // }
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
    const { cp } = state;
    if (cp) {
      // const event = deepCopy(state.event);
      // console.log(JSON.stringify(event.memberCountries, null, 2));
      await careProvidersSvc.save(toQueryTarget(careProviderFromViewModel(cp)));
      state.cp = careProviderToViewModel(careProvidersSvc.getCurrent());
    }
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const cp = await careProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
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
            Auth.canCRUD(cp)
              ? m(
                  'li',
                  m(
                    '.col.s12',
                    m(Chips, {
                      label: 'Wijzigingen toegestaan van',
                      placeholder: '+email',
                      onchange: chips => {
                        cp.canEdit = chips.map(({ tag }) => tag);
                        m.redraw();
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
