import { IAddress } from './address';
import { IQueryable } from './care-provider';

export interface ILocation extends IAddress, IQueryable {
  locatienaam: string;
  locatieomschrijving: string;
  vestigingsnummer?: number;
  /** Is de locatie een accommodatie (geschikt voor opname) */
  isAccommodatie: boolean;
  /** Wordt op de locatie Wzd-zorg geleverd */
  hasWzdCare?: boolean;
  /** Wordt op de locatie Wvggz zorg geleverd */
  hasWvggzCare?: boolean;
  /** Ingangsdatum (als ISO string) */
  datumIngang: string;
  /** Einddatum (als ISO string) */
  datumEinde?: string;
}
