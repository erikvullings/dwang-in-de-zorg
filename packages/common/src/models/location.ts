import { IActivity } from './activity';
import { IAddress } from './address';
import { IQueryable } from './care-provider';
import { CareType } from './care-type';

export type YesNo = 'ja' | 'nee';

export interface ILocation extends IAddress, IQueryable {
  /** Last edited on (date as number, Unix timestamp) */
  mutated: number;
  /** Locatienaam */
  naam: string;
  /** Locatieomschrijving */
  omschr: string;
  /** Vestigingsnummer */
  nmr?: string;
  /** Wordt op de locatie Wzd-zorg geleverd */
  isWzd?: boolean;
  /** Is de locatie een Wzd accommodatie */
  isWzdAcco: YesNo;
  /** Levert de Wzd accommodatie ambulante zorg */
  isWzdAmbu: YesNo;
  /** Wordt op de locatie Wvggz zorg geleverd */
  isWvggz?: boolean;
  /** Is de locatie een Wvggz accommodatie */
  isWvggzAcco: YesNo;
  /** Levert de Wzd accommodatie ambulante zorg */
  isWvggzAmbu: YesNo;
  /** Welk type zorg wordt geleverd */
  zv?: CareType[];
  /** Een locatie heeft 1..n aantekeningen */
  aant: IActivity[];
  /** Aantekening in BOPZ */
  isBopz?: boolean;
}
