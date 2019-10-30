import { ILokiObj } from './care-provider';

export interface IMutation extends ILokiObj {
  /** The one who has made the changes. */
  editor: string;
  /** The mutated document */
  docId: number;
  /** The added properties */
  added?: { [key: string]: any };
  /** The deleted properties */
  deleted?: { [key: string]: any };
  /** The updated properties */
  updated?: { [key: string]: any };
}
