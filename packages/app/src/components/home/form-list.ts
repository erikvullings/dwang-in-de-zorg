import m from 'mithril';
import { FlatButton, Pagination, TextInput } from 'mithril-materialized';
import { ICareProvider, stripSpaces } from '../../../../common/dist';
import { AppState } from '../../models/app-state';
import { Roles } from '../../models/roles';
import { careProvidersSvc } from '../../services/care-providers-service';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { Auth } from '../../services/login-service';
import { careProvidersToCSV, csvFilename, debounce, kvkToAddress, range, slice } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

export const EventsList = () => {
  const state = {
    newKvk: '',
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

  // /**
  //  * Function to filter case-insensitive name and description.
  //  * @param filterValue Filter text
  //  */
  // const cpFilter = (filterValue?: string) => {
  //   if (!filterValue) {
  //     return () => true;
  //   }
  //   const fv = stripSpaces(filterValue.toLowerCase()) as string;
  //   return (content: Partial<ICareProvider>) =>
  //     (content.target && content.target.indexOf(fv) >= 0) ||
  //     (content.locaties &&
  //       content.locaties.some(loc => {
  //         return loc.target && loc.target.indexOf(fv) >= 0;
  //       }));
  // };

  const search = debounce((query: string) => careProvidersSvc.search(query), 400);
  const paginationSize = 20;

  const visitCareProvider = (id?: string | number) =>
    id && m.route.set(dashboardSvc.route(Dashboards.READ).replace(':id', `${id}`));

  return {
    oninit: () => careProvidersSvc.loadFilteredList(),
    view: () => {
      const careProviders = (careProvidersSvc.getList() || ([] as ICareProvider[]))
        .sort(sortByUpdated)
        .sort(sortByName);
      // console.log(JSON.stringify(careProviders, null, 2));
      if (AppState.isSearching) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 40%;' });
      }
      const filteredCareProviders = careProviders.filter(
        cp => cp.published || (Auth.isAuthenticated && (Auth.roles.indexOf(Roles.ADMIN) >= 0 || Auth.canEdit(cp)))
      );

      const { newKvk: newKvK } = state;
      const route = dashboardSvc.route(Dashboards.SEARCH);
      const page = m.route.param('page') ? +m.route.param('page') : 1;
      const curPage = filteredCareProviders && (page - 1) * paginationSize < filteredCareProviders.length ? page : 1;
      const pagedCareProviders =
        filteredCareProviders &&
        filteredCareProviders.filter(slice((curPage - 1) * paginationSize, curPage * paginationSize));

      const maxPages = Math.ceil(filteredCareProviders.length / paginationSize);
      const lastVisited = window.localStorage.getItem('last_visited');
      const lastVisitedName = (window.localStorage.getItem('last_visited_name') || '').replace(/undefined/i, '');

      const canCreateNewCareProvider = Auth.isAdmin()
        ? newKvK && careProvidersSvc.checkKvk(newKvK)
        : Auth.isAuthenticated && !careProvidersSvc.checkKvk(Auth.username);
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
            (Auth.isAdmin() || canCreateNewCareProvider) &&
              m(FlatButton, {
                label: 'Nieuwe zorgaanbieder',
                iconName: 'add',
                disabled: canCreateNewCareProvider,
                class: 'col s11 indigo darken-4 white-text',
                style: 'margin: 1em;',
                onclick: async () => {
                  const kvk = Auth.isAdmin() ? newKvK : Auth.username;
                  const newCp = await kvkToAddress(kvk, {
                    kvk,
                    owner: [Auth.username],
                    published: true,
                  } as ICareProvider);
                  if (newCp) {
                    const cp = await careProvidersSvc.create(newCp);
                    if (cp) {
                      dashboardSvc.switchTo(Dashboards.EDIT, { id: cp.$loki });
                    }
                  }
                },
              }),
            Auth.isAdmin() &&
              m(TextInput, {
                placeholder: 'KvK nieuwe zorgaanbieder',
                iconName: 'create',
                style: 'margin-top: -1em',
                className: 'col s12',
                initialValue: newKvK,
                onchange: v => (state.newKvk = v),
              }),
            m('h5', { style: 'margin: 1.2em 0em 0 0.5em' }, 'Zoek zorgaanbieders'),
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
            m(
              '.option-buttons',
              lastVisited &&
                lastVisitedName &&
                m(FlatButton, {
                  label: lastVisitedName,
                  iconName: 'link',
                  class: 'col s12',
                  onclick: () => visitCareProvider(lastVisited),
                }),
              m(FlatButton, {
                label: AppState.searchQuery ? 'Download selectie als CSV' : 'Download register als CSV',
                iconName: 'cloud_download',
                class: 'col s12',
                onclick: async () => {
                  const cps = AppState.searchQuery ? filteredCareProviders : await careProvidersSvc.loadList();
                  const csv = careProvidersToCSV(cps);
                  if (csv) {
                    const blob = new Blob([csv], {
                      type: 'text/plain;charset=utf-8',
                    });
                    saveAs(blob, csvFilename(AppState.searchQuery), { autoBom: true });
                  }
                },
              })
            ),
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
                      onclick: () => cp && visitCareProvider(cp.$loki),
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
            ),
          ]
        ),
      ]);
    },
  };
};
