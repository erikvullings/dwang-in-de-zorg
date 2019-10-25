import { IMutation } from '../../../common/dist';
import { ChannelNames } from '../models/channels';
import { RestService } from './rest-service';

class MutationsService extends RestService<Partial<IMutation>> {
  constructor() {
    super('mutaties', ChannelNames.MUTATIONS);
  }
}

export const mutationsSvc = new MutationsService();
