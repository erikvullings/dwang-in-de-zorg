import m from 'mithril';
import { Icon, RoundIconButton, Select, TextInput } from 'mithril-materialized';
import { IEvent } from '../../models';
import { AppState } from '../../models/app-state';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { EventsSvc } from '../../services/events-service';
import { eventTypes } from '../../template/llf';
import { capitalizeFirstLetter, titleAndDescriptionFilter } from '../../utils';

export const EventsList = () => {
  const state = {
    filterValue: '',
    filter: []
  } as {
    filter: Array<string | number>;
    filterValue: string;
  };
  return {
    oninit: () => EventsSvc.loadList(),
    view: () => {
      const { filter } = state;
      const events = EventsSvc.getList() || [] as IEvent[];
      const query = titleAndDescriptionFilter(state.filterValue);
      const filteredEvents = events.filter(query);
      return m('.events-list', [
        m('.row', [
          m(RoundIconButton, {
            iconName: 'add',
            class: 'green input-field right btn-medium',
            style: 'margin: 1em 1em 0 0;',
            onclick: () => {
              EventsSvc.new({ title: 'New event' });
              dashboardSvc.switchTo(Dashboards.EDIT, { id: -1 });
            },
          }),
          m(TextInput, {
            label: 'Filter',
            id: 'filter',
            iconName: 'filter_list',
            onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? v : ''),
            style: 'margin-right:100px',
            className: 'col s4',
          }),
          m(Select, {
            placeholder: 'Pick one or more',
            label: 'Event type',
            inline: true,
            multiple: true,
            checkedId: filter,
            options: eventTypes.map(o => ({ label: capitalizeFirstLetter(o.id), ...o })),
            onchange: f => state.filter = f,
            className: 'col s4'
          }),
        ]),
        m(
          '.row.sb.large',
          filteredEvents.map(event =>
            m('.col.s6.l4', [
              m(
                '.card.hoverable',
                m('.card-content', { style: 'height: 150px;' }, [
                  m(
                    m.route.Link,
                    {
                      className: 'card-title',
                      href: dashboardSvc.route(Dashboards.READ).replace(':id', `${event.$loki}`),
                    },
                    event.title || 'Untitled'
                  ),
                  m('p.light.block-with-text', event.desc),
                ]),
                m('.card-action', [
                  m(
                    'a',
                    {
                      target: '_blank',
                      href: `${AppState.apiService()}/lessons/${event.$loki}`,
                    },
                    m(Icon, {
                      iconName: 'cloud_download',
                    })
                  ),
                  m(
                    'span.badge',
                    `${
                      event.lessons
                        ? event.lessons.length === 1
                          ? '1 lesson'
                          : `${event.lessons.length} lessons`
                        : '0 lessons'
                    }`
                  ),
                ])
              ),
            ])
          )
        ),
      ]);
    },
  };
};
