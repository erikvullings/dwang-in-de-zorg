import axios from 'axios';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as path from 'path';
import { ICareProvider, ILocation, locationToQueryTarget, removeEmpty, toQueryTarget } from '../../common/dist';

const filename = path.resolve(process.cwd(), 'locatieregister.csv');

interface IImportedData {
  naam: string;
  kvk: string;
  rechtsvorm?: string;
  straat: string;
  huisnummer: string;
  huisletter?: string;
  huisnummerToevoeging?: string;
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
  lhuisletter?: string;
  lhuisnummerToevoeging?: string;
  lpostcode: string;
  lwoonplaatsnaam: string;
  llandnaam: string;
  // RoWe: aanvullende adresinfo voor adressen van locatieadres
  laanvadresinfo?: string;
  // RoWe: isAccommodatie + onder welke wetten wordt zorg geleverd
  isaccommodatie?: string;
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

const ja = (value?: string) => (value ? value === 'ja' : undefined);

fs.readFile(filename, 'utf8', (err, csv) => {
  if (err) {
    throw err;
  }
  const data = Papa.parse(csv.replace(/^\uFEFF/, ''), {
    delimiter: ';',
    header: true,
    trimHeaders: true,
    transform: v => v.trim(),
  }).data as IImportedData[];
  const careProviders = [] as Array<Partial<ICareProvider>>;
  data.reduce(
    (acc, cur) => {
      const {
        naam,
        kvk,
        straat,
        huisnummer,
        huisletter,
        huisnummerToevoeging,
        postcode,
        woonplaatsnaam,
        landnaam,
        aantekeningingang,
        aantekeningeinde,
        // RoWe: zorgaanbieder aanvullende adresinfo
        zaanvadresinfo,
        locatienaam,
        vestigingsnummer,
        lstraat,
        lhuisnummer,
        lhuisletter,
        lhuisnummerToevoeging,
        lpostcode,
        lwoonplaatsnaam,
        llandnaam,
        // RoWe: extra velden
        laanvadresinfo,
        isaccommodatie,
        iswzd,
        iswvggz,
        zvvochtvoedingmedicatie,
        // zvmedishcecontroles,
        zvbeperkenbewegingsvrijheid,
        zvinsluiten,
        zvtoezicht,
        zvonderzoekkledinglichaam,
        zvonderzoekwoonruimte,
        zvcontrolerenmiddelen,
        zvbeperkeneigenleven,
        zvbeperkenbezoek,
        zvtijdelijkverblijf,
      } = cur;
      const zorgvormen = {
        isVochtVoedingMedicatie: ja(zvvochtvoedingmedicatie),
        // isMedischeControles: ja(zvmedishcecontroles),
        isBeperkenBewegingsvrijheid: ja(zvbeperkenbewegingsvrijheid),
        isInsluiten: ja(zvinsluiten),
        isToezicht: ja(zvtoezicht),
        isOnderzoekKledingLichaam: ja(zvonderzoekkledinglichaam),
        isOnderzoekWoonruimte: ja(zvonderzoekwoonruimte),
        isControlerenMiddelen: ja(zvcontrolerenmiddelen),
        isBeperkenEigenLeven: ja(zvbeperkeneigenleven),
        isBeperkenBezoek: ja(zvbeperkenbezoek),
        isTijdelijkVerblijf: ja(zvtijdelijkverblijf),
      } as { [key: string]: boolean | undefined };
      const now = Date.now();
      const location = {
        mutated: now,
        naam: locatienaam,
        nmr: vestigingsnummer,
        str: lstraat,
        pc: lpostcode,
        hn: lhuisnummer,
        hl: lhuisletter,
        toev: lhuisnummerToevoeging,
        wn: lwoonplaatsnaam,
        land: llandnaam || 'netherlands',
        aanv: laanvadresinfo,
        isWvggzAcco: ja(isaccommodatie),
        isWzd: ja(iswzd),
        isWvggz: ja(iswvggz),
        zv: Object.keys(zorgvormen).filter(key => zorgvormen[key]),
        aant: [
          {
            dc: now,
            di: new Date(aantekeningingang).valueOf(),
            de: aantekeningeinde ? new Date(aantekeningeinde).valueOf() : undefined,
          },
        ],
      } as Partial<ILocation>;
      location.target = locationToQueryTarget(location);
      if (kvk === acc.kvk && naam === acc.naam) {
        // New location
        if (acc.locaties) {
          acc.locaties.push(location as ILocation);
        }
      } else {
        // Change of care provider
        const found = careProviders.filter(cp => cp.kvk === kvk && cp.naam === naam);
        if (found.length > 0) {
          acc = found[0];
        } else if (naam) {
          // New provider
          acc = {
            naam,
            published: true,
            kvk,
            str: straat,
            hn: huisnummer,
            hl: huisletter,
            toev: huisnummerToevoeging,
            pc: postcode,
            wn: woonplaatsnaam,
            land: landnaam || 'netherlands',
            // RoWe: aanvullende adresinfo
            aanv: zaanvadresinfo,
            locaties: [location],
          } as Partial<ICareProvider>;
          toQueryTarget(acc);
          careProviders.push(acc);
        }
      }
      return acc;
    },
    {} as Partial<ICareProvider>
  );
  const cps = removeEmpty(careProviders) as Array<Partial<ICareProvider>>;

  cps.forEach(async cp => {
    await axios.post('http://localhost:3030/zorgaanbieders', cp).catch(e => {
      console.error(e.message);
      console.log(cp.naam);
      console.log(JSON.stringify(cp).length);
    });
  });
});
