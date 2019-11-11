import m from 'mithril';
import { ICareProvider, stripSpaces } from '../../../common/dist';
import { AppState } from '../models/app-state';
import { ChannelNames } from '../models/channels';
import { RestService } from './rest-service';

class CareProvidersService extends RestService<Partial<ICareProvider>> {
  constructor() {
    super('zorgaanbieders', ChannelNames.CARE);
  }

  /** Check if the KvK is already registered. */
  public checkKvk(kvk: string | number) {
    return this.filteredList.some(cp => cp.kvk === kvk);
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

  public async loadFilteredList() {
    return super.loadFilteredList('view?props=$loki,meta,naam,kvk,wn,owner,published,canEdit');
  }

  public async search(query: string): Promise<Array<Partial<ICareProvider>> | undefined> {
    const cleaned = stripSpaces(query).toLowerCase();
    if (cleaned.length <= 2) {
      this.setList(this.filteredList);
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
