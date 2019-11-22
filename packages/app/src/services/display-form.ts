import m, { Attributes, FactoryComponent } from 'mithril';
import { FlatButton, Pagination } from 'mithril-materialized';
import { labelResolver, SlimdownView } from 'mithril-ui-form';
import { IAddress, ICareProvider, ILocation, isLocationActive } from '../../../common/dist';
import { CircularSpinner } from '../components/ui/preloader';
import { CareProviderForm } from '../template/form';
import { generateLocationReport, p, range, slice, targetFilter } from '../utils';
import { Dashboards, dashboardSvc } from './dashboard-service';

export interface IFormattedEvent extends Attributes {
  careProvider: Partial<ICareProvider>;
  filterValue?: string;
  isActive?: boolean;
  isWzd?: boolean;
  isWvggz?: boolean;
}

const AddressView: FactoryComponent<{ address: Partial<IAddress> }> = () => {
  return {
    view: ({
      attrs: {
        address: { str: straat, hn: huisnummer, toev: huisnummerToevoeging, pc: postcode, wn: woonplaatsnaam },
      },
    }) => {
      return m(
        'span.col.s12',
        `${p(straat)} ${p(huisnummer)}${p(huisnummerToevoeging)}, ${p(postcode)}, ${p(woonplaatsnaam)}`
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
    resolveObj: labelResolver(CareProviderForm),
  } as {
    resolveObj: <T>(obj: any, parent?: string | undefined) => T | undefined;
    showDetails?: string;
  };

  const uniqueLocationIdentifier = (l: ILocation) => `${p(l.pc)}${p(l.hn)}${p(l.toev)}`;

  return {
    view: ({ attrs: { careProvider: cp, filterValue, isActive, isWvggz, isWzd } }) => {
      if (!cp) {
        m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      const { naam, kvk, aanv, locaties = [], $loki } = cp;
      const { showDetails, resolveObj } = state;

      const careProvider = resolveObj<ICareProvider>(cp) as ICareProvider;
      const { rechtsvorm } = careProvider;
      const query = targetFilter(filterValue);
      const route = dashboardSvc.route(Dashboards.READ).replace(':id', `${$loki}`);

      const activeLocations =
        locaties && locaties.length > 0 ? locaties.reduce((acc, cur) => acc + (isLocationActive(cur) ? 1 : 0), 0) : 0;

      const queryResults = query
        ? locaties &&
          locaties
            .filter(query)
            .filter(l => !isWzd || l.isWzd)
            .filter(l => !isWvggz || l.isWvggz)
            .filter(l => !isActive || isLocationActive(l))
        : locaties;
      const page = m.route.param('page') ? +m.route.param('page') : 1;
      const curPage = queryResults && (page - 1) * paginationSize < queryResults.length ? page : 1;
      const filteredLocations =
        queryResults && queryResults.filter(slice((curPage - 1) * paginationSize, curPage * paginationSize));

      const maxPages = Math.ceil(queryResults.length / paginationSize);

      return m('.row', { key: cp.$loki }, [
        m('.row', m('h4.col.s12.primary-text', naam)),
        m('.row', [
          m('span.col.s12', 'KvK nummer: ' + kvk),
          m('span.col.s12', 'Rechtsvorm: ' + p(rechtsvorm)),
          m(AddressView, { address: cp }),
          aanv && m('span.col.s12', `Aanvullende adresinformatie: ${aanv}`),
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
              m('span.col.s5', m('b', 'Locatie')),
              m('span.col.s5', m('b', 'Adres')),
              m('span.col.s1', { style: 'padding-right: 0;' }, m('b', 'Wet')),
              m('span.col.s1', { style: 'padding-right: 0;' }, m('b', 'Actief')),
            ]),
            ...filteredLocations.map(l =>
              m(
                'li.clickable',
                {
                  onclick: () => (state.showDetails = uniqueLocationIdentifier(l)),
                },
                [
                  m('span.col.s5', `${p(l.naam)} ${p(l.nmr, `, #${l.nmr}`)}`),
                  m('span.col.s5', `${p(l.str)} ${p(l.hn)}${p(l.toev)}, ${p(l.pc)}, ${p(l.wn)}`),
                  m('span.col.s1', `${l.isWzd && l.isWvggz ? 'Beide' : l.isWzd ? 'Wzd' : l.isWvggz ? 'Wvggz' : ''}`),
                  m('span.col.s1', `${isLocationActive(l) ? 'Ja' : 'Nee'}`),
                  showDetails === uniqueLocationIdentifier(l)
                    ? m('.col.s12.card.wrap', [
                        m(FlatButton, {
                          className: 'right',
                          iconName: 'close',
                          onclick: (e: UIEvent) => {
                            state.showDetails = undefined;
                            e.stopPropagation();
                          },
                        }),
                        m(SlimdownView, { className: 'col s12 location', md: generateLocationReport(l) }),
                      ])
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
                items: range(1, maxPages).map(i => ({
                  href: `${route}?page=${i}`,
                })),
              })
            )
          ),
      ]);
    },
  };
};
