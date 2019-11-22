import { Operation } from 'rfc6902';
import { ILokiObj } from './care-provider';

export interface IMutation extends ILokiObj {
  /** The one who has made the changes. */
  editor: string;
  /** The mutated document */
  docId: number;
  /** Differences */
  patch?: Operation[];
  /** Save the changes to the following DB */
  saveChanges?: string;
}
