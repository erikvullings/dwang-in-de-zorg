import m, { FactoryComponent } from 'mithril';
import { FlatButton, InputCheckbox, TextInput } from 'mithril-materialized';
import { deepCopy, labelResolver } from 'mithril-ui-form';
import { ICareProvider } from '../../../../common/dist';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { DisplayForm } from '../../services/display-form';
import { Auth } from '../../services/login-service';
import { CareProviderForm } from '../../template/form';
import { CircularSpinner } from '../ui/preloader';

export const FormView: FactoryComponent = () => {
  const state = {
    filterValue: '',
    cp: {} as Partial<ICareProvider>,
    loaded: false,
    resolveObj: labelResolver(CareProviderForm),
  };
  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const event = await careProvidersSvc.load(m.route.param('id')).catch(r => reject(r));
        state.cp = event ? deepCopy(event) : ({} as ICareProvider);
        state.loaded = true;
        resolve();
      });
    },
    view: () => {
      const { cp, loaded, resolveObj, filterValue } = state;
      const careProvider = resolveObj<ICareProvider>(cp);
      console.log(JSON.stringify(careProvider, null, 2));
      if (!loaded) {
        return m(CircularSpinner, { className: 'center-align', style: 'margin-top: 20%;' });
      }
      if (!careProvider) {
        return undefined;
      }
      return m('.row', { style: 'margin-top: 1em;' }, [
        m(
          'ul#slide-out.sidenav.sidenav-fixed',
          {
            oncreate: ({ dom }) => {
              M.Sidenav.init(dom);
            },
          },
          [
            m('h4.primary-text', { style: 'margin-left: 0.5em;' }, 'Filter locaties'),
            m(TextInput, {
              label: 'Filter op adres, naam of nummer',
              id: 'filter',
              placeholder: 'Vestigings, adres',
              iconName: 'filter_list',
              onkeyup: (_: KeyboardEvent, v?: string) => (state.filterValue = v ? v : ''),
              style: 'margin-right:100px',
              className: 'col s12',
            }),
            // m(Select, {
            //   placeholder: 'Select one',
            //   label: 'Country',
            //   checkedId: countryFilter,
            //   options: countries,
            //   iconName: 'public',
            //   multiple: true,
            //   onchange: f => (state.countryFilter = f),
            //   className: 'col s12',
            // }),
            m(FlatButton, {
              label: 'Wis alle filters',
              iconName: 'clear_all',
              class: 'col s11',
              style: 'margin: 1em;',
              onclick: () => {
                state.filterValue = '';
              },
            }),
          ]
        ),
        m('.contentarea', [
          Auth.canEdit(cp)
            ? m('ul.do-not-print', [
                m(
                  'li',
                  m(FlatButton, {
                    label: 'Bewerk zorgaanbieder',
                    iconName: 'edit',
                    className: 'right hide-on-small-only',
                    onclick: () => dashboardSvc.switchTo(Dashboards.EDIT, { id: cp.$loki }),
                  })
                ),
                m(
                  'li',
                  m(InputCheckbox, {
                    className: 'left margin-top7',
                    checked: cp.published,
                    onchange: async checked => {
                      cp.published = checked;
                      await careProvidersSvc.save(cp);
                    },
                    label: 'Publiceer uw wijzigingen',
                  })
                ),
              ])
            : undefined,
          m(DisplayForm, { careProvider, filterValue }),
        ]),
      ]);
    },
  };
};
