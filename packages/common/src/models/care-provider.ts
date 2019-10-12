import { IAddress } from './address';
import { ILocation } from './location';

export interface ILokiObj {
  $loki: number;
  meta: {
    created: number; // Date().getTime()
    revision: number;
    updated: number; // Date().getTime()
    version: number;
  };
}

export interface IQueryable {
  /** Query target, to facilitate querying the database across multiple fields */
  target: string;
}

export interface ICareProvider extends ILokiObj, IAddress, IQueryable {
  /** Owner of the document */
  owner: string;
  /** If true, the document is published */
  published: boolean;
  /** List of emails of the persons who can edit this document */
  canEdit: string[];

  naam: string;
  kvk: number;
  /** Number as used by the NHR */
  rechtsvorm: number;
  locaties: ILocation[];
}
