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
  { id: 'datumIngang', label: 'Ingangsdatum', placeholder: 'Kies een datum', type: 'date', required: true, className: 'col s6' },
  { id: 'datumEinde', label: 'Einddatum', placeholder: 'Kies een datum', type: 'date', className: 'col s6' },
];

export const careOptions = [
  { id: 'bejegening', label: 'Bejegening' },
  { id: 'verzorging', label: 'Verzorging' },
  { id: 'verpleging', label: 'Verpleging' },
  { id: 'behandeling', label: 'Behandeling' },
  { id: 'begeleiding', label: 'Begeleiding' },
  { id: 'bescherming', label: 'Bescherming' },
  { id: 'toediening', label: 'Toedienen van vocht, voeding en medicatie, verrichten van medische controles of handelingen, therapeutische maatregelen' },
  { id: 'beperken_bewegingsvrijheid', label: 'Beperken van de bewegingsvrijheid' },
  { id: 'insluiten', label: 'Insluiten' },
  { id: 'toezicht', label: 'Uitoefenen van toezicht' },
  { id: 'onderzoek_kleding', label: 'Onderzoek aan kleding of lichaam' },
  { id: 'onderzoek_woonruimte', label: 'Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen' },
  { id: 'drugs_controle', label: 'Controleren op aanwezigheid van gedrag-beïnvloedende middelen' },
  { id: 'beperken_vrijheid', label: 'Beperken in de vrijheid het eigen leven in te richten' },
  { id: 'beperken_bezoeksrecht', label: 'Beperken van het recht op het ontvangen van bezoek' },
  { id: 'ontnemen_vrijheid', label: 'Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf' },
  { id: 'opnemen', label: 'Opnemen in een accommodatie' },
];

/** Zorgvorm formulier */
const CareForm: Form = [
  { type: 'md', value: '###### Welke type zorg wordt geleverd?' },
  { id: 'isAmbulantGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is ambulant geleverd?' },
  { id: 'isKlinischGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is klinisch geleverd?' },
  { id: 'zorgvorm', type: 'options', options: careOptions, multiple: true, required: true, checkboxClass: 'col s12', show: ['isEenWvggzLocatie = true'] },
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
  { id: 'isEenWvggzLocatie', label: 'Is een WVGGGZ locatie?', type: 'checkbox', className: 'col s6 m4' },
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
