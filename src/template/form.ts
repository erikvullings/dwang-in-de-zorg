import { Form } from 'mithril-ui-form';

const sortByLabel: ((a: { id: string; label: string }, b: { id: string; label: string }) => number) | undefined = (
  a,
  b
) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0);

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

export const incidentTypes = [
  {
    id: 'animalDisease',
    label: 'Animal disease',
    show: ['incidentCategory = natural'],
  },
].sort(sortByLabel);

const LocationForm: Form = [
  // locatienaam: string;
  // locatieomschrijving: string;
  // vestigingsnummer?: number;
  // /** Is de locatie een accommodatie (geschikt voor opname) */
  // isAccommodatie: boolean;
  // /** Wordt op de locatie Wzd-zorg geleverd */
  // hasWzdCare?: boolean;
  // /** Wordt op de locatie Wvggz zorg geleverd */
  // hasWvggzCare?: boolean;
  // /** Ingangsdatum (als ISO string) */
  // datumIngang: string;
  // /** Einddatum (als ISO string) */
  // datumEinde?: string;

  { type: 'md', value: '##### Locatiegegevens' },
  { id: 'locatienaam', type: 'text', required: true, className: 'col s12 m6' },
  { id: 'vestigingsnummer', type: 'number', className: 'col s12 m6' },
  { id: 'locatieomschrijving', type: 'textarea' },
  { type: 'md', value: '###### Type zorg' },
  {
    id: 'isAccommodatie',
    type: 'checkbox',
    className: 'col s6 m4',
    label: 'Accomodatie?',
  },
  { id: 'hasWzdCare', label: 'WZD zorg', type: 'checkbox', className: 'col s6 m4' },
  { id: 'hasWvggzCare', label: 'WGGGZ zorg', type: 'checkbox', className: 'col s6 m4' },
  { type: 'md', value: '###### Periode van zorg' },
  { id: 'datumIngang', label: 'Ingangsdatum', type: 'date', required: true, className: 'col s6' },
  { id: 'datumEinde', label: 'Einddatum', type: 'date', className: 'col s6' },

  { type: 'md', value: '##### Adresgegevens' },
  { id: 'postcode', label: 'Postcode', type: 'text', className: 'col s6' },
  { id: 'huisnummer', label: 'Huisnummer', type: 'number', className: 'col s6' },
  { id: 'straat', label: 'Straatnaam', type: 'text', className: 'col s12' },
  { id: 'huisletter', label: 'Huisletter', type: 'text', className: 'col s4' },
  { id: 'huisnummerToevoeging', label: 'Huisnummer toevoeging', type: 'text', className: 'col s4' },
  { id: 'landnaam', label: 'Land', type: 'select', options: countries, className: 'col s6' },
  { id: 'landnaamBuitenEuropa', label: 'Land buiten Europa', type: 'text', show: ['landnaam=other'], className: 'col s12' },
];

export const CareProviderForm: Form = [
  { id: 'Zorgaanbieder', type: 'section' },
  {
    type: 'md',
    value: '##### Algemene informatie over de zorgaanbieder.',
  },
  {
    id: 'naam',
    label: 'Zorgaanbiedernaam',
    type: 'text',
    maxLength: 120,
    required: true,
    className: 'col s12 m8',
  },
  {
    id: 'kvk',
    label: 'KvK-nummer',
    type: 'number',
    required: true,
    className: 'col s12 m4',
  },
  {
    id: 'rechtsvorm',
    required: true,
    type: 'textarea',
    className: 'col s12',
  },
  { type: 'md', value: '###### Adresgegevens' },
  { id: 'postcode', label: 'Postcode', type: 'text', className: 'col s6' },
  { id: 'huisnummer', label: 'Huisnummer', type: 'number', className: 'col s6' },
  { id: 'huisletter', label: 'Huisletter', type: 'text', className: 'col s4' },
  { id: 'huisnummerToevoeging', label: 'Huisnummer toevoeging', type: 'text', className: 'col s4' },
  { id: 'straat', label: 'Straatnaam', type: 'text', className: 'col s12' },
  { id: 'woonplaatsnaam', label: 'Woonplaatsnaam', type: 'text', className: 'col s6' },
  { id: 'landnaam', label: 'Land', type: 'select', options: countries, className: 'col s6' },
  { id: 'landnaamBuitenEuropa', label: 'Land buiten Europa', type: 'text', show: ['landnaam=other'], className: 'col s12' },
  {
    type: 'md',
    value: 'Voeg op de volgende pagina uw locaties toe (zie menu links).',
  },

  { id: 'Locaties', type: 'section' },
  {
    id: 'locaties',
    label: 'Nieuwe locatie toevoegen',
    type: LocationForm,
    repeat: true,
  },
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
