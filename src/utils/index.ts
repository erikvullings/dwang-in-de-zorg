import { ICareProvider } from '../models';
import { IAddress } from '../models/vws/address';
import { ILocation } from '../models/vws/location';

/**
 * Create a GUID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uniqueId = () => {
  return 'idxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const capitalizeFirstLetter = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

export const toLetters = (num: number): string => {
  const mod = num % 26;
  // tslint:disable-next-line:no-bitwise
  let pow = (num / 26) | 0;
  const out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
  return pow ? toLetters(pow) + out : out;
};

/**
 * Generate a sequence of numbers between from and to with step size: [from, to].
 *
 * @static
 * @param {number} from
 * @param {number} to : inclusive
 * @param {number} [count=to-from+1]
 * @param {number} [step=1]
 * @returns
 */
export const range = (from: number, to: number, count: number = to - from + 1, step: number = 1) => {
  // See here: http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  // let a = Array.apply(null, {length: n}).map(Function.call, Math.random);
  const a: number[] = new Array(count);
  const min = from;
  const max = to - (count - 1) * step;
  const theRange = max - min;
  const x0 = Math.round(from + theRange * Math.random());
  for (let i = 0; i < count; i++) {
    a[i] = x0 + i * step;
  }
  return a;
};

/**
 * Function to filter case-insensitive name and description.
 * @param filterValue Filter text
 */
export const nameAndDescriptionFilter = (filterValue?: string) => {
  if (!filterValue) {
    return () => true;
  }
  const fv = filterValue.toLowerCase() as string;
  return (content: { naam?: string; kvk?: number }) =>
    !content.naam || content.naam.toLowerCase().indexOf(fv) >= 0 || (content.kvk && `${content.kvk}`.indexOf(fv) >= 0);
};

/**
 * Function to filter on a named type.
 * @param filterValue Filter text
 */
export const typeFilter = (propName: keyof ICareProvider, filterValue?: Array<string | number>) => {
  if (!filterValue || filterValue.length === 0) {
    return () => true;
  }
  return filterValue instanceof Array
    ? (c: Partial<ICareProvider>) =>
        c.hasOwnProperty(propName) &&
        (c[propName] instanceof Array
          ? filterValue.reduce((acc, fv) => acc || (c[propName] as Array<string | number>).indexOf(fv) >= 0, false)
          : filterValue.indexOf(c[propName] as string) >= 0)
    : (c: Partial<ICareProvider>) =>
        c.hasOwnProperty(propName) &&
        (c[propName] instanceof Array
          ? (c[propName] as Array<string | number>).indexOf(filterValue) >= 0
          : c[propName] === filterValue);
};

/**
 * Convert strings like XmlHTTPRequest to Xml HTTP Request
 * @see https://stackoverflow.com/a/6229124/319711
 */
export const unCamelCase = (str?: string) =>
  str
    ? str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // insert a space between lower & upper
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3') // space before last upper in a sequence followed by lower
        .replace(/^./, char => char.toUpperCase()) // uppercase the first character
    : '';

export const deepEqual = <T extends { [key: string]: any }>(x?: T, y?: T): boolean => {
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? Object.keys(x).length === Object.keys(y).length && Object.keys(x).every(key => deepEqual(x[key], y[key]))
    : x === y;
};

// let i = 0;
// console.log(`${++i}: ${deepEqual([1, 2, 3], [1, 2, 3])}`);
// console.log(`${++i}: ${deepEqual([1, 2, 3], [1, 2, 3, 4])}`);
// console.log(`${++i}: ${deepEqual({ a: 'foo', b: 'bar' }, { a: 'foo', b: 'bar' })}`);
// console.log(`${++i}: ${deepEqual({ a: 'foo', b: 'bar' }, { b: 'bar', a: 'foo' })}`);

/** Remove paragraphs <p> and </p> and the beginning and end of a string. */
export const removeParagraphs = (s: string) => s.replace(/<\/?p>/g, '');

export const removeHtml = (s: string) => s.replace(/<\/?[0-9a-zA-Z=\[\]_ \-"]+>/gm, '').replace(/&quot;/gi, '"');

/**
 * Join a list of items with a comma.
 * Removes empty items, and optionally adds brackets around the comma separated list.
 */
export const formatOptional = (
  options: { brackets?: boolean; prepend?: string; append?: string },
  ...items: Array<string | number | undefined>
) => {
  const { brackets, prepend = '', append = '' } = options;
  const f = items.filter(i => typeof i !== 'undefined' && i !== '');
  if (!f || f.length === 0) {
    return '';
  }
  const txt = `${prepend}${f.join(', ')}${append}`;
  return f.length === 0 ? '' : brackets ? ` (${txt})` : txt;
};

/** Print optional */
export const p = (val: string | number | Date | undefined, output?: string) => (val ? output || val : '');

/** Print a list: a, b and c */
export const l = (val: undefined | string | string[]) => {
  if (!val) {
    return '';
  }
  if (val instanceof Array) {
    if (val.length === 1) {
      return val[0];
    }
    const [last, oneButLast, ...items] = val.reverse();
    return [...items, `${oneButLast} en ${last}`].filter(Boolean).join(', ');
  } else {
    return val;
  }
};

export const stripSpaces = (s: string) => s.replace(/\s/g, '');

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
const locationToQueryTarget = (loc: Partial<ILocation>) => {
  const { locatienaam = '', vestigingsnummer = 0 } = loc;
  return `${stripSpaces(locatienaam).toLowerCase()}${vestigingsnummer}${addressToQueryTarget(loc)}`;
};

export const toQueryTarget = (cp: Partial<ICareProvider>) => {
  cp.target = careProviderToQueryTarget(cp);
  if (cp.locaties && cp.locaties instanceof Array) {
    cp.locaties.forEach(loc => loc.target = locationToQueryTarget(loc));
  }
  return cp;
};

export const isLocationActive = (loc: ILocation) => {
  const d = Date.now();
  if (!loc.datumIngang) {
    return false;
  }
  const s = new Date(loc.datumIngang).valueOf();
  const e = loc.datumEinde ? new Date(loc.datumEinde).valueOf() : Number.MAX_VALUE;
  return s <= d && d <= e;
};

export const debounce = (func: (...args: any) => void, timeout: number) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
