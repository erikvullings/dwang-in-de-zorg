import { IActivity } from './activity';
import { IAddress } from './address';
import { IQueryable } from './care-provider';

export interface ILocation extends IAddress, IQueryable, IActivity {
  locatienaam: string;
  locatieomschrijving: string;
  vestigingsnummer?: number;
  /** Is de locatie een accommodatie (geschikt voor opname) */
  isEenAccommodatie: boolean;
  /** Wordt op de locatie Wzd-zorg geleverd */
  isEenWzdLocatie?: boolean;
  /** Wordt op de locatie Wvggz zorg geleverd */
  isEenWvggzLocatie?: boolean;
}
