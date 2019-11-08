import { IActivity } from './activity';
import { IAddress } from './address';
import { IQueryable } from './care-provider';
import { CareType } from './care-type';

export interface ILocation extends IAddress, IQueryable {
  /** Last edited on (date as number, Unix timestamp) */
  mutated: number;
  /** Locatienaam */
  naam: string;
  /** Locatieomschrijving */
  omschr: string;
  /** Vestigingsnummer */
  nmr?: number;
  /** Wordt op de locatie Wzd-zorg geleverd */
  isWzd?: boolean;
  /** Is de locatie een WZD accommodatie */
  isWzdAcco: boolean;
  /** Levert de WZD accomodatie ambulante zorg */
  isWzdAmbu: boolean;
  /** Wordt op de locatie Wvggz zorg geleverd */
  isWvggz?: boolean;
  /** Is de locatie een WVGGZ accommodatie */
  isWvggzAcco: boolean;
  /** Levert de WZD accomodatie ambulante zorg */
  isWvggzAmbu: boolean;
  /** Welk type zorg wordt geleverd */
  zv?: CareType[];
  /** Een locatie heeft 1..n aantekeningen */
  aant: IActivity[];
}
