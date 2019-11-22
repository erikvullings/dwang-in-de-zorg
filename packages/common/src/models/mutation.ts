import { Diff } from 'deep-diff';
import { ICareProvider, ILokiObj } from './care-provider';

export interface IMutation extends ILokiObj {
  /** The one who has made the changes. */
  editor: string;
  /** The mutated document */
  docId: number;
  /** Differences */
  diff?: Array<Diff<Partial<ICareProvider>>>;
}
