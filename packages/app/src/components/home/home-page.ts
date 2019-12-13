import { saveAs } from 'file-saver';
import m from 'mithril';
import { Button, Icon, Parallax } from 'mithril-materialized';
import { SlimdownView } from 'mithril-ui-form';
import background from '../../assets/background.jpg';
import vws from '../../assets/logo_minvws.svg';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { careProvidersToCSV, csvFilename } from '../../utils';

export const HomePage = () => ({
  view: () => [
    m('.row', [
      m('div', { style: 'margin: 0 0 0 48%;' }, m(`img.img-repsonsive[src=${vws}]`)),
      m(
        'nav',
        m('.nav-wrapper', [
          m('h3.hide-on-small-only', { style: 'padding: 8px 0; margin: 0 0 0 10px;' }, 'Locatieregister Wvggz/Wzd')
        ]),
        m(
          '.overlay.center',
          {
            style: 'position: relative; top: 240px;'
          },
          [
            m(Button, {
              className: 'btn-large',
              label: 'START',
              iconName: 'play_arrow',
              onclick: () => dashboardSvc.switchTo(Dashboards.SEARCH)
            }),
            m(Button, {
              style: 'margin-left: 10px;',
              className: 'btn-large',
              label: 'Download het register als CSV',
              iconName: 'cloud_download',
              onclick: async () => {
                const careProviders = await careProvidersSvc.loadList();
                const csv = careProvidersToCSV(careProviders);
                if (csv) {
                  const blob = new Blob([csv], {
                    type: 'text/plain;charset=utf-8'
                  });
                  saveAs(blob, csvFilename(), { autoBom: true });
                }
              }
            })
          ]
        )
      ),
      m(Parallax, { src: background }),
      m(
        '.section.white',
        { style: 'margin-top: -200px;' },
        m('.row.container.center', [
          m(SlimdownView, {
            md:
              'Het register bevat locaties van zorgaanbieders waarin of van waaruit gedwongen zorg wordt verleend onder de Wet verplichte ggz of de Wet zorg en dwang. Deze wetten bepalen vanaf 1 januari 2020 waar en wanneer gedwongen zorg mag worden toegepast. Het is de verantwoordelijkheid van een zorgaanbieder om locaties te registreren.'
          }),
          m('.row', [
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'search' })),
                m('h5.center', 'Zoek en vind locaties'),
                m('p.light', 'U kunt de locaties zoeken alwaar actieve zorg verleend wordt.')
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'edit' })),
                m('h5.center', 'Registreren en muteren'),
                m(
                  'p.light',
                  'In slechts enkele minuten kunt u uw zorginstelling aanmaken, locaties toevoegen, en de status aanpassen.'
                )
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'link' })),
                m('h5.center', 'Koppelen'),
                m(
                  'p.light',
                  'Indien gewenst kunt u een koppeling leggen met onze database, en zo de meest actuele gegevens in uw eigen omgeving verwerken.'
                )
              ])
            )
          ])
        ])
      )
    ]),
    m(
      'footer',
      m('ul.list-inline.toright', [
        m('li', [m('h2', 'Service'), m('ul', [m('li', m(m.route.Link, { href: 'over' }, 'Contact informatie'))])]),
        m('li', [
          m('h2', 'Over deze site'),
          m('ul', [
            m('li', m('a[href=https://www.dwangindezorg.nl/copyright]', 'Copyright')),
            m('li', m('a[href=https://www.dwangindezorg.nl/privacy]', 'Privacy')),
            m('li', m('a[href=https://www.dwangindezorg.nl/cookies]', 'Cookies')),
            m('li', m('a[href=https://www.dwangindezorg.nl/toegankelijkheid]', 'Toegankelijkheid'))
          ])
        ])
      ])
    )
    // m(
    //   'footer.page-footer',
    //   { style: 'height: 60px; padding: 5px 0;' },
    //   m('.container.center-align',
    //     m('.clearfix', [
    //       m('.white-text', 'Ministerie van Volksgezondheid, Welzijn en Sport'),
    //       m('.white-text', '5 december 2019')
    //     ]))
    // ),
  ]
});
