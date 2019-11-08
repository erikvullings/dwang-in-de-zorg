import m from 'mithril';
import { FlatButton, Pagination, TextInput } from 'mithril-materialized';
import { ICareProvider, stripSpaces } from '../../../../common/dist';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { careProvidersSvc } from '../../services/care-providers-service';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { debounce, range, slice } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

export const EventsList = () => {
  const state = {
    searchValue: '',
  };

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

  /**
   * Function to filter case-insensitive name and description.
   * @param filterValue Filter text
   */
  const cpFilter = (filterValue?: string) => {
    if (!filterValue) {
      return () => true;
    }
    const fv = stripSpaces(filterValue.toLowerCase()) as string;
    return (content: Partial<ICareProvider>) =>
      (content.target && content.target.indexOf(fv) >= 0) ||
      (content.locaties &&
        content.locaties.some(loc => {
          return loc.target && loc.target.indexOf(fv) >= 0;
        }));
  };

  const search = debounce((query: string) => careProvidersSvc.search(query), 400);
  const paginationSize = 20;

  return {
    oninit: () => careProvidersSvc.loadFilteredList(),
    view: () => {
      const careProviders = (careProvidersSvc.getList() || ([] as ICareProvider[]))
        .sort(sortByUpdated)
        .sort(sortByName);
      console.log(JSON.stringify(careProviders, null, 2));
      if (AppState.isSearching) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 40%;' });
      }
      const filteredCareProviders = careProviders.filter(
        cp => cp.published || (Auth.isAuthenticated && (Auth.roles.indexOf(Roles.ADMIN) >= 0 || Auth.canEdit(cp)))
      );

      const route = dashboardSvc.route(Dashboards.SEARCH);
      const page = m.route.param('page') ? +m.route.param('page') : 1;
      const curPage = filteredCareProviders && (page - 1) * paginationSize < filteredCareProviders.length ? page : 1;
      const pagedCareProviders =
        filteredCareProviders &&
        filteredCareProviders.filter(slice((curPage - 1) * paginationSize, curPage * paginationSize));

      const maxPages = Math.ceil(filteredCareProviders.length / paginationSize);

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
            m('h5', { style: 'margin: 1.2em 0em 0 0.5em' }, 'Zoek zorgaanbieders'),
            Auth.isAuthenticated
              ? m(FlatButton, {
                  label: 'Nieuwe zorgaanbieder',
                  iconName: 'add',
                  class: 'col s11 indigo darken-4 white-text',
                  style: 'margin: 1em;',
                  onclick: async () => {
                    const cp = await careProvidersSvc.create({
                      naam: 'Zorgaanbieder',
                      owner: [Auth.username],
                      published: false,
                    });
                    if (cp) {
                      dashboardSvc.switchTo(Dashboards.EDIT, { id: cp.$loki });
                    }
                  },
                })
              : undefined,
            m(TextInput, {
              placeholder: 'Naam, kvk, adres...',
              id: 'search',
              iconName: 'search',
              initialValue: AppState.searchQuery,
              onkeyup: (_: KeyboardEvent, v?: string) => {
                AppState.searchQuery = v ? v : '';
                search(AppState.searchQuery);
              },
              style: 'margin-right:100px',
              className: 'col s12',
            }),
          ]
        ),
        m(
          '.contentarea',
          pagedCareProviders.length > 0 && [
            m('.row', m('.col.s12', [m('h5', 'Zorgaanbieders')])),

            m(
              '.row',
              m('ul.nowrap', [
                m('li', [
                  m('span.col.s7', m('b', 'Naam')),
                  m('span.col.s3', m('b', 'Woonplaats')),
                  m('span.col.s2', m('b', 'KvK')),
                ]),
                pagedCareProviders.map(cp =>
                  m(
                    'li.clickable',
                    {
                      onclick: () => m.route.set(dashboardSvc.route(Dashboards.READ).replace(':id', `${cp.$loki}`)),
                    },
                    [m('span.col.s7', cp.naam), m('span.col.s3', cp.wn), m('span.col.s2', cp.kvk)]
                  )
                ),
              ]),
              maxPages > 1 &&
                m(
                  '.row',
                  m(
                    '.right',
                    m(Pagination, {
                      curPage,
                      items: range(1, maxPages).map(i => ({
                        href: `${route}?page=${i}`,
                      })),
                    })
                  )
                )
              // m('.col.s12.m6.xl4', [
              //   m(
              //     '.card.hoverable',
              //     m('.card-content', { style: 'height: 150px;' }, [
              //       m(
              //         m.route.Link,
              //         {
              //           className: 'card-title',
              //           href: dashboardSvc.route(Dashboards.READ).replace(':id', `${cp.$loki}`),
              //         },
              //         cp.naam || 'Untitled'
              //       ),
              //       m('p.light.block-with-text', cp.kvk),
              //     ]),
              //     m('.card-action', [
              //       m(
              //         'a',
              //         {
              //           target: '_blank',
              //           style: 'margin-right: 0',
              //           onclick: () => {
              //             const csv = careProviderToCSV(cp);
              //             const blob = new Blob([csv], {
              //               type: 'text/plain;charset=utf-8',
              //             });
              //             saveAs(blob, `${cp.naam}.csv`, { autoBom: true });
              //           },
              //         },
              //         m(Icon, {
              //           iconName: 'cloud_download',
              //           style: 'cursor: pointer;',
              //         })
              //       ),
              //       m(
              //         'span.badge',
              //         cp.locaties
              //           ? `${cp.locaties.length} locatie${cp.locaties.length === 1 ? '' : 's'}, ${cp.locaties.reduce(
              //               (acc, cur) => acc + (isLocationActive(cur) ? 1 : 0),
              //               0
              //             )} actief`
              //           : '0 locaties'
              //       ),
              //     ])
              //   ),
              // ])
            ),
          ]
          // : m(
          //     '.row.center-align',
          //     {
          //       style: 'height: 80%; position: relative;',
          //     },
          //     m(
          //       'div',
          //       {
          //         style:
          //           'position: absolute; width: 100%; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);',
          //       },
          //       AppState.searchQuery
          //         ? AppState.isSearching || AppState.searchQuery.length <= 3
          //           ? m('.col.s12', m(CircularSpinner))
          //           : m('.col.s12.m8.offset-m2', m('h5', 'Geen resultaten gevonden.'))
          //         : m(
          //             '.col.s12.m8.offset-m2',
          //             m(SearchComponent, {
          //               id: 'dummy-search',
          //               placeholder: 'Zoek op naam, adres, kvk of vestiging',
          //               search: q => {
          //                 AppState.searchQuery = q;
          //                 const s = document.getElementById('search');
          //                 if (s) {
          //                   s.focus();
          //                 }
          //               },
          //               query: AppState.searchQuery,
          //             })
          //           )
          //     )
          //   )
        ),
      ]);
    },
  };
};
