export interface IActivity {
  /** RoWe: volgnr van het "activity" record */
  // volgnr: number;
  /** Ingangsdatum (als ISO string) */
  datumIngang: string;
  /** Einddatum (als ISO string) */
  datumEinde?: string;
}
