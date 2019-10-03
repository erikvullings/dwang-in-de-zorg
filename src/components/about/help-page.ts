import m from 'mithril';
import { SlimdownView } from 'mithril-ui-form';

const md = `<h4 class="primary-text">Handleiding Locatieregister</h4>
<h5 class="primary-text">Zoeken</h5>`;

export const HelpPage = () => ({
  view: () =>
    m('.row', [
      m(SlimdownView, { md }),
      // m('img.responsive-img', { src: l3, style: 'margin: 0 auto; padding: 0 10px' }),
    ]),
});
