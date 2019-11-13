import axios from 'axios';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as path from 'path';
import {
  ICareProvider,
  ILocation,
  locationToQueryTarget,
  removeEmpty,
  toQueryTarget
} from '../../common/dist';

const filename = path.resolve(process.cwd(), 'locatieregister.csv');

interface IImportedData {
  naam: string;
  kvk: string;
  rechtsvorm?:
    | 'publiekrechtelijkeRechtspersoon'
    | 'beslotenVennootschap'
    | 'stichting'
    | 'cooperatie';
  straat: string;
  huisnummer: string;
  huisnummertoevoeging?: string;
  postcode: string;
  woonplaatsnaam: string;
  landnaam: string;
  // RoWe: aanvullende adresinfo voor adressen voor zorgaanbiederadres
  zaanvadresinfo?: string;
  locatienaam: string;
  // RoWe: locatieomschrijving (niet zijnde additionele adresinformatie)
  lomschrijving?: string;
  vestigingsnummer?: string;
  lstraat: string;
  lhuisnummer: string;
  lhuisnummertoevoeging?: string;
  lpostcode: string;
  lwoonplaatsnaam: string;
  llandnaam: string;
  // RoWe: aanvullende adresinfo voor adressen van locatieadres
  laanvadresinfo?: string;
  // is wvggz accommodatie + onder welke wetten wordt zorg geleverd
  iswvggzacco?: string;
  // is Wzd accommodatie + onder welke wetten wordt zorg geleverd
  iswzdacco?: string;
  iswzd?: string;
  iswvggz?: string;
  // RoWe: deze velden alleen voor eerste imports
  aantekeningingang: string;
  aantekeningeinde?: string;
  // RoWe: velden voor geleverde typen zorg
  zvbejegening?: string;
  zvverzorging?: string;
  zvverpleging?: string;
  zvbehandeling?: string;
  zvbegeleiding?: string;
  zvbescherming?: string;
  zvvochtvoedingmedicatie?: string;
  zvmedishcecontroles?: string;
  zvbeperkenbewegingsvrijheid?: string;
  zvinsluiten?: string;
  zvtoezicht?: string;
  zvonderzoekkledinglichaam?: string;
  zvonderzoekwoonruimte?: string;
  zvcontrolerenmiddelen?: string;
  zvbeperkeneigenleven?: string;
  zvbeperkenbezoek?: string;
  zvopnemen?: string;
  zvtijdelijkverblijf?: string;
}

export interface IPdokSearchResult {
  response: {
    numFound: number;
    start: number;
    maxScore: number;
    docs: Array<{
      bron: 'BAG' | 'NWB' | string;
      woonplaatscode: string;
      type: 'adres' | 'postcode' | 'weg';
      woonplaatsnaam: string;
      wijkcode: string;
      huis_nlt: string;
      openbareruimtetype: string;
      buurtnaam: string;
      gemeentecode: string;
      rdf_seealso: string;
      weergavenaam: string;
      straatnaam_verkort: string;
      id: string;
      gekoppeld_perceel: string;
      gemeentenaam: string;
      buurtcode: string;
      wijknaam: string;
      identificatie: string;
      openbareruimte_id: string;
      waterschapsnaam: string;
      provinciecode: string;
      postcode: string;
      provincienaam: string;
      centroide_ll: string;
      nummeraanduiding_id: string;
      waterschapscode: string;
      adresseerbaarobject_id: string;
      huisnummer: string;
      provincieafkorting: string;
      centroide_rd: string;
      straatnaam: string;
      score: string;
    }>;
  };
}

const ja = (value?: string) => (value ? value === 'ja' : undefined);

const jaNee = (value?: string) => (value && value === 'ja' ? 'ja' : 'nee');

const rechtsvormConverter = (
  value?:
    | 'publiekrechtelijkeRechtspersoon'
    | 'beslotenVennootschap'
    | 'stichting'
    | 'cooperatie'
) => {
  switch (value) {
    case 'publiekrechtelijkeRechtspersoon':
      return 'Publiekrechtelijke rechtspersoon';
    case 'beslotenVennootschap':
      return 'Besloten vennootschap met gewone structuur';
    case 'stichting':
      return 'Stichting';
    case 'cooperatie':
      return 'Coöperatie';
    default:
      return '';
  }
};

/** Extracts two numbers from a geopoint */
const pointRegex = /POINT\(([\d.]+) ([\d.]+)\)/;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const pdokLocationSvc = async (pc: string, hn: string, toev: string = '') => {
  const pdokUrl = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?q=${pc.replace(
    / /g,
    ''
  )} ${hn} ${toev}`;
  await sleep(10);
  const searchResult = await axios
    .get<IPdokSearchResult>(pdokUrl)
    .catch(e => console.error(e));
  if (
    searchResult &&
    searchResult.data &&
    searchResult.data.response &&
    searchResult.data.response
  ) {
    const {
      data: {
        response: { docs = [] }
      }
    } = searchResult;
    if (docs.length > 0) {
      const found = docs[0];

      if (found.bron === 'BAG' && found.type === 'adres') {
        const { centroide_ll, centroide_rd } = found;
        const ll = pointRegex.exec(centroide_ll);
        const rd = pointRegex.exec(centroide_rd);
        if (ll && rd) {
          return {
            lat: +ll[1],
            lon: +ll[2],
            x: +rd[1],
            y: +rd[2]
          };
        }
      }
    }
  }
  return undefined;
};

fs.readFile(filename, 'utf8', (err, csv) => {
  if (err) {
    throw err;
  }
  const data = Papa.parse(csv.replace(/^\uFEFF/, ''), {
    delimiter: ';',
    header: true,
    trimHeaders: true,
    transform: v => v.trim()
  }).data as IImportedData[];
  const careProviders = [] as Array<Partial<ICareProvider>>;
  data.reduce((acc, cur) => {
    const {
      naam,
      kvk,
      rechtsvorm,
      straat,
      huisnummer,
      huisnummertoevoeging,
      postcode,
      woonplaatsnaam,
      landnaam,
      aantekeningingang,
      aantekeningeinde,
      zaanvadresinfo,
      locatienaam,
      lomschrijving,
      vestigingsnummer,
      lstraat,
      lhuisnummer,
      lhuisnummertoevoeging,
      lpostcode,
      lwoonplaatsnaam,
      llandnaam,
      laanvadresinfo,
      iswzdacco,
      iswvggzacco,
      iswzd,
      iswvggz,
      zvvochtvoedingmedicatie,
      zvbeperkenbewegingsvrijheid,
      zvinsluiten,
      zvtoezicht,
      zvonderzoekkledinglichaam,
      zvonderzoekwoonruimte,
      zvcontrolerenmiddelen,
      zvbeperkeneigenleven,
      zvbeperkenbezoek,
      zvtijdelijkverblijf
    } = cur;
    const zorgvormen = {
      isVochtVoedingMedicatie: ja(zvvochtvoedingmedicatie),
      isBeperkenBewegingsvrijheid: ja(zvbeperkenbewegingsvrijheid),
      isInsluiten: ja(zvinsluiten),
      isToezicht: ja(zvtoezicht),
      isOnderzoekKledingLichaam: ja(zvonderzoekkledinglichaam),
      isOnderzoekWoonruimte: ja(zvonderzoekwoonruimte),
      isControlerenMiddelen: ja(zvcontrolerenmiddelen),
      isBeperkenEigenLeven: ja(zvbeperkeneigenleven),
      isBeperkenBezoek: ja(zvbeperkenbezoek),
      isTijdelijkVerblijf: ja(zvtijdelijkverblijf)
    } as { [key: string]: boolean | undefined };
    const now = Date.now();
    const location = {
      mutated: now,
      naam: locatienaam,
      omschr: lomschrijving,
      nmr: vestigingsnummer,
      str: lstraat,
      pc: lpostcode,
      hn: lhuisnummer,
      toev: lhuisnummertoevoeging,
      wn: lwoonplaatsnaam,
      land: llandnaam || 'netherlands',
      aanv: laanvadresinfo,
      isWvggzAcco: jaNee(iswvggzacco),
      isWzdAcco: jaNee(iswzdacco),
      isWzd: ja(iswzd),
      isWvggz: ja(iswvggz),
      isBopz: true,
      zv: Object.keys(zorgvormen).filter(key => zorgvormen[key]),
      aant: [
        {
          dc: now,
          di: new Date(aantekeningingang).valueOf(),
          de: aantekeningeinde
            ? new Date(aantekeningeinde).valueOf()
            : undefined
        }
      ]
    } as Partial<ILocation>;
    location.target = locationToQueryTarget(location);
    if (kvk === acc.kvk && naam === acc.naam) {
      // New location
      if (acc.locaties) {
        acc.locaties.push(location as ILocation);
      }
    } else {
      // Change of care provider
      const found = careProviders.filter(
        cp => cp.kvk === kvk && cp.naam === naam
      );
      if (found.length > 0) {
        acc = found[0];
      } else if (naam) {
        // New provider
        acc = {
          owner: [kvk],
          naam,
          published: true,
          kvk,
          rechtsvorm: rechtsvormConverter(rechtsvorm),
          str: straat,
          hn: huisnummer,
          toev: huisnummertoevoeging,
          pc: postcode,
          wn: woonplaatsnaam,
          land: landnaam || 'Nederland',
          aanv: zaanvadresinfo,
          locaties: [location]
        } as Partial<ICareProvider>;
        toQueryTarget(acc);
        careProviders.push(acc);
      }
    }
    return acc;
  }, {} as Partial<ICareProvider>);
  const cps = removeEmpty(careProviders) as Array<Partial<ICareProvider>>;

  cps.forEach(async cp => {
    const { pc, hn, toev, locaties } = cp;
    if (pc && hn) {
      const coordinatesCP = await pdokLocationSvc(pc, hn, toev);
      if (coordinatesCP) {
        Object.assign(cp, coordinatesCP);
      }
    }
    if (locaties && locaties.length > 0) {
      locaties.forEach(async loc => {
        const { pc: postcode, hn: huisnummer, toev: toevoeging } = loc;
        if (postcode && huisnummer) {
          const coordinatesLoc = await pdokLocationSvc(
            postcode,
            huisnummer,
            toevoeging
          );
          if (coordinatesLoc) {
            Object.assign(loc, coordinatesLoc);
          }
        }
      });
    }
    await axios
      .post('http://localhost:3030/api/zorgaanbieders', cp)
      .catch(e => {
        console.error(e.message);
        console.log(cp.naam);
        console.log(JSON.stringify(cp).length);
      });
  });

});
