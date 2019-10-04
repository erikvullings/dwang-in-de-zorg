import m from 'mithril';
import { FlatButton, Icon, Select, TextInput } from 'mithril-materialized';
import { ICareProvider } from '../../models';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { CareProvidersSvc } from '../../services/care-providers-service';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { countries } from '../../template/form';
import { nameAndDescriptionFilter as nameAndKvkFilter } from '../../utils';

export const EventsList = () => {
  const state = {
    filterValue: '',
    countryFilter: [],
    eventTypeFilter: [],
    incidentTypeFilter: [],
    cmFunctionFilter: [],
  } as {
    countryFilter: Array<string | number>;
    filterValue: string;
  };

  const sortByName: ((a: Partial<ICareProvider>, b: Partial<ICareProvider>) => number) | undefined = (a, b) =>
    (a.naam || '') > (b.naam || '') ? 1 : (a.naam || '') < (b.naam || '') ? -1 : 0;

  return {
    oninit: () => CareProvidersSvc.loadList(),
    view: () => {
      const { countryFilter } = state;
      const events = (CareProvidersSvc.getList() || ([] as ICareProvider[])).sort(sortByName);
      const query = nameAndKvkFilter(state.filterValue);
      const filteredCareProviders =
        events
          .filter(
            ev =>
              ev.published || (Auth.authenticated && (Auth.roles.indexOf(Roles.ADMIN) >= 0 || ev.owner === Auth.email))
          )
          .filter(query)
          .filter((_, i) => i < 24) ||
        // .filter(typeFilter('memberCountries', countryFilter))
        // .filter(typeFilter('eventType', eventTypeFilter))
        // .filter(typeFilter('cmFunctions', cmFunctionFilter))
        // .filter(incidentFilter(incidentTypeFilter))
        [];
      console.log(JSON.stringify(filteredCareProviders, null, 2));
      return m('.row', { style: 'margin-top: 1em;' }, [
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            Auth.authenticated
              ? m(FlatButton, {
                  label: 'Nieuwe zorgaanbieder',
                  iconName: 'add',
                  class: 'col s11 indigo darken-4 white-text',
                  style: 'margin: 1em;',
                  onclick: () => {
                    CareProvidersSvc.new({ naam: 'Naam', owner: Auth.email, published: false });
                    dashboardSvc.switchTo(Dashboards.EDIT, { id: -1 });
                  },
                })
              : undefined,
            m('h4.primary-text', { style: 'margin-left: 0.5em;' }, 'Filter locaties'),
            m(TextInput, {
              label: 'Text filter',
              id: 'filter',
              placeholder: 'Part of title or description...',
              iconName: 'filter_list',
              onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? v : ''),
              style: 'margin-right:100px',
              className: 'col s12',
            }),
            m(Select, {
              placeholder: 'Select one',
              label: 'Country',
              checkedId: countryFilter,
              options: countries,
              iconName: 'public',
              multiple: true,
              onchange: f => (state.countryFilter = f),
              className: 'col s12',
            }),
            // m(Select, {
            //   placeholder: 'Select one',
            //   label: 'Event type',
            //   checkedId: eventTypeFilter,
            //   options: eventTypes,
            //   iconName: 'event_note',
            //   multiple: true,
            //   onchange: f => (state.eventTypeFilter = f),
            //   className: 'col s12',
            // }),
            // m(Select, {
            //   placeholder: 'Select one',
            //   label: 'Incident',
            //   checkedId: incidentTypeFilter,
            //   options: incidentTypes,
            //   iconName: 'flash_on',
            //   multiple: true,
            //   onchange: f => (state.incidentTypeFilter = f as string[]),
            //   className: 'col s12',
            // }),
            // m(Select, {
            //   placeholder: 'Select one',
            //   label: 'CM function',
            //   checkedId: cmFunctionFilter,
            //   options: cmFunctions,
            //   iconName: 'notifications_active',
            //   multiple: true,
            //   onchange: f => (state.cmFunctionFilter = f),
            //   className: 'col s12',
            //   dropdownOptions: { container: 'body' as any },
            // }),
            m(FlatButton, {
              label: 'Wis alle filters',
              iconName: 'clear_all',
              class: 'col s11',
              style: 'margin: 1em;',
              onclick: () => {
                state.filterValue = '';
                state.countryFilter.length = 0;
              },
            }),
          ]
        ),
        m(
          '.contentarea',
          filteredCareProviders.map(cp =>
            m('.col.s12.m6.xl4', [
              m(
                '.card.hoverable',
                m('.card-content', { style: 'height: 100px;' }, [
                  m(
                    m.route.Link,
                    {
                      className: 'card-title',
                      href: dashboardSvc.route(Dashboards.READ).replace(':id', `${cp.$loki}`),
                    },
                    cp.naam || 'Untitled'
                  ),
                  m('p.light.block-with-text', cp.kvk),
                ]),
                m('.card-action', [
                  m(
                    'a',
                    {
                      target: '_blank',
                      href: `${AppState.apiService()}/events/${cp.$loki}`,
                    },
                    m(Icon, {
                      className: 'white-text',
                      iconName: 'cloud_download',
                    })
                  ),
                  m(
                    'span.badge',
                    cp.locaties ? `${cp.locaties.length} locatie${cp.locaties.length === 1 ? '' : 's'}` : '0 locaties'
                  ),
                ])
              ),
            ])
          )
        ),
      ]);
      // return m('.events-list', [
      //   m('.row', [
      //     m(FlatButton, {
      //       label: 'Add event',
      //       iconName: 'add',
      //       class: 'green input-field right btn-medium',
      //       style: 'margin: 1em 1em 0 0;',
      //       onclick: () => {
      //         EventsSvc.new({ title: 'New event' });
      //         dashboardSvc.switchTo(Dashboards.EDIT, { id: -1 });
      //       },
      //     }),
      //     m(TextInput, {
      //       label: 'Text filter of events',
      //       id: 'filter',
      //       iconName: 'filter_list',
      //       onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? v : ''),
      //       style: 'margin-right:100px',
      //       className: 'col s12 l4',
      //     }),
      //     m(Select, {
      //       placeholder: 'Select one',
      //       label: 'Event type filter',
      //       inline: true,
      //       checkedId: filter,
      //       options: eventTypes.map(o => ({ label: capitalizeFirstLetter(o.id), ...o })),
      //       onchange: f => state.filter = f,
      //       className: 'col s12 l4'
      //     }),
      //   ]),
      //   m('.row', m('p', 'Available events.')),
      //   m(
      //     '.row',
      //     filteredEvents.map(event =>
      //       m('.col.s12.l4', [
      //         m(
      //           '.card.hoverable',
      //           m('.card-content', { style: 'height: 150px;' }, [
      //             m(
      //               m.route.Link,
      //               {
      //                 className: 'card-title',
      //                 href: dashboardSvc.route(Dashboards.READ).replace(':id', `${event.$loki}`),
      //               },
      //               event.name || 'Untitled'
      //             ),
      //             m('p.light.block-with-text', event.desc),
      //           ]),
      //           m('.card-action', [
      //             m(
      //               'a',
      //               {
      //                 target: '_blank',
      //                 href: `${AppState.apiService()}/lessons/${event.$loki}`,
      //               },
      //               m(Icon, {
      //                 iconName: 'cloud_download',
      //               })
      //             ),
      //             m(
      //               'span.badge',
      //               `${
      //                 event.lessons
      //                   ? event.lessons.length === 1
      //                     ? '1 lesson'
      //                     : `${event.lessons.length} lessons`
      //                   : '0 lessons'
      //               }`
      //             ),
      //           ])
      //         ),
      //       ])
      //     )
      //   ),
      // ]);
    },
  };
};
