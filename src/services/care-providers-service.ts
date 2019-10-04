import m from 'mithril';
import { ICareProvider } from '../models';
import { ChannelNames } from '../models/channels';
import { RestService } from './rest-service';

class CareProvidersService extends RestService<Partial<ICareProvider>> {
  constructor() {
    super('zorgaanbieders', ChannelNames.CARE);
  }

  public async loadList(): Promise<Array<Partial<ICareProvider>> | undefined> {
    const filter = 'view?props=$loki,naam,kvk,locaties,owner,published,canEdit';
    // http://localhost:3000/events/view?props=name,cmFunctions,incidentType,eventType
    try {
      const result = await m.request<ICareProvider[]>({
        method: 'GET',
        url: this.baseUrl + filter,
        withCredentials: this.withCredentials,
      });
      if (!result) {
        throw Error('No result found at ' + this.baseUrl);
      }
      this.setList(result);
      return this.list;
    } catch (error) {
      if (this.useDevServer) {
        console.warn(`No result found at ${this.baseUrl}\n${error}`);
      }
      this.useDevServer = true;
      this.baseUrl = this.createBaseUrl(true);
      return this.loadList();
    }
  }
}

export const CareProvidersSvc = new CareProvidersService();
