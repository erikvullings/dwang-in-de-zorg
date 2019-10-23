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
  { id: 'datumIngang', label: 'Ingangsdatum', type: 'date', min: Date.now(), required: true, className: 'col s6' },
  { id: 'datumEinde', label: 'Einddatum', type: 'date', min: Date.now(), className: 'col s6' },
];

export const careOptions = [
  { id: 'isAmbulantGeleverd', label: 'Is ambulant geleverd?' },
  { id: 'isKlinischGeleverd', label: 'Is klinisch geleverd?' },
  {
    id: 'isVochtVoedingMedicatie',
    label:
      'Toedienen van vocht, voeding en medicatie, verrichten van medische controles of handelingen, therapeutische maatregelen',
    show: ['isWvggz = true'],
  },
  { id: 'isBeperkenBewegingsvrijheid', label: 'Beperken van de bewegingsvrijheid', show: ['isWvggz = true'] },
  { id: 'isInsluiten', label: 'Insluiten', show: ['isWvggz = true'] },
  { id: 'isToezicht', label: 'Uitoefenen van toezicht', show: ['isWvggz = true'] },
  { id: 'isOnderzoekKledingLichaam', label: 'Onderzoek aan kleding of lichaam', show: ['isWvggz = true'] },
  {
    id: 'isOnderzoekWoonruimte',
    label: 'Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen',
    show: ['isWvggz = true'],
  },
  {
    id: 'isControlerenMiddelen',
    label: 'Controleren op aanwezigheid van gedrag-beïnvloedende middelen',
    show: ['isWvggz = true'],
  },
  {
    id: 'isBeperkenEigenLeven',
    label: 'Beperken in de vrijheid het eigen leven in te richten',
    show: ['isWvggz = true'],
  },
  { id: 'isBeperkenBezoek', label: 'Beperken van het recht op het ontvangen van bezoek', show: ['isWvggz = true'] },
  {
    id: 'isTijdelijkVerblijf',
    label:
      'Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf',
    show: ['isWvggz = true'],
  },
  { id: 'isOpnemen', label: 'Opnemen in een accommodatie', show: ['isWvggz = true'] },
];

const day = 24 * 3600000;
const now = Date.now() - 30 * day;

/** Zorgvorm formulier */
export const CareForm: Form = [
  { type: 'md', value: '###### Welke type zorg wordt geleverd?' },
  {
    id: 'zorgvorm',
    type: 'options',
    options: careOptions,
    multiple: true,
    required: true,
    checkboxClass: 'col s12',
  },
  { id: 'isActief', disabled: true, type: 'checkbox', className: 'col s12 m4', label: 'Is actief?' },
  { id: 'datumIngang', label: 'Ingangsdatum', type: 'date', min: now, required: true, className: 'col s6 m4' },
  { id: 'datumEinde', show: 'datumIngang', label: 'Einddatum', type: 'date', min: now, className: 'col s6 m4' },
  { id: 'aantekeningen', disabled: true, label: 'Activiteit/aantekening', type: ActivityForm, repeat: true },
];

const addressDisabled = ['vestigingsnummer', 'kvk'];

const AddressForm: Form = [
  { type: 'md', value: `&nbsp;
###### Bezoekadres gegevens` },
  { type: 'md', show: ['vestigingsnummer', 'kvk'], value: '_Adresgegevens uit KvK. Indien incorrect, gaarne wijzigen bij KvK._' },
  { id: 'postcode', disabled: addressDisabled, label: 'Postcode', type: 'text', className: 'col s6 m4' },
  { id: 'huisnummer', disabled: addressDisabled, label: 'Huisnummer', type: 'number', className: 'col s6 m2' },
  { id: 'huisletter', disabled: addressDisabled, label: 'Huisletter', type: 'text', className: 'col s6 m2' },
  { id: 'huisnummerToevoeging', disabled: addressDisabled, label: 'Toevoeging', type: 'text', className: 'col s6 m4' },
  { id: 'straat', disabled: addressDisabled, label: 'Straat', type: 'text', className: 'col s12 m4' },
  { id: 'woonplaatsnaam', disabled: addressDisabled, label: 'Woonplaats', type: 'text', className: 'col s12 m4' },
  { id: 'landnaam', disabled: addressDisabled, label: 'Land', value: 'netherlands', type: 'select', options: countries, className: 'col s12 m4' },
  {
    id: 'landnaamBuitenEuropa',
    label: 'Land buiten Europa',
    type: 'text',
    show: ['landnaam=other'],
    className: 'col s12 m6',
  },
  { id: 'adreslocatieomschrijving', label: 'Locatieomschrijving adres', type: 'textarea' },
];

const LocationForm: Form = [
  { type: 'md', value: `##### Locatiegegevens

NB: De locatie is nooit het adres van de patiënt. In dat geval, gebruik het adres waar de zorg geleverd wordt.` },
  { id: 'locatienaam', type: 'text', required: true, className: 'col s12 m8' },
  { id: 'vestigingsnummer', type: 'number', className: 'col s12 m4' },
  { id: 'locatieomschrijving', type: 'textarea' },
  { id: 'isWzd', label: 'Is het een WZD locatie?', type: 'checkbox', className: 'col s6 m6' },
  { id: 'isWzdAcco', disabled: 'isWzd = false', label: 'Is het een WZD accomodatie?', type: 'checkbox', className: 'col s6 m6' },
  { id: 'isWvggz', label: 'Is het een WVGGZ locatie?', type: 'checkbox', className: 'col s6 m6' },
  { id: 'isWvggzAcco', disabled: 'isWvggz = false', label: 'Is het een WVGGZ accomodatie?', type: 'checkbox', className: 'col s6 m6' },
  { id: 'target' },
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
] as Form;
