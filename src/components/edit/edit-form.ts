import M from 'materialize-css';
import m from 'mithril';
import { Button, Chips, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { ICareProvider } from '../../models';
import { CareProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { CareProviderForm } from '../../template/form';
import { capitalizeFirstLetter, toQueryTarget } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

const log = console.log;

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
      await CareProvidersSvc.save(toQueryTarget(cp));
      state.cp = CareProvidersSvc.getCurrent();
    }
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await CareProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
        state.cp = event ? deepCopy(event) : ({} as ICareProvider);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },

    view: () => {
      const { cp: event, form, context, loaded } = state;
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      // log(event);
      const sections = form
        .filter(c => c.type === 'section')
        .map(c => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id),
        }));
      const section = m.route.param('section') || sections[0].id;
      return m('.row', [
        m(
          '.col.s12.l3',
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
                    { href: dashboardSvc.route(Dashboards.EDIT).replace(':id', `${event.$loki}?section=${s.id}`) },
                    m('span.primary-text', s.title)
                  )
                )
              ),
              m('.buttons', [
                m(Button, {
                  label: 'Toon registratie',
                  iconName: 'visibility',
                  className: 'right col s12',
                  onclick: () => dashboardSvc.switchTo(Dashboards.READ, { id: event.$loki }),
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
              Auth.canCRUD(event)
                ? m(
                    'li',
                    m(
                      '.col.s12',
                      m(Chips, {
                        label: 'Wijzigingen toegestaan van',
                        placeholder: '+email',
                        onchange: chips => {
                          event.canEdit = chips.map(({ tag }) => tag);
                          m.redraw();
                        },
                        data: (event.canEdit || []).map(editor => ({ tag: editor })),
                      })
                    )
                  )
                : undefined,
            ]
          )
        ),
        m('.col.s12.l9', [
          m(LayoutForm, {
            key: section,
            form,
            obj: event,
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
                CareProvidersSvc.delete(event.$loki);
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
