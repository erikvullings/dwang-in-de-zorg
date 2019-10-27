import m, { Attributes, FactoryComponent } from 'mithril';
import { Icon } from 'mithril-materialized';
import { stripSpaces } from '../../../../common/dist';

export interface ISearchComponent extends Attributes {
  id?: string;
  query?: string;
  placeholder?: string;
  search: (query: string) => void;
}

export const SearchComponent: FactoryComponent<ISearchComponent> = () => {
  return {
    view: ({ attrs: { search, query, placeholder, id = 'search' } }) => {
      return m(
        'form',
        m('.input-field', [
          m('input[type=search][required]', {
            id,
            value: query,
            placeholder,
            oninput: (e: UIEvent) => {
              if (e.target) {
                const input = e.target as HTMLInputElement;
                search(stripSpaces(input.value));
              }
            },
          }),
          m('label.label-icon', { for: id }, m(Icon, { iconName: 'search' })),
          m(Icon, {
            style: 'top: 0.75rem',
            iconName: 'close',
            onclick: () => {
              const input = document.getElementById('search') as HTMLInputElement;
              if (input) {
                input.value = '';
                search('');
              }
            },
          }),
        ])
      );
    },
  };
};
