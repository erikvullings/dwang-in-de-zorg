import m from 'mithril';
import { Button, ModalPanel } from 'mithril-materialized';
import { deepCopy, LayoutForm } from 'mithril-ui-form';
import { IEvent } from '../../models';
import { EventsSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { llf } from '../../template/llf';
import { capitalizeFirstLetter, deepEqual } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

const log = console.log;

const close = async (e?: UIEvent) => {
  log('closing...');
  m.route.set('/');
  if (e) {
    e.preventDefault();
  }
};

export const EventForm = () => {
  const state = {
    event: {} as Partial<IEvent>,
    loaded: false,
    isValid: false,
    form: llf,
    error: '',
    /** Relevant context for the Form, can be used with show/disabling */
    context: {
      admin: true,
    },
    section: '',
  };

  const onsubmit = async (e: MouseEvent) => {
    log('submitting...');
    e.preventDefault();
    if (state.event) {
      await EventsSvc.save(state.event);
      state.event = deepCopy(EventsSvc.getCurrent());
    }
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await EventsSvc.load(m.route.param('id')).catch(r => reject(r));
        state.event = event ? deepCopy(event) : ({} as IEvent);
        state.loaded = true;
        m.redraw();
        resolve();
      });
    },

    view: () => {
      const { event, form, context, loaded } = state;
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      log(event);
      const hasChanged = !deepEqual(event, EventsSvc.getCurrent());
      const sections = form
        .filter(c => c.type === 'section')
        .map(c => ({
          style: 'cursor: pointer;',
          id: c.id,
          title: c.label || capitalizeFirstLetter(c.id),
          onclick: (e: UIEvent) => {
            e.preventDefault();
            state.section = c.id || '';
          },
        }));
      const section = state.section || sections[0].id;
      return m('.row', [
        m(
          '.col.s12.m3',
          m(
            'ul#slide-out.sidenav.sidenav-fixed',
            {
              oninit: () => {
                const elems = document.querySelectorAll('.sidenav');
                M.Sidenav.init(elems);
              },
            },
            [
              m('h4', { style: 'margin-left: 20px;' }, 'Content'),
              ...sections.map(s => m('li', m('a[href=!#]', { onclick: s.onclick }, s.title))),
              m('.buttons', [
                m(Button, {
                  label: 'Show event',
                  iconName: 'visibility',
                  className: 'right col s12',
                  onclick: () => dashboardSvc.switchTo(Dashboards.READ, { id: event.$loki }),
                }),
                m(Button, {
                  label: 'Save event',
                  iconName: 'save',
                  class: `green col s12 ${hasChanged ? '' : 'disabled'}`,
                  onclick: onsubmit,
                }),
                m(Button, {
                  modalId: 'delete-event',
                  label: 'Delete event',
                  iconName: 'delete',
                  class: 'red col s12',
                }),
              ]),
            ]
          )
        ),
        m('.col.s12.m9', [
          m(LayoutForm, {
            key: section,
            form,
            obj: event,
            onchange: () => console.log(JSON.stringify(event, null, 2)),
            context,
            section,
          }),
        ]),
        m(ModalPanel, {
          id: 'delete-event',
          title: 'Delete event',
          description: 'Do you really want to delete this event - there is no way back?',
          options: { opacity: 0.7 },
          buttons: [
            {
              label: 'Delete',
              onclick: async () => {
                EventsSvc.delete(event.$loki);
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
