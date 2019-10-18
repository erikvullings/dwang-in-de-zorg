import { IActivity } from './activity';
import { IAddress } from './address';
import { IQueryable } from './care-provider';

export interface ILocation extends IAddress, IQueryable {
  locatienaam: string;
  locatieomschrijving: string;
  vestigingsnummer?: number;
  /** Is de locatie een accommodatie (geschikt voor opname) */
  isAccommodatie: boolean;
  /** Wordt op de locatie Wzd-zorg geleverd */
  isWzd?: boolean;
  /** Wordt op de locatie Wvggz zorg geleverd */
  isWvggz?: boolean;
  /** Een locatie heeft 1..n "activity records" */
  aantekeningen: IActivity[];
}
