import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

const md = `<h4 class="primary-text">Over deze applicatie</h4>
`;

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md }),
      // m('.row', m('img', { src: driverLogo, width: 300, height: 151, style: 'display: block; margin: 0 auto;' })),
    ]),
});
