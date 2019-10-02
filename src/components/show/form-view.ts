import m, { FactoryComponent } from 'mithril';
import { FlatButton, InputCheckbox } from 'mithril-materialized';
import { deepCopy, labelResolver } from 'mithril-ui-form';
import { ICareProvider } from '../../models';
import { CareProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { DisplayForm } from '../../services/display-form';
import { Auth } from '../../services/login-service';
import { CareProviderForm } from '../../template/form';
import { CircularSpinner } from '../ui/preloader';

export const FormView: FactoryComponent = () => {
  const state = {
    event: {} as Partial<ICareProvider>,
    loaded: false,
    resolveObj: labelResolver(CareProviderForm),
  };
  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await CareProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
        state.event = event ? deepCopy(event) : ({} as ICareProvider);
        state.loaded = true;
        resolve();
      });
    },
    view: () => {
      const { event, loaded, resolveObj } = state;
      console.log(JSON.stringify(event, null, 2));
      const resolved = resolveObj<ICareProvider>(event);
      console.log(JSON.stringify(resolved, null, 2));
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      if (!resolved) {
        return undefined;
      }
      return [
        Auth.canEdit(event)
          ? m('ul.do-not-print', [
              m(
                'li',
                m(FlatButton, {
                  label: 'Bewerk zorgaanbieder',
                  iconName: 'edit',
                  className: 'right hide-on-small-only',
                  onclick: () => dashboardSvc.switchTo(Dashboards.EDIT, { id: event.$loki }),
                })
              ),
              m(
                'li',
                m(InputCheckbox, {
                  className: 'left margin-top7',
                  checked: event.published,
                  onchange: async checked => {
                    event.published = checked;
                    await CareProvidersSvc.save(event);
                  },
                  label: 'Publiceer uw wijzigingen',
                })
              ),
            ])
          : undefined,
        m(DisplayForm, { careProvider: resolved }),
      ];
    },
  };
};
