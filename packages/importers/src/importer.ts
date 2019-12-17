import axios from 'axios';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as path from 'path';
import {
  ICareProvider,
  ICsvModel,
  ILocation,
  locationToQueryTarget,
  removeEmpty,
  toQueryTarget
} from '../../common/dist';

const filename = path.resolve(process.cwd(), 'locatieregister.csv');

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
    | 'publiekrechtelijkerechtspersoon'
    | 'beslotenvennootschap'
    | 'stichting'
    | 'cooperatie'
) => {
  switch ((value || '').toLowerCase()) {
    case 'publiekrechtelijkerechtspersoon':
      return 'Publiekrechtelijke rechtspersoon';
    case 'beslotenvennootschap':
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

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const pdokLocationSvc = async (pc: string, hn: string, toev: string = '') => {
  const pdokUrl = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?q=${pc.replace(
    / /g,
    ''
  )} ${hn} ${toev}`;
  // await sleep(10);
  console.log(`PDOK resolving ${pc}, ${hn}${toev ? `, ${toev}` : ''}`);
  const searchResult = await axios.get<IPdokSearchResult>(pdokUrl).catch(_ => {
    console.error(`Error resolving ${pc}, ${hn}${toev ? `, ${toev}` : ''} !`);
    console.error('');
    return undefined;
  });
  if (
    searchResult &&
    searchResult.data &&
    searchResult.data.response
  ) {
    const {
      data: {
        response: { docs = [] }
      }
    } = searchResult;
    const found = docs.filter(doc => doc.bron === 'BAG' && doc.type === 'adres');

    if (found.length > 0) {
      const best = found[0];
      const { centroide_ll, centroide_rd } = best;
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
  console.error(`Error resolving ${pc}, ${hn}${toev ? `, ${toev}` : ''}!`);
  return undefined;
};

const capitalizeFirstLetter = (s: string) =>
  s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const resolveLocations = async (cps: Array<Partial<ICareProvider>>) => {
  for (const cp of cps) {
    const { pc, hn, toev, locaties } = cp;
    if (pc && hn) {
      const coordinatesCP = await pdokLocationSvc(pc, hn, toev);
      if (coordinatesCP) {
        Object.assign(cp, coordinatesCP);
      }
    }
    if (locaties && locaties.length > 0) {
      for (const loc of locaties) {
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
      }
    }
  }
  return cps;
};

const publishCps = async (cps: Array<Partial<ICareProvider>>) => {
  for (const cp of cps) {
    await axios.post('http://localhost:3030/api/zorgaanbieders', cp)
    .then(response => {
        console.log(`Publishing  ${cp.naam}:  ${response}`);
    }).catch(e => {
      console.error(e.message);
      console.log(cp.naam);
      console.log(JSON.stringify(cp).length);
    });
  }
};

const processCsv = () => {
  fs.readFile(filename, 'utf8', async (err, csv) => {
    if (err) {
      throw err;
    }
    const data = Papa.parse(csv.replace(/^\uFEFF/, ''), {
      delimiter: ';',
      header: true,
      trimHeaders: true,
      transform: v => v.trim()
    }).data as ICsvModel[];
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
        naam: capitalizeFirstLetter(locatienaam),
        omschr: lomschrijving,
        nmr: vestigingsnummer,
        str: lstraat,
        pc: lpostcode,
        hn: lhuisnummer,
        toev: lhuisnummertoevoeging,
        wn: lwoonplaatsnaam,
        land: llandnaam || 'Nederland',
        aanv: laanvadresinfo,
        isWzd: ja(iswzdacco),
        isWzdAcco: jaNee(iswzdacco),
        isWvggz: ja(iswvggzacco),
        isWvggzAcco: jaNee(iswvggzacco),
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
    await resolveLocations(cps);
    await publishCps(cps);
  });
};
processCsv();
