import m from 'mithril';
import { FlatButton, Icon } from 'mithril-materialized';
import { ICareProvider, isLocationActive } from '../../../../common/dist';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { careProvidersSvc } from '../../services/care-providers-service';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { CircularSpinner } from '../ui/preloader';
import { SearchComponent } from '../ui/search-component';

export const EventsList = () => {
  const sortByName: ((a: Partial<ICareProvider>, b: Partial<ICareProvider>) => number) | undefined = (a, b) =>
    (a.naam || '') > (b.naam || '') ? 1 : (a.naam || '') < (b.naam || '') ? -1 : 0;

  const sortByUpdated: ((a: Partial<ICareProvider>, b: Partial<ICareProvider>) => number) | undefined = (a, b) =>
    typeof a.meta === 'undefined' ||
    typeof a.meta.updated === 'undefined' ||
    typeof b.meta === 'undefined' ||
    typeof b.meta.updated === 'undefined'
      ? 0
      : (a.meta.updated || '') > (b.meta.updated || '')
      ? 1
      : (a.meta.updated || '') < (b.meta.updated || '')
      ? -1
      : 0;

  return {
    // oninit: () => careProvidersSvc.loadList(),
    view: () => {
      const careProviders = (careProvidersSvc.getList() || ([] as ICareProvider[]))
        .sort(sortByName)
        .sort(sortByUpdated);
      const filteredCareProviders =
        careProviders
          .filter(
            ev =>
              ev.published || (Auth.authenticated && (Auth.roles.indexOf(Roles.ADMIN) >= 0 || ev.owner === Auth.email))
          )
          .filter((_, i) => i < 24) ||
        // .filter(typeFilter('memberCountries', countryFilter))
        // .filter(typeFilter('eventType', eventTypeFilter))
        // .filter(typeFilter('cmFunctions', cmFunctionFilter))
        // .filter(incidentFilter(incidentTypeFilter))
        [];
      // console.log(JSON.stringify(filteredCareProviders, null, 2));
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
                    careProvidersSvc.new({ naam: 'Naam', owner: Auth.email, published: false });
                    dashboardSvc.switchTo(Dashboards.EDIT, { id: -1 });
                  },
                })
              : undefined,
          ]
        ),
        m(
          '.contentarea',
          filteredCareProviders.length > 0
            ? filteredCareProviders.map(cp =>
                m('.col.s12.m6.xl4', [
                  m(
                    '.card.hoverable',
                    m('.card-content', { style: 'height: 150px;' }, [
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
                          style: 'margin-right: 0',
                          href: `${AppState.apiService}/zorgaanbieders/${cp.$loki}`,
                        },
                        m(Icon, {
                          iconName: 'cloud_download',
                        })
                      ),
                      m(
                        'span.badge',
                        cp.locaties
                          ? `${cp.locaties.length} locatie${cp.locaties.length === 1 ? '' : 's'}, ${cp.locaties.reduce((acc, cur) => acc + (isLocationActive(cur) ? 1 : 0), 0)} actief`
                          : '0 locaties'
                      ),
                    ])
                  ),
                ])
              )
            : m(
                '.row.center-align',
                {
                  style: 'height: 80%; position: relative;',
                },
                m(
                  'div',
                  {
                    style:
                      'position: absolute; width: 100%; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);',
                  },
                  AppState.searchQuery
                    ? AppState.isSearching || AppState.searchQuery.length <= 3
                      ? m('.col.s12', m(CircularSpinner))
                      : m('.col.s12.m8.offset-m2', m('h5', 'Geen resultaten gevonden.'))
                    : m(
                        '.col.s12.m8.offset-m2',
                        m(SearchComponent, {
                          id: 'dummy-search',
                          placeholder: 'Zoek op naam, adres, kvk- of vestigingsnummer',
                          search: q => {
                            AppState.searchQuery = q;
                            const s = document.getElementById('search');
                            if (s) {
                              s.focus();
                            }
                          },
                          query: AppState.searchQuery,
                        })
                      )
                )
              )
        ),
      ]);
    },
  };
};