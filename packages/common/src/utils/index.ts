import { IAddress, ICareProvider, ILocation } from '../models';

export const stripSpaces = (s: string) => s.replace(/\s/g, '');

/** Convert an address to something that is easy to query */
const addressToQueryTarget = (a: Partial<IAddress>) => {
  const { straat = '', huisnummer = 0, postcode = '', woonplaatsnaam = '' } = a;
  return `${stripSpaces(straat).toLowerCase()}${huisnummer ? huisnummer : ''}${stripSpaces(
    postcode
  ).toLowerCase()}${stripSpaces(woonplaatsnaam).toLowerCase()}`;
};

/** Convert an care provider object to something that is easy to query */
const careProviderToQueryTarget = (cp: Partial<ICareProvider>) => {
  const { naam = '', kvk = 0 } = cp;
  return `${stripSpaces(naam).toLowerCase()}${kvk ? kvk : ''}${addressToQueryTarget(cp)}`;
};

/** Convert an care provider object to something that is easy to query */
export const locationToQueryTarget = (loc: Partial<ILocation>) => {
  const { locatienaam = '', vestigingsnummer = 0 } = loc;
  return `${stripSpaces(locatienaam).toLowerCase()}${vestigingsnummer ? vestigingsnummer : ''}${addressToQueryTarget(
    loc
  )}`;
};

export const toQueryTarget = (cp: Partial<ICareProvider>) => {
  cp.target = careProviderToQueryTarget(cp);
  if (cp.locaties && cp.locaties instanceof Array) {
    cp.locaties.forEach(loc => (loc.target = locationToQueryTarget(loc)));
  }
  return cp;
};

export const isLocationActive = (loc: ILocation) => {
  if (!loc.aantekeningen) {
    return false;
  }
  const { datumIngang, datumEinde } = loc.aantekeningen[loc.aantekeningen.length - 1];
  const d = Date.now();
  const s = new Date(datumIngang).valueOf();
  const e = datumEinde ? new Date(datumEinde).valueOf() : Number.MAX_VALUE;
  return s <= d && d <= e;
};
