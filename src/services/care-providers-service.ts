import m from 'mithril';
import { ICareProvider } from '../models';
import { AppState } from '../models/app-state';
import { ChannelNames } from '../models/channels';
import { stripSpaces } from '../utils';
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

  public async search(query: string): Promise<Array<Partial<ICareProvider>> | undefined> {
    const cleaned = stripSpaces(query).toLowerCase();
    if (cleaned.length <= 2) {
      this.setList([]);
      m.redraw();
      return;
    }
    const q = { '$or': [
      {'target': {'$contains': cleaned }},
      {'locaties.target': {'$contains': cleaned }}
    ]};
    // http://localhost:3000/zorgaanbieders?q={"target":{"$contains":"parn"}}
    // http://localhost:3000/zorgaanbieders?q={"locaties.target":{"$contains":"car"}}
    // http://localhost:3000/zorgaanbieders?q={"$or":[{"target":{"$contains":"car"}},{"locaties.target":{"$contains":"car"}}]}
    try {
      AppState.isSearching = true;
      const result = await m.request<ICareProvider[]>({
        method: 'GET',
        url: this.baseUrl,
        params: { q: JSON.stringify(q) },
        withCredentials: this.withCredentials,
      });
      AppState.isSearching = false;
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
      return this.search(query);
    }
  }
}

export const careProvidersSvc = new CareProvidersService();
