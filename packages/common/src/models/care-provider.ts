import { IAddress } from './address';
import { ILocation } from './location';

export interface ILokiObj {
  /** Unique identifier */
  $loki: number;
  /** Meta data */
  meta: {
    /** Created date as number since 1 Jan 1970 */
    created: number; // Date().getTime()
    /** Revision number, is increased on each save */
    revision: number;
    /** Updated date as number since 1 Jan 1970 */
    updated: number; // Date().getTime()
    version: number;
  };
}

export interface IQueryable {
  /** Query target, to facilitate querying the database across multiple fields */
  target: string;
}

export interface ICareProvider extends ILokiObj, IAddress, IQueryable {
  /** Owner(s) of the document */
  owner: string[];
  /** If true, the document is published */
  published: boolean;
  /** List of emails of the persons who can edit this document */
  canEdit: string[];
  /** Name of the care provider */
  naam: string;
  /** KVK number as string */
  kvk: string;
  /** Text as used by the NHR */
  rechtsvorm: string;
  /** Branches or 'vestigingen' in NHR */
  locaties: ILocation[];
}
