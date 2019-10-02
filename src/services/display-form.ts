import m, { Attributes, FactoryComponent } from 'mithril';
import { InputCheckbox } from 'mithril-materialized';
import { ICareProvider } from '../models';
import { IAddress } from '../models/address';
import { ILocation } from '../models/location';
import { p } from '../utils';

export interface IFormattedEvent extends Attributes {
  careProvider: ICareProvider;
}

const AddressView: FactoryComponent<{ address: IAddress }> = () => {
  return {
    view: ({
      attrs: {
        address: {
          straat,
          huisnummer,
          huisletter,
          huisnummerToevoeging,
          postcode,
          woonplaatsnaam,
          landnaam,
          landnaamBuitenEuropa,
        },
      },
    }) => {
      return m('.row', [
        m('span.col.s12', `${p(straat)} ${p(huisnummer)}${p(huisletter)}${p(huisnummerToevoeging)}`),
        m('span.col.s12', `${p(postcode)}${p(woonplaatsnaam, `, ${woonplaatsnaam}`)}`),
        m('span.col.s12', `${landnaam === 'other' ? p(landnaamBuitenEuropa) : p(landnaam)}`),
      ]);
    },
  };
};

/**
 * Display the form in a format that is useful for the end user.
 */
export const DisplayForm: FactoryComponent<IFormattedEvent> = () => {
  const isLocationActive = (l: ILocation) => {
    const d = Date.now();
    if (!l.datumIngang) {
      return false;
    }
    const s = new Date(l.datumIngang).valueOf();
    const e = l.datumEinde ? new Date(l.datumEinde).valueOf() : Number.MAX_VALUE;
    return s <= d && d <= e;
  };

  const formatDate = (d: string | Date) => new Date(d).toLocaleDateString();

  const locationActiveLabel = (l: ILocation) => {
    const { datumIngang, datumEinde } = l;
    const isActive = isLocationActive(l);
    if (!isActive) {
      return 'Deze locatie is niet actief';
    }
    return datumIngang && datumEinde
      ? `Deze locatie is actief sinds ${formatDate(datumIngang)} tot en met ${formatDate(datumEinde)}.`
      : `Deze locatie is actief sinds ${formatDate(datumIngang)}.`;
  };
  return {
    view: ({ attrs: { careProvider: cp } }) => {
      const { naam, kvk, rechtsvorm, locaties } = cp;

      return m('.row', { key: cp.$loki }, [
        m('.row', m('h4.col.s12.primary-text', naam)),
        m('.row', [m('span.col.s6', 'KvK nummer: ' + kvk), m('span.col.s6', 'Rechtsvorm: ' + rechtsvorm)]),
        m(AddressView, { address: cp }),
        m('.row', m('h5.col.s12', 'Locaties')),
        locaties &&
          locaties.map((l, i) =>
            m('.row', [
              m(
                'h6.col.s12',
                `${i + 1}. ${l.locatienaam}${l.vestigingsnummer ? ` (vestigingsnr. ${l.vestigingsnummer})` : ''}`
              ),
              l.locatieomschrijving && m('p.col.s12', l.locatieomschrijving),
              m(AddressView, { address: l }),
              m('.row', [
                m(InputCheckbox, {
                  className: 'col s12 l4',
                  disabled: true,
                  checked: l.isAccommodatie,
                  label: 'Is een Accomodatie',
                }),
                m(InputCheckbox, {
                  className: 'col s12 l4',
                  disabled: true,
                  checked: l.hasWzdCare,
                  label: 'Levert WZD zorg',
                }),
                m(InputCheckbox, {
                  className: 'col s12 l4',
                  disabled: true,
                  checked: l.hasWvggzCare,
                  label: 'Levert WVGGX zorg',
                }),
              ]),
              m('.row', [
                m(InputCheckbox, {
                  className: 'col s12',
                  disabled: true,
                  checked: isLocationActive(l),
                  label: locationActiveLabel(l),
                }),
              ]),
            ])
          ),
      ]);
    },
  };
};
