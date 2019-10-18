import { ICareProvider } from '../../../common/dist';

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
 * Function to filter case-insensitive name and description.
 * @param filterValue Filter text
 */
export const targetFilter = (filterValue?: string) => {
  if (!filterValue) {
    return () => true;
  }
  const fv = filterValue.toLowerCase().trim() as string;
  return (content: { target?: string }) => content.target && content.target.indexOf(fv) >= 0;
};

/** Limit the length of a list using a filter */
export const limitLength = (limit: number) => (_: any, i: number) => i < limit;

/** Slice an array */
export const slice = (from: number, to: number) => (_: any, i: number) => from <= i && i < to;

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

export const debounce = (func: (...args: any) => void, timeout: number) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const padLeft = (str: string | number, ch = ' ', len = 2): string =>
  str.toString().length >= len ? str.toString() : padLeft(ch + str.toString(), ch, len);

  
/**
 * Generate a sequence of numbers between from and to with step size: [from, to].
 *
 * @static
 * @param {number} from
 * @param {number} to : inclusive
 * @param {number} [step=1]
 * @returns
 */
export const range = (from: number, to: number, step: number = 1) => {
  const arr = [] as number[];
  for (let i = from; i <= to; i += step) {
    arr.push(i);
  }
  return arr;
};
