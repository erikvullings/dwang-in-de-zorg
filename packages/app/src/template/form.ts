import { Form } from 'mithril-ui-form';

// const sortByLabel: ((a: { id: string; label: string }, b: { id: string; label: string }) => number) | undefined = (
//   a,
//   b
// ) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0);

const day = 24 * 3600000;
const minChangeDate = Date.now() - 3 * day;

export const countries = [
  { id: 'Nederland', label: 'Nederland' },
  { id: 'Oostenrijk', label: 'Oostenrijk' },
  { id: 'België', label: 'België' },
  { id: 'Bulgarije', label: 'Bulgarije' },
  { id: 'Kroatië', label: 'Kroatië' },
  { id: 'Cyprus', label: 'Cyprus' },
  { id: 'Tsjechië', label: 'Tsjechië' },
  { id: 'Denemarken', label: 'Denemarken' },
  { id: 'Estonië', label: 'Estonië' },
  { id: 'Finland', label: 'Finland' },
  { id: 'Frankrijk', label: 'Frankrijk' },
  { id: 'Duitsland', label: 'Duitsland' },
  { id: 'Griekenland', label: 'Griekenland' },
  { id: 'Hungarije', label: 'Hungarije' },
  { id: 'Ierland', label: 'Ierland' },
  { id: 'Italië', label: 'Italië' },
  { id: 'Letland', label: 'Letland' },
  { id: 'Litouwen', label: 'Litouwen' },
  { id: 'Luxemburg', label: 'Luxemburg' },
  { id: 'Malta', label: 'Malta' },
  { id: 'Polen', label: 'Polen' },
  { id: 'Portugal', label: 'Portugal' },
  { id: 'Romanië', label: 'Romanië' },
  { id: 'Slovakije', label: 'Slovakije' },
  { id: 'Slovenië', label: 'Slovenië' },
  { id: 'Spanje', label: 'Spanje' },
  { id: 'Engeland', label: 'Engeland' },
  { id: 'Zweden', label: 'Zweden' },
  { id: 'other', label: 'Land buiten Europa' }
];

const ActivityForm: Form = [
  {
    id: 'di',
    disabled: true,
    label: 'Ingangsdatum',
    type: 'date',
    min: minChangeDate,
    className: 'col s6'
  },
  {
    id: 'de',
    label: 'Einddatum',
    type: 'date',
    min: minChangeDate,
    className: 'col s6'
  }
];

export const careOptions = [
  {
    id: 'isVochtVoedingMedicatie',
    label:
      'Toedienen van vocht, voeding en medicatie, alsmede het verrichten van medische controles of andere medische handelingen en therapeutische maatregelen, ter behandeling van een psychische stoornis, dan wel vanwege die stoornis, ter behandeling van een somatische aandoening.',
    show: ['isWvggz = true']
  },
  {
    id: 'isBeperkenBewegingsvrijheid',
    label: 'Beperken van de bewegingsvrijheid',
    show: ['isWvggz = true']
  },
  { id: 'isInsluiten', label: 'Insluiten', show: ['isWvggz = true'] },
  {
    id: 'isToezicht',
    label: 'Uitoefenen van toezicht op betrokkene',
    show: ['isWvggz = true']
  },
  {
    id: 'isOnderzoekKledingLichaam',
    label: 'Onderzoek aan kleding of lichaam',
    show: ['isWvggz = true']
  },
  {
    id: 'isOnderzoekWoonruimte',
    label: 'Onderzoek van de woon- of verblijfsruimte op gedrag-beïnvloedende middelen en gevaarlijke voorwerpen',
    show: ['isWvggz = true']
  },
  {
    id: 'isControlerenMiddelen',
    label: 'Controleren op de aanwezigheid van gedrag-beïnvloedende middelen',
    show: ['isWvggz = true']
  },
  {
    id: 'isBeperkenEigenLeven',
    label:
      'Aanbrengen van beperkingen in de vrijheid het eigen leven in te richten, die tot gevolg hebben dat betrokkene iets moet doen of nalaten, waaronder het gebruik van communicatiemiddelen',
    show: ['isWvggz = true']
  },
  {
    id: 'isBeperkenBezoek',
    label: 'Beperken van het recht op het ontvangen van bezoek',
    show: ['isWvggz = true']
  },
  {
    id: 'isTijdelijkVerblijf',
    label:
      'Ontnemen van de vrijheid van betrokkene door hem over te brengen naar een plaats die geschikt is voor tijdelijk verblijf',
    show: ['isWvggz = true']
  }
];

/** Zorgvorm formulier */
export const CareForm: Form = [
  {
    id: 'zv',
    label: 'Vormen van verplichte zorg die worden verleend:',
    type: 'options',
    show: 'isWvggz = true',
    options: careOptions,
    multiple: true,
    checkboxClass: 'col s12',
    checkAllOptions: 'Alle opties selecteren|Alle opties wissen'
  },
  {
    id: 'active',
    type: 'md',
    show: 'isActief',
    value: 'Deze locatie is momenteel actief.'
  },
  {
    id: 'nonactive',
    type: 'md',
    show: '!isActief',
    value: 'Deze locatie is momenteel niet actief. Specificeer een ingangsdatum om hem te activeren:'
  },
  // { id: 'isActief', disabled: true, type: 'checkbox', className: 'col s12 m4', label: 'Is actief?' },
  {
    id: 'di',
    label: 'Ingangsdatum',
    type: 'date',
    min: minChangeDate,
    required: true,
    className: 'col s6'
  },
  {
    id: 'de',
    show: 'di',
    label: 'Einddatum',
    type: 'date',
    min: minChangeDate,
    className: 'col s6'
  },
  {
    id: 'aant',
    disabled: true,
    label: 'Activiteiten/aantekeningen',
    type: ActivityForm,
    max: 1,
    repeat: true,
    pageSize: 1,
  }
];

const AddressForm = (isAdmin = false): Form => {
  return [
    {
      type: 'md',
      value: `&nbsp;
###### Bezoekadres gegevens`
    },
    {
      type: 'md',
      show: ['kvk'],
      value: '_Adresgegevens uit KvK. Indien incorrect, aub wijzigen bij KvK of KvK nummer verwijderen._'
    },
    {
      id: 'str',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Straat',
      type: 'text',
      className: 'col s12 m6'
    },
    {
      id: 'hn',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Huisnummer',
      type: 'number',
      className: 'col s6 m2'
    },
    {
      id: 'toev',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Huisletter/toevoeging',
      type: 'text',
      className: 'col s6 m4'
    },
    {
      id: 'pc',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Postcode',
      type: 'text',
      className: 'col s6 m4'
    },
    {
      id: 'wn',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Woonplaats',
      type: 'text',
      className: 'col s12 m4'
    },
    {
      id: 'land',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Land',
      value: 'Nederland',
      type: 'select',
      options: countries,
      className: 'col s12 m4'
    },
    {
      id: 'fland',
      disabled: isAdmin ? undefined : 'kvk',
      label: 'Land buiten Europa',
      type: 'text',
      show: ['land=other'],
      className: 'col s12 m6'
    },
    { id: 'aanv', label: 'Aanvullende adresinformatie', type: 'textarea' },
    {
      show: 'noMail = true',
      disabled: true,
      label: 'Adresgegevens mogen niet gebruikt worden voor mail/contact',
      type: 'md'
    }
  ];
};

const LocationAddressForm: Form = [
  {
    type: 'md',
    value: `&nbsp;
###### Bezoekadres gegevens`
  },
  {
    type: 'md',
    show: ['nmr'],
    value: '_Adresgegevens uit KvK. Indien incorrect, aub wijzigen bij KvK of vestigingsnummer verwijderen._'
  },
  {
    id: 'pc',
    disabled: 'nmr',
    label: 'Postcode',
    type: 'text',
    className: 'col s6 m5'
  },
  {
    id: 'hn',
    disabled: 'nmr',
    label: 'Huisnummer',
    type: 'number',
    className: 'col s6 m3'
  },
  {
    id: 'toev',
    disabled: 'nmr',
    label: 'Huisletter/toevoeging',
    type: 'text',
    className: 'col s6 m4'
  },
  {
    id: 'str',
    disabled: true,
    label: 'Straat',
    type: 'text',
    className: 'col s12 m5'
  },
  {
    id: 'wn',
    disabled: true,
    label: 'Woonplaats',
    type: 'text',
    className: 'col s12 m4'
  },
  {
    id: 'land',
    disabled: 'nmr',
    label: 'Land',
    value: 'Nederland',
    type: 'select',
    options: countries,
    className: 'col s12 m3'
  },
  {
    id: 'fland',
    disabled: 'nmr',
    label: 'Land buiten Europa',
    type: 'text',
    show: ['land=other'],
    className: 'col s12 m6'
  },
  { id: 'aanv', label: 'Aanvullende adresinformatie', type: 'textarea' },
  {
    show: 'noMail',
    disabled: true,
    label: 'Adresgegevens mogen niet gebruikt worden voor mail/contact',
    type: 'md'
  }
];

export const LocationForm: Form = [
  {
    type: 'md',
    value: `##### Locatiegegevens

NB: De locatie is nooit het adres van de patiënt. In dat geval, gebruik het adres van waaruit de zorg geleverd wordt.`
  },
  {
    type: 'md',
    show: 'mutated',
    value: 'De laatste wijziging van de locatiegegevens vond plaats op {{mutated:date}}.'
  },
  {
    id: 'nmr',
    label: 'Vestigingsnummer',
    type: 'text',
    className: 'col s12 m4'
  },
  { id: 'naam', type: 'text', required: true, className: 'col s12 m8' },
  { id: 'omschr', label: 'Locatieomschrijving', type: 'textarea' },
  ...LocationAddressForm,

  {
    type: 'md',
    value: 'Selecteer onder welke wet(ten) gedwongen zorg wordt aangeboden in of vanuit deze locatie:'
  },
  {
    id: 'isWzd',
    label: 'Wet zorg en dwang',
    type: 'checkbox',
    className: 'col s12'
  },
  {
    id: 'isWzdAcco',
    label: 'Is gedwongen opname op grond van de Wzd mogelijk?',
    type: 'radio',
    value: 'nee',
    options: [
      { id: 'nee', label: 'Nee: Wzd locatie' },
      { id: 'ja', label: 'Ja: Wzd accommodatie' }
    ],
    show: 'isWzd = true',
    className: 'input-field col s12 indent1'
  },
  {
    id: 'isWzdAmbu',
    show: 'isWzdAcco = ja',
    label: 'Wordt in of vanuit deze accommodatie ook ambulante gedwongen zorg verleend? ',
    value: 'nee',
    type: 'radio',
    options: [
      { id: 'nee', label: 'Nee' },
      { id: 'ja', label: 'Ja' }
    ],
    className: 'col s12 indent2'
  },
  {
    id: 'isWvggz',
    label: 'Wet verplichte ggz?',
    type: 'checkbox',
    className: 'col s12'
  },
  {
    id: 'isWvggzAcco',
    label: 'Is gedwongen opname op grond van de Wvggz mogelijk?',
    type: 'radio',
    value: 'nee',
    options: [
      { id: 'nee', label: 'Nee: Wvggz locatie' },
      { id: 'ja', label: 'Ja: Wvggz accommodatie' }
    ],
    show: 'isWvggz = true',
    className: 'input-field col s12 indent1'
  },
  {
    id: 'isWvggzAmbu',
    show: 'isWvggzAcco = ja',
    label: 'Wordt in of vanuit deze accommodatie ook ambulante gedwongen zorg verleend? ',
    value: 'nee',
    type: 'radio',
    options: [
      { id: 'nee', label: 'Nee' },
      { id: 'ja', label: 'Ja' }
    ],
    className: 'col s12 indent2'
  },
  { id: 'target' },
  ...CareForm
];

export const CareProviderForm = (isAdmin = false): Form => {
  return [
    { id: 'Zorgaanbieder', type: 'section' },
    {
      type: 'md',
      value: '##### Algemene informatie over de zorgaanbieder.'
    },
    {
      id: 'kvk',
      label: 'KvK-nummer',
      readonly: true,
      type: 'text',
      required: true,
      className: 'col s12 m4'
    },
    {
      id: 'naam',
      label: 'Zorgaanbieder',
      disabled: isAdmin ? undefined : 'kvk',
      type: 'text',
      required: true,
      className: 'col s12 m8'
    },
    {
      id: 'rechtsvorm',
      disabled: isAdmin ? undefined : 'kvk',
      required: true,
      type: 'text',
      className: 'col s12'
    },
    {
      id: 'published',
      label: 'Is publiek zichtbaar in het register',
      required: true,
      type: 'checkbox',
      className: 'col s12'
    },
    ...AddressForm(isAdmin),
    { type: 'md', value: 'Voeg via het menu links uw locaties toe.' },

    { id: 'Locaties', type: 'section' },
    {
      id: 'locaties',
      label: 'Nieuwe locatie',
      type: LocationForm,
      repeat: true,
      pageSize: 1,
      propertyFilter: 'target',
      filterLabel: 'Filter'
    }
  ];
};
