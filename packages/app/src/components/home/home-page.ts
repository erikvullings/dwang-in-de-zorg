import { saveAs } from 'file-saver';
import m from 'mithril';
import { Button, Icon, Parallax } from 'mithril-materialized';
import { SlimdownView } from 'mithril-ui-form';
import background from '../../assets/background.jpg';
import logo from '../../assets/locatieregister.svg';
import vws from '../../assets/logo_minvws.svg';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { careProvidersToCSV, padLeft } from '../../utils';

export const HomePage = () => ({
  view: () => [
    m('.row', [
      m('div', { style: 'margin: 0 0 0 48%' }, m(`img.img-repsonsive[src=${vws}]`)),
      m(
        'nav',
        m('.nav-wrapper', [
          m(
            'a.brand-logo[href=#]',
            { style: 'margin: 0 10px 0 20px; left: 20px' },
            m(`img[width=48][height=48][src=${logo}]`, { style: 'margin-top: 5px; margin-left: -5px;' })
          ),
          m('h3.center.hide-on-small-only', { style: 'padding: 10px 0; margin: 0 auto;' }, 'Locatieregister'),
        ]),
        m(
          '.overlay.center',
          {
            style: 'position: relative; top: 240px;',
          },
          [
            m(Button, {
              className: 'btn-large',
              label: 'START',
              iconName: 'play_arrow',
              onclick: () => dashboardSvc.switchTo(Dashboards.SEARCH),
            }),
            m(Button, {
              style: 'margin-left: 10px;',
              className: 'yellow darken-3 btn-large',
              label: 'CSV',
              iconName: 'cloud_download',
              onclick: async () => {
                const now = new Date();
                const careProviders = await careProvidersSvc.loadList();
                const csv = careProvidersToCSV(careProviders);
                if (csv) {
                  const blob = new Blob([csv], {
                    type: 'text/plain;charset=utf-8',
                  });
                  saveAs(
                    blob,
                    `${now.getFullYear()}${padLeft(now.getMonth() + 1, '0')}${padLeft(
                      now.getDate(),
                      '0'
                    )}_locatieregister.csv`,
                    { autoBom: true }
                  );
                }
              },
            }),
          ]
        )
      ),
      m(Parallax, { src: background }),
      m(
        '.section.white',
        m('.row.container.center', [
          m(SlimdownView, {
            md: `## Locatieregister

De Wet zorg en dwang regelt de rechten van mensen met een verstandelijke beperking en mensen met een psychogeriatrische aandoening (zoals dementie) die onvrijwillige zorg krijgen. Daarnaast regelt deze wet ook de onvrijwillige opname. De Wzd gaat op 1 januari 2020 in.

Zorgaanbieders dienen hier alle locaties te registreren alwaar zij deze vorm van zorg geven, en actief de status bij te houden.`,
          }),
          m('.row', [
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'search' })),
                m('h5.center', 'Zoek en vind locaties'),
                m('p.light', 'U kunt de locaties zoeken alwaar actieve zorg verleend wordt.'),
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'edit' })),
                m('h5.center', 'Registreren en muteren'),
                m(
                  'p.light',
                  'In slechts enkele minuten kunt u uw instelling aanmaken, locaties toevoegen, en de status aanpassen.'
                ),
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
                ),
              ])
            ),
          ]),
        ])
      ),
    ]),
    m(
      'footer.page-footer',
      { style: 'height: 60px; padding: 5px 0;' },
      m(
        '.container.center-align',
        m('.clearfix', [m('.white-text', 'Footer text'), m('span', '©2019 VWS, v0.1, Oktober 2019')])
      )
    ),
  ],
});
