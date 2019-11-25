import m, { FactoryComponent } from 'mithril';
import { FlatButton, InputCheckbox, TextInput } from 'mithril-materialized';
import { deepCopy } from 'mithril-ui-form';
import { ICareProvider, stripSpaces } from '../../../../common/dist';
import { careProvidersSvc } from '../../services';
import { Dashboards, dashboardSvc } from '../../services/dashboard-service';
import { DisplayForm } from '../../services/display-form';
import { Auth } from '../../services/login-service';
import { careProviderToCSV, csvFilename, jsonFilename } from '../../utils';
import { CircularSpinner } from '../ui/preloader';

export const FormView: FactoryComponent = () => {
  const state = {
    filterValue: '',
    // Voor 2020
    // isActive: true,
    isActive: false,
    isWzd: false,
    isWvggz: false,
    careProvider: {} as Partial<ICareProvider>,
    loaded: false
  };

  return {
    oninit: () => {
      return new Promise(async (resolve, reject) => {
        const cp = await careProvidersSvc
          .load(m.route.param('id'))
          .catch(r => reject(r));
        state.careProvider = cp ? deepCopy(cp) : ({} as ICareProvider);
        state.loaded = true;
        if (cp) {
          window.localStorage.setItem('last_visited', `${cp.$loki}`);
          window.localStorage.setItem('last_visited_name', `${cp.naam}`);
        }
        resolve();
      });
    },
    view: () => {
      const {
        careProvider,
        loaded,
        filterValue,
        isActive,
        isWzd,
        isWvggz
      } = state;
      // console.log(JSON.stringify(careProvider, null, 2));
      if (!loaded) {
        return m(CircularSpinner, {
          className: 'center-align',
          style: 'margin-top: 20%;'
        });
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
            }
          },
          [
            m(
              'h4.primary-text',
              { style: 'margin-left: 0.5em;' },
              'Filter locaties'
            ),
            m(TextInput, {
              label: 'Filter op adres, naam of nummer',
              id: 'filter',
              placeholder: 'Vestigings, adres',
              iconName: 'filter_list',
              onkeyup: (_: KeyboardEvent, v?: string) =>
                (state.filterValue = v ? stripSpaces(v) : ''),
              style: 'margin-right:100px',
              className: 'col s12'
            }),
            m(InputCheckbox, {
              label: 'Filter actieve locaties',
              checked: isActive,
              onchange: f => (state.isActive = f),
              className: 'col s12'
            }),
            m(InputCheckbox, {
              label: 'Filter Wzd locaties',
              checked: isWzd,
              onchange: f => (state.isWzd = f),
              className: 'col s12'
            }),
            m(InputCheckbox, {
              label: 'Filter Wvggz locaties',
              checked: isWvggz,
              onchange: f => (state.isWvggz = f),
              className: 'col s12'
            }),
            m('.option-buttons', [
              m(FlatButton, {
                label: 'Wis alle filters',
                iconName: 'clear_all',
                class: 'col s11',
                style: 'margin: 1em;',
                onclick: () => {
                  state.filterValue = '';
                }
              }),
              m(FlatButton, {
                label: 'Download selectie als CSV',
                iconName: 'cloud_download',
                class: 'col s11',
                style: 'margin: 0 1em;',
                onclick: () => {
                  const csv = careProviderToCSV(careProvider);
                  const blob = new Blob([csv], {
                    type: 'text/plain;charset=utf-8'
                  });
                  saveAs(blob, csvFilename(careProvider.naam), {
                    autoBom: true
                  });
                }
              }),
              m(FlatButton, {
                label: 'Download selectie als JSON',
                iconName: 'cloud_download',
                class: 'col s11',
                style: 'margin: 0 1em;',
                onclick: () => {
                  const blob = new Blob(
                    [JSON.stringify(careProvider, null, 2)],
                    {
                      type: 'application/json'
                    }
                  );
                  saveAs(blob, jsonFilename(careProvider.naam), {
                    autoBom: true
                  });
                }
              })
            ])
          ]
        ),
        m('.contentarea', [
          Auth.canEdit(careProvider)
            ? m('ul.do-not-print', [
                m(
                  'li',
                  m(FlatButton, {
                    label: 'Bewerk zorgaanbieder',
                    iconName: 'edit',
                    className: 'right hide-on-small-only',
                    onclick: () =>
                      dashboardSvc.switchTo(Dashboards.EDIT, {
                        id: careProvider.$loki
                      })
                  })
                )
              ])
            : undefined,
          m(DisplayForm, {
            careProvider,
            filterValue,
            isActive,
            isWzd,
            isWvggz
          })
        ])
      ]);
    }
  };
};
