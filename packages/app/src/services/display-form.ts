import m, { Attributes, FactoryComponent } from 'mithril';
import { Pagination } from 'mithril-materialized';
import { Form, LayoutForm } from 'mithril-ui-form';
import { IAddress, ICareProvider, ILocation, isLocationActive } from '../../../common/dist';
import { CareForm } from '../template/form';
import { p, range, slice, targetFilter } from '../utils';
import { Dashboards, dashboardSvc } from './dashboard-service';

export interface IFormattedEvent extends Attributes {
  careProvider: ICareProvider;
  filterValue?: string;
}

const AddressView: FactoryComponent<{ address: IAddress }> = () => {
  return {
    view: ({
      attrs: {
        address: {
          straat,
          huisnummer,
          huisletter,
          huisnummerToevoeging,
          postcode,
          woonplaatsnaam,
          landnaam,
          landnaamBuitenEuropa,
        },
      },
    }) => {
      return m(
        'span.col.s12',
        `${p(straat)} ${p(huisnummer)}${p(huisletter)}${p(huisnummerToevoeging)}, ${p(postcode)}${p(
          woonplaatsnaam,
          `, ${woonplaatsnaam}, ${landnaam === 'other' ? p(landnaamBuitenEuropa) : p(landnaam)}`
        )}`
      );
    },
  };
};

const paginationSize = 20;

/**
 * Display the form in a format that is useful for the end user.
 */
export const DisplayForm: FactoryComponent<IFormattedEvent> = () => {
  const state = {
    showDetails: undefined,
  } as {
    showDetails?: string;
  };

  const ignoredIdsInCareForm = ['isActief', 'datumIngang', 'datumEinde'];

  const abbreviatedCareForm = CareForm.reduce((acc, cur) => {
    const { id } = cur;
    if (!id || ignoredIdsInCareForm.indexOf(id) < 0) {
      acc.push(cur);
    }
    return acc;
  }, [] as Form);

  const getStartDate = (l: ILocation) => {
    if (l.aantekeningen) {
      const di = l.aantekeningen[l.aantekeningen.length - 1].datumIngang;
      return di ? new Date(di).toLocaleDateString() : '';
    }
    return '';
  };

  const uniqueLocationIdentifier = (l: ILocation) =>
    `${p(l.postcode)}${p(l.huisnummer)}${p(l.huisnummer)}${p(l.huisnummerToevoeging)}`;

  return {
    view: ({ attrs: { careProvider: cp, filterValue } }) => {
      const { naam, kvk, rechtsvorm, locaties, $loki } = cp;
      const { showDetails } = state;
      const query = targetFilter(filterValue);
      const route = dashboardSvc.route(Dashboards.READ).replace(':id', `${$loki}`);

      const activeLocations =
        locaties && locaties.length > 0 ? locaties.reduce((acc, cur) => acc + (isLocationActive(cur) ? 1 : 0), 0) : 0;

      const queryResults = query ? locaties && locaties.filter(query) : locaties;
      const page = m.route.param('page') ? +m.route.param('page') : 1;
      const curPage = queryResults && page * paginationSize < queryResults.length ? page : 1;
      const filteredLocations =
        queryResults && queryResults.filter(slice((curPage - 1) * paginationSize, curPage * paginationSize));

      const maxPages = Math.ceil(queryResults.length / paginationSize);

      return m('.row', { key: cp.$loki }, [
        m('.row', m('h4.col.s12.primary-text', naam)),
        m('.row', [
          m('span.col.s12', 'KvK nummer: ' + kvk),
          m('span.col.s12', 'Rechtsvorm: ' + p(rechtsvorm)),
          m(AddressView, { address: cp }),
        ]),
        m(
          '.row',
          m('.col.s12', [
            m('h5', 'Locaties'),
            locaties &&
              locaties.length > 0 &&
              m(
                'p',
                `${naam} heeft in totaal ${locaties.length} locatie${locaties.length === 1 ? '' : 's'}, waarvan ${
                  activeLocations === 0 ? 'geen enkele actief' : `${activeLocations} actief`
                }.`
              ),
          ])
        ),
        m(
          '.row',
          m('ul.nowrap', [
            m('li', [
              m('span.col.s3', m('b', 'Locatie')),
              m('span.col.s4', m('b', 'Adres')),
              m('span.col.s1', { style: 'padding-right: 0;' }, m('b', 'Accomodatie')),
              m('span.col.s1', { style: 'padding-right: 0;' }, m('b', 'WZD')),
              m('span.col.s1', { style: 'padding-right: 0;' }, m('b', 'WVGGZ')),
              m('span.col.s2', m('b', 'Actief')),
            ]),
            ...filteredLocations.map(l =>
              m(
                'li.clickable',
                {
                  onclick: () => {
                    const sd = uniqueLocationIdentifier(l);
                    state.showDetails = showDetails === sd ? undefined : sd;
                  },
                },
                [
                  m('span.col.s3', `${p(l.locatienaam)} ${p(l.vestigingsnummer, `, #${l.vestigingsnummer}`)}`),
                  m(
                    'span.col.s4',
                    `${p(l.straat)} ${p(l.huisnummer)}${p(l.huisletter)}${p(l.huisnummerToevoeging)}, ${p(
                      l.postcode
                    )}, ${p(l.woonplaatsnaam)}`
                  ),
                  m('span.col.s1', `${l.isAccommodatie ? 'ja' : ''}`),
                  m('span.col.s1', `${l.isWzd ? 'ja' : ''}`),
                  m('span.col.s1', `${l.isWvggz ? 'ja' : ''}`),
                  m(
                    'span.col.s2',
                    `${
                      isLocationActive(l)
                        ? `Sinds ${getStartDate(l)}`
                        : getStartDate(l)
                        ? `Vanaf ${getStartDate(l)}`
                        : ''
                    }`
                  ),
                  showDetails === uniqueLocationIdentifier(l)
                    ? m('.col.s12.card.wrap', m(LayoutForm, {
                      form: abbreviatedCareForm,
                      obj: l,
                      disabled: true,
                    }))
                    : undefined,
                ]
              )
            ),
          ])
        ),
        maxPages > 1 &&
          m(
            '.row',
            m(
              '.right',
              m(Pagination, {
                curPage,
                items: range(0, maxPages).map(i => ({
                  href: `${route}?page=${i + 1}`,
                })),
              })
            )
          ),
      ]);
    },
  };
};
