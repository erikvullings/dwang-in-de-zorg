import * as fs from 'fs';
import * as path from 'path';
import * as Papa from 'papaparse';
import { ICareProvider } from './models/care-provider';
import { ILocation } from './models/location';
import axios from 'axios';
import { toQueryTarget, locationToQueryTarget } from './utils';

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
  zvcontrolerenmiddelen?: string,
  zvbeperkeneigenleven?: string;
  zvbeperkenbezoek?: string;
  zvopnemen?: string;
  zvtijdelijkverblijf?: string;
}

fs.readFile(filename, 'utf8', function(err, csv) {
  if (err) throw err;
  const data = Papa.parse(csv.replace(/^\uFEFF/, ''), {
    delimiter: ';',
    header: true,
    trimHeaders: true,
    transform: v => v.trim(),
  }).data as Array<IImportedData>;
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
        //RoWe: zorgaanbieder aanvullende adresinfo
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
      } = cur;
      const location = {
        locatienaam,
        vestigingsnummer,
        straat: lstraat,
        postcode: lpostcode,
        huisnummer: +lhuisnummer,
        huisletter: lhuisletter,
        huisnummerToevoeging: lhuisnummerToevoeging,
        woonplaatsnaam: lwoonplaatsnaam,
        landnaam: llandnaam,
        // RoWe: extra velden
        aanvullendeAdresinformatie: laanvadresinfo,
        isEenAccommodatie: isaccommodatie,
        isEenWzdLocatie: iswzd,
        isEenWvggzLocatie: iswvggz,
      } as Partial<ILocation>;
      location.target = locationToQueryTarget(location);
      if (+kvk === acc.kvk) {
        // New location
        acc.locaties && acc.locaties.push(location as ILocation);
      } else {
        // Change of care provider
        const found = careProviders.filter(cp => cp.kvk === +kvk);
        if (found.length > 0) {
          acc = found[0];
        } else {
          // New provider
          acc = {
            naam,
            published: true,
            kvk: +kvk,
            straat,
            huisnummer: +huisnummer,
            huisletter,
            huisnummerToevoeging,
            postcode,
            woonplaatsnaam,
            landnaam,
            // RoWe: aanvullende adresinfo
            aanvullendeAdresinformatie: zaanvadresinfo,
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
  // console.log(JSON.stringify(careProviders, null, 2));
  careProviders.forEach(cp => axios.post('http://localhost:3000/zorgaanbieders', cp));
});
