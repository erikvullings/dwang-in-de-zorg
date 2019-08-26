import m, { FactoryComponent } from 'mithril';
import { FlatButton } from 'mithril-materialized';
import { deepCopy, labelResolver, SlimdownView } from 'mithril-ui-form';
import { IEvent, IPublication } from '../../models';
import { EventsSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { llf } from '../../template/llf';
import { formatOptional } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

export const EventView: FactoryComponent = () => {
  const state = {
    event: {} as Partial<IEvent>,
    loaded: false,
    resolver: labelResolver(llf),
  };

  const showEditors = (event: Partial<IEvent>) => {
    const { resolver } = state;
    const { editors } = event;
    return editors
      ? `<p class="center-align"><i>Editor${editors.length === 1 ? '' : 's'}: ${editors
          .map(
            e =>
              `${e.name}${
                e.country || e.role
                  ? ` (${e.role ? `${e.role}` : ''}${
                      e.country ? `${e.role ? ', ' : ''}${resolver('editors.country', e.country)}` : ''
                    })`
                  : ''
              }`
          )
          .join(', ')}</i></p>`
      : '';
  };

  const showSources = (event: Partial<IEvent>) => {
    const { resolver } = state;
    const { publications } = event;

    const formatPublication = (p: IPublication) =>
      `${p.title}${formatOptional(
        true,
        p.orgTitle,
        p.language === 'other' ? p.otherLanguage : resolver('publications.language', p.language) as string
      )}`;
    return publications
      ? publications.map((p, i) => `${i + 1}. ${formatPublication(p)}`).join('\n')
      : '';
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await EventsSvc.load(m.route.param('id')).catch(r => reject(r));
        state.event = event ? deepCopy(event) : ({} as IEvent);
        state.loaded = true;
        resolve();
      });
    },
    view: () => {
      const { event, loaded, resolver } = state;
      console.log(JSON.stringify(event, null, 2));
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      const { title, desc } = event;

      Object.keys(event).forEach(key => {
        const value = event[key];
        console.log(key, resolver(key, value));
        // if (value instanceof Array && value.repeat) {
        //   value.map(v => Object.keys(v).forEach(k => console.log('  ', k, resolver(`${key}.${k}`, v[k]))));
        // } else {
        //   console.log(key, resolver(key, value));
        // }
      });

      const md = `
<h4 class="center-align">${title}</h4>

${showEditors(event)}

${desc}

${showSources(event)}
      `;
      return [
        m(
          '.row',
          m(
            '.col.s12',
            m(FlatButton, {
              label: 'Edit document',
              iconName: 'edit',
              className: 'right',
              onclick: () => dashboardSvc.switchTo(Dashboards.EDIT, { id: event.$loki }),
            })
          )
        ),
        m('.row', m('.col.s12', m(SlimdownView, { md }))),
      ];
    },
  };
};
