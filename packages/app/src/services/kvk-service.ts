import m from 'mithril';
import { IKvKSearchResult } from '../../../common/dist';
import { AppState } from '../models/app-state';
import { padLeft } from '../utils';

export const kvkService = {
  baseUrl: AppState.apiService + '/search/kvk?',
  searchKvK: async (kvk: string | number) => {
    return await m
      .request<IKvKSearchResult>({
        method: 'GET',
        url: kvkService.baseUrl + `kvkNumber=${padLeft(kvk, '0', 8)}`,
      })
      .catch(e => console.error(e));
  },
  searchBranch: async (kvk: string | number, branch: string | number) => {
    return await m
      .request<IKvKSearchResult>({
        method: 'GET',
        url: kvkService.baseUrl + `kvkNumber=${padLeft(kvk, '0', 8)}&branchNumber=${padLeft(branch, '0', 12)}`,
      })
      .catch(e => console.error(e));
  },
};
