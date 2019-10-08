import { Form } from 'mithril-ui-form';

// const sortByLabel: ((a: { id: string; label: string }, b: { id: string; label: string }) => number) | undefined = (
//   a,
//   b
// ) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0);

export const countries = [
  { id: 'netherlands', label: 'Nederland' },
  { id: 'austria', label: 'Oostenrijk' },
  { id: 'belgium', label: 'België' },
  { id: 'bulgaria', label: 'Bulgarije' },
  { id: 'croatia', label: 'Kroatië' },
  { id: 'cyprus', label: 'Cyprus' },
  { id: 'czech_republic', label: 'Tsjechië' },
  { id: 'denmark', label: 'Denemarken' },
  { id: 'estonia', label: 'Estonië' },
  { id: 'finland', label: 'Finland' },
  { id: 'france', label: 'Frankrijk' },
  { id: 'germany', label: 'Duitsland' },
  { id: 'greece', label: 'Griekenland' },
  { id: 'hungary', label: 'Hungarije' },
  { id: 'ireland', label: 'Ierland' },
  { id: 'italy', label: 'Italië' },
  { id: 'latvia', label: 'Letland' },
  { id: 'lithuania', label: 'Litouwen' },
  { id: 'luxembourg', label: 'Luxemburg' },
  { id: 'malta', label: 'Malta' },
  { id: 'poland', label: 'Polen' },
  { id: 'portugal', label: 'Portugal' },
  { id: 'romania', label: 'Romanië' },
  { id: 'slovakia', label: 'Slovakije' },
  { id: 'slovenia', label: 'Slovenië' },
  { id: 'spain', label: 'Spanje' },
  { id: 'united_kingdom', label: 'Engeland' },
  { id: 'sweden', label: 'Zweden' },
  { id: 'other', label: 'Land buiten Europa' },
];

const rechtsvorm = [
  { id: 1, label: 'Eenmanszaak' },
  { id: 2, label: 'Eenmanszaak met meer dan één eigenaar' },
  { id: 3, label: 'NV/BV in oprichting op A-formulier' },
  // { id: 5, label: 'Rederij' },
  { id: 7, label: 'Maatschap' },
  { id: 11, label: 'Vennootschap onder firma' },
  { id: 12, label: 'NV/BV in oprichting op B-formulier' },
  { id: 21, label: 'Commanditaire vennootschap met één beherende vennoot' },
  { id: 22, label: 'Commanditaire vennootschap met meer dan een beherende vennoot' },
  { id: 23, label: 'NV/BV in oprichting op B-formulier' },
  { id: 40, label: 'Rechtspersoon in oprichting' },
  { id: 41, label: 'Besloten vennootschap met gewone structuur' },
  { id: 42, label: 'Besloten vennootschap blijkens statuten structuurvennootschap' },
  { id: 51, label: 'Naamloze vennootschap met gewone structuur' },
  { id: 52, label: 'Naamloze vennootschap blijkens statuten structuurvennootschap' },
  { id: 53, label: 'Naamloze vennootschap beleggingsmaatschappij met veranderlijk kapitaal' },
  {
    id: 54,
    label:
      'Naamloze vennootschap beleggingsmaatschappij met veranderlijk kapitaal blijkens statuten structuurvennootschap',
  },
  { id: 61, label: 'Coöperatie ua met gewone structuur' },
  { id: 62, label: 'Coöperatie ua blijkens statuten structuurcoöperatie' },
  { id: 63, label: 'Coöperatie wa met gewone structuur' },
  { id: 64, label: 'Coöperatie wa blijkens statuten structuurcoöperatie' },
  { id: 65, label: 'Coöperatie ba met gewone structuur' },
  { id: 66, label: 'Coöperatie ba blijkens statuten structuurcoöperatie' },
  { id: 71, label: 'Vereniging met volledige rechtbevoegdheid' },
  { id: 72, label: 'Vereniging met beperkte rechtsbevoegdheid' },
  // { id: 73, label: 'Kerkgenootschap' },
  { id: 74, label: 'Stichting' },
  { id: 81, label: 'Onderlinge waarborgmaatschappij ua met gewone structuur' },
  { id: 82, label: 'Onderlinge waarborgmaatschappij ua blijkens statuten structuur-onderlinge' },
  { id: 83, label: 'Onderlinge waarborgmaatschappij wa met gewone structuur' },
  { id: 84, label: 'Onderlinge waarborgmaatschappij wa blijkens statuten structuur-onderlinge' },
  { id: 85, label: 'Onderlinge waarborgmaatschappij ba met gewone structuur' },
  { id: 86, label: 'Onderlinge waarborgmaatschappij ba blijkens statuten structuur-onderlinge' },
  { id: 91, label: 'Buitenlandse rechtsvorm met hoofdvestiging in Nederland' },
  { id: 92, label: 'Nevenvestiging met hoofdvestiging in buitenland' },
  { id: 93, label: 'Europees economisch samenwerkingsverband (EESV)' },
  { id: 94, label: 'Buitenlandse EG-vennootschap met onderneming in Nederland' },
  { id: 95, label: 'Buitenlandse EG-vennootschap met hoofdnederzetting in Nederland' },
  { id: 96, label: 'Buitenlandse op EG-vennootschap lijkende vennootschap met onderneming in Nederland' },
  { id: 97, label: 'Buitenlandse op EG-vennootschap lijkende vennootschap met hoofdnederzetting in Nederland' },
];

const ActivityForm: Form = [
  { type: 'md', value: '###### Activiteit/aantekening' },
  {
    id: 'datumIngang',
    label: 'Ingangsdatum',
    placeholder: 'Kies een datum',
    type: 'date',
    required: true,
    className: 'col s6',
  },
  { id: 'datumEinde', label: 'Einddatum', placeholder: 'Kies een datum', type: 'date', className: 'col s6' },
];

export const careOptions = [
  {
    id: 'toediening',
    label:
      'Toedienen van vocht, voeding en medicatie, verrichten van medische controles of handelingen, therapeutische maatregelen',
  },
  { id: 'beperken_bewegingsvrijheid', label: 'Beperken van de bewegingsvrijheid' },
  { id: 'insluiten', label: 'Insluiten' },
  { id: 'toezicht', label: 'Uitoefenen van toezicht' },
  { id: 'onderzoek_kleding', label: 'Onderzoek aan kleding of lichaam' },
  {
    id: 'onderzoek_woonruimte',
    label: 'Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen',
  },
  { id: 'drugs_controle', label: 'Controleren op aanwezigheid van gedrag-beïnvloedende middelen' },
  { id: 'beperken_vrijheid', label: 'Beperken in de vrijheid het eigen leven in te richten' },
  { id: 'beperken_bezoeksrecht', label: 'Beperken van het recht op het ontvangen van bezoek' },
  {
    id: 'ontnemen_vrijheid',
    label:
      'Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf',
  },
  { id: 'opnemen', label: 'Opnemen in een accommodatie' },
];

/** Zorgvorm formulier */
const CareForm: Form = [
  { type: 'md', value: '###### Welke type zorg wordt geleverd?' },
  { id: 'isAmbulantGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is ambulant geleverd?' },
  { id: 'isKlinischGeleverd', type: 'checkbox', className: 'col s12 m6', label: 'Is klinisch geleverd?' },
  {
    id: 'zorgvorm',
    type: 'options',
    options: careOptions,
    multiple: true,
    required: true,
    checkboxClass: 'col s12',
    show: ['isEenWvggzLocatie = true'],
  },
  ...ActivityForm,
];

const AddressForm: Form = [
  {
    type: 'md',
    value: `&nbsp;
###### Bezoekadres gegevens`,
  },
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
  { id: 'isEenWvggzLocatie', label: 'Is een WVGGZ locatie?', type: 'checkbox', className: 'col s6 m4' },
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
  { id: 'rechtsvorm', required: true, type: 'select', options: rechtsvorm, className: 'col s12' },
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
