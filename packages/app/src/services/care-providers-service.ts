import m from 'mithril';
import { ICareProvider, stripSpaces } from '../../../common/dist';
import { AppState } from '../models/app-state';
import { ChannelNames } from '../models/channels';
import { RestService } from './rest-service';

class CareProvidersService extends RestService<Partial<ICareProvider>> {
  constructor() {
    super('zorgaanbieders', ChannelNames.CARE);
  }

  public async loadList(): Promise<Array<Partial<ICareProvider>> | undefined> {
    const result = await m.request<ICareProvider[]>({
      method: 'GET',
      url: this.baseUrl,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }

  public async loadFilteredList(): Promise<Array<Partial<ICareProvider>> | undefined> {
    const filter = 'view?props=$loki,naam,kvk,locaties,owner,published,canEdit';
    // http://localhost:3000/events/view?props=name,cmFunctions,incidentType,eventType
    const result = await m.request<ICareProvider[]>({
      method: 'GET',
      url: this.baseUrl + filter,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }

  public async search(query: string): Promise<Array<Partial<ICareProvider>> | undefined> {
    const cleaned = stripSpaces(query).toLowerCase();
    if (cleaned.length <= 2) {
      this.setList([]);
      m.redraw();
      return;
    }
    const q = { $or: [{ target: { $contains: cleaned } }, { 'locaties.target': { $contains: cleaned } }] };
    // http://localhost:3000/zorgaanbieders?q={"target":{"$contains":"parn"}}
    // http://localhost:3000/zorgaanbieders?q={"locaties.target":{"$contains":"car"}}
    // http://localhost:3000/zorgaanbieders?q={"$or":[{"target":{"$contains":"car"}},{"locaties.target":{"$contains":"car"}}]}
    AppState.isSearching = true;
    const result = await m.request<ICareProvider[]>({
      method: 'GET',
      url: this.baseUrl,
      params: { q: JSON.stringify(q) },
      withCredentials: this.withCredentials,
    });
    AppState.isSearching = false;
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
  }
}

export const careProvidersSvc = new CareProvidersService();
