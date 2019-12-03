import { IAddress, ICareProvider, ILocation } from '../models';

export const stripSpaces = (s: string) => s.replace(/\s|,|\./g, '');

/** Convert an address to something that is easy to query */
const addressToQueryTarget = (a: Partial<IAddress>) => {
  const { str: straat = '', hn: huisnummer = 0, pc: postcode = '', wn: woonplaatsnaam = '' } = a;
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
  const { naam: locatienaam = '', nmr = 0 } = loc;
  return `${stripSpaces(locatienaam).toLowerCase()}${nmr ? nmr : ''}${addressToQueryTarget(loc)}`;
};

export const toQueryTarget = (cp: Partial<ICareProvider>) => {
  cp.target = careProviderToQueryTarget(cp);
  if (cp.locaties && cp.locaties instanceof Array) {
    cp.locaties.forEach(loc => (loc.target = locationToQueryTarget(loc)));
  }
  return cp;
};

/** Remove empty and undefined properties, returning a new copy. */
export const removeEmptyKeys = <T extends { [key: string]: any }>(obj: T): T =>
  Object.keys(obj)
    .filter(f => obj[f] != null)
    .reduce(
      (r, i) =>
        typeof obj[i] === 'object'
          ? Object.keys(obj[i]).length === 0
            ? r
            : { ...r, [i]: removeEmpty(obj[i]) } // recurse.
          : typeof obj[i] === 'undefined' || obj[i] === ''
          ? r
          : { ...r, [i]: obj[i] },
      {} as T
    );
// export const removeEmpty = <T extends { [key: string]: any }>(obj: T): T =>
//   Object.keys(obj)
//     .filter(k => obj[k] != null) // Remove undef. and null.
//     .reduce(
//       (newObj, k) =>
//         typeof obj[k] === 'object'
//           ? { ...newObj, [k]: removeEmpty(obj[k]) } // Recurse.
//           : { ...newObj, [k]: obj[k] }, // Copy value.
//       {} as T
//     );
/** Remove empty properties by mutating the original object. */
export const removeEmpty = <T>(obj: { [key: string]: any }): T => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === '' || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj as T;
};

export const isLocationActive = (loc: ILocation) => {
  if (!loc.aant || loc.aant.length === 0 || !(loc.isWvggz || loc.isWzd)) {
    return false;
  }
  const { di: datumIngang, de: datumEinde } = loc.aant[loc.aant.length - 1];
  if (!datumIngang) {
    return false;
  }
  const d = Date.now();
  const s = new Date(datumIngang).valueOf();
  const e = datumEinde ? new Date(datumEinde).valueOf() : Number.MAX_VALUE;
  return s <= d && d <= e;
};
