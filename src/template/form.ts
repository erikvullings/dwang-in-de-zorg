import { Form } from 'mithril-ui-form';

// const sortByLabel: ((a: { id: string; label: string }, b: { id: string; label: string }) => number) | undefined = (
//   a,
//   b
// ) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0);

export const countries = [
  {
    id: 'netherlands',
    label: 'Nederland',
  },
  {
    id: 'austria',
    label: 'Oostenrijk',
  },
  {
    id: 'belgium',
    label: 'België',
  },
  {
    id: 'bulgaria',
    label: 'Bulgarije',
  },
  {
    id: 'croatia',
    label: 'Kroatië',
  },
  {
    id: 'cyprus',
    label: 'Cyprus',
  },
  {
    id: 'czech_republic',
    label: 'Tsjechië',
  },
  {
    id: 'denmark',
    label: 'Denemarken',
  },
  {
    id: 'estonia',
    label: 'Estonië',
  },
  {
    id: 'finland',
    label: 'Finland',
  },
  {
    id: 'france',
    label: 'Frankrijk',
  },
  {
    id: 'germany',
    label: 'Duitsland',
  },
  {
    id: 'greece',
    label: 'Griekenland',
  },
  {
    id: 'hungary',
    label: 'Hungarije',
  },
  {
    id: 'ireland',
    label: 'Ierland',
  },
  {
    id: 'italy',
    label: 'Itali:e',
  },
  {
    id: 'latvia',
    label: 'Letland',
  },
  {
    id: 'lithuania',
    label: 'Litouwen',
  },
  {
    id: 'luxembourg',
    label: 'Luxemburg',
  },
  {
    id: 'malta',
    label: 'Malta',
  },
  {
    id: 'poland',
    label: 'Polen',
  },
  {
    id: 'portugal',
    label: 'Portugal',
  },
  {
    id: 'romania',
    label: 'Romanië',
  },
  {
    id: 'slovakia',
    label: 'Slovakije',
  },
  {
    id: 'slovenia',
    label: 'Slovenië',
  },
  {
    id: 'spain',
    label: 'Spanje',
  },
  {
    id: 'united_kingdom',
    label: 'Engeland',
  },
  {
    id: 'sweden',
    label: 'Zweden',
  },
  {
    id: 'other',
    label: 'Land buiten Europa',
  },
];

const ActivityForm: Form = [
  { type: 'md', value: '###### Activiteit/aantekening' },
  { id: 'datumIngang', label: 'Ingangsdatum', type: 'date', required: true, className: 'col s6' },
  { id: 'datumEinde', label: 'Einddatum', type: 'date', className: 'col s6' },
];

/** Zorgvorm formulier */
const CareForm: Form = [
  { type: 'md', value: '###### Welke type zorg wordt geleverd?' },
  { id: 'zorgvorm', type: 'text', required: true, className: 'col s12' },
  { id: 'isAmbulantGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is ambulant geleverd?' },
  { id: 'isKlinischGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is klinisch geleverd?' },
  ...ActivityForm,
];

const AddressForm: Form = [
  { type: 'md', value: `&nbsp;
###### Adresgegevens` },
  { id: 'postcode', label: 'Postcode', type: 'text', className: 'col s6 m4' },
  { id: 'huisnummer', label: 'Huisnummer', type: 'number', className: 'col s6 m2' },
  { id: 'huisletter', label: 'Huisletter', type: 'text', className: 'col s6 m2' },
  { id: 'huisnummerToevoeging', label: 'Toevoeging', type: 'text', className: 'col s6 m4' },
  { id: 'straat', label: 'Straat', type: 'text', className: 'col s12 l6' },
  { id: 'woonplaatsnaam', label: 'Woonplaats', type: 'text', className: 'col s12 l6' },
  { id: 'landnaam', label: 'Land', value: 'netherlands', type: 'select', options: countries, className: 'col s12 m6' },
  {
    id: 'landnaamBuitenEuropa',
    label: 'Land buiten Europa',
    type: 'text',
    show: ['landnaam=other'],
    className: 'col s12 m6',
  },
];

const LocationForm: Form = [
  { type: 'md', value: '##### Locatiegegevens' },
  { id: 'locatienaam', type: 'text', required: true, className: 'col s12 m6' },
  { id: 'vestigingsnummer', type: 'number', className: 'col s12 m6' },
  { id: 'locatieomschrijving', type: 'textarea' },
  { id: 'isEenAccommodatie', label: 'Is een accomodatie?', type: 'checkbox', className: 'col s6 m4' },
  { id: 'isEenWzdLocatie', label: 'Is een WZD locatie?', type: 'checkbox', className: 'col s6 m4' },
  { id: 'isEenWvggzLocatie', label: 'Is een WGGGZ locatie?', type: 'checkbox', className: 'col s6 m4' },
  ...AddressForm,
  ...CareForm,
];

export const CareProviderForm: Form = [
  { id: 'Zorgaanbieder', type: 'section' },
  {
    type: 'md',
    value: '##### Algemene informatie over de zorgaanbieder.',
  },
  { id: 'naam', label: 'Zorgaanbieder', type: 'text', required: true, className: 'col s12 m8' },
  { id: 'kvk', label: 'KvK-nummer', type: 'number', required: true, className: 'col s12 m4' },
  { id: 'rechtsvorm', required: true, type: 'textarea', className: 'col s12' },
  ...AddressForm,
  { type: 'md', value: 'Voeg op de volgende pagina uw locaties toe (zie menu links).' },

  { id: 'Locaties', type: 'section' },
  { id: 'locaties', label: 'Nieuwe locatie toevoegen', type: LocationForm, repeat: true },
  // straat: string;
  // huisnummer: number;
  // huisletter?: string;
  // huisnummerToevoeging?: string;
  // postcode: string;
  // woonplaatsnaam: string;
  // landnaam?: string;
  // aanvullendeAdresinformatie?: string;

  // {
  //   id: 'editors',
  //   label: 'Add editor',
  //   className: 'col s12',
  //   repeat: true,
  //   type: editorForm,
  //   i18n: {
  //     createRepeat: 'Create a new editor',
  //     editRepeat: 'Edit editor',
  //   },
  // },
  // { id: 'created', label: 'Created "{{event}}" event on:', type: 'date', required: true },
] as Form;
