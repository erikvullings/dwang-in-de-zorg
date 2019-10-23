import { IActivity } from './activity';
import { IAddress } from './address';
import { IQueryable } from './care-provider';
import { CareType } from './care-type';

export interface ILocation extends IAddress, IQueryable {
  locatienaam: string;
  locatieomschrijving: string;
  vestigingsnummer?: number;
  /** Is de locatie een WZD accommodatie */
  isWzdAcco: boolean;
  /** Is de locatie een WVGGZ accommodatie */
  isWvggzAcco: boolean;
  /** Wordt op de locatie Wzd-zorg geleverd */
  isWzd?: boolean;
  /** Wordt op de locatie Wvggz zorg geleverd */
  isWvggz?: boolean;
  /** Welk type zorg wordt geleverd */
  zorgvorm?: CareType[];
  /** Een locatie heeft 1..n "activity records" */
  aantekeningen: IActivity[];
}
