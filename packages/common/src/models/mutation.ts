import { ILokiObj } from './care-provider';

export interface IMutation extends ILokiObj {
  /** The mutated document */
  docId: number;
  /** The changed properties */
  changes: { [key: string]: any };
}
