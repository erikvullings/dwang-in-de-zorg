import { IAddress } from '../models/address';

import { ICareProvider } from '../models/care-provider';

import { ILocation } from '../models/location';

const stripSpaces = (s: string) => s.replace(/\s/g, '');

/** Convert an address to something that is easy to query */
const addressToQueryTarget = (a: Partial<IAddress>) => {
  const { straat = '', huisnummer = 0, postcode = '', woonplaatsnaam = '' } = a;
  return `${stripSpaces(straat).toLowerCase()}${huisnummer}${stripSpaces(postcode).toLowerCase()}${stripSpaces(
    woonplaatsnaam
  ).toLowerCase()}`;
};

/** Convert an care provider object to something that is easy to query */
const careProviderToQueryTarget = (cp: Partial<ICareProvider>) => {
  const { naam = '', kvk = 0 } = cp;
  return `${stripSpaces(naam).toLowerCase()}${kvk}${addressToQueryTarget(cp)}`;
};

/** Convert an care provider object to something that is easy to query */
export const locationToQueryTarget = (loc: Partial<ILocation>) => {
  const { locatienaam = '', vestigingsnummer = 0 } = loc;
  return `${stripSpaces(locatienaam).toLowerCase()}${vestigingsnummer}${addressToQueryTarget(loc)}`;
};

export const toQueryTarget = (cp: Partial<ICareProvider>, includeLocations = false) => {
  cp.target = careProviderToQueryTarget(cp);
  if (includeLocations && cp.locaties && cp.locaties instanceof Array) {
    cp.locaties.forEach(loc => loc.target = locationToQueryTarget(loc));
  }
  return cp;
};
