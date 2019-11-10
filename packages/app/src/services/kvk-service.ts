import m from 'mithril';
import { IKvKSearchResult } from '../../../common/dist';
import { AppState } from '../models/app-state';
import { padLeft } from '../utils';

export const kvkService = {
  baseUrl: AppState.apiService + '/search?',
  searchKvK: async (kvk: string | number) => {
    return await m
      .request<IKvKSearchResult>({
        method: 'DELETE',
        url: kvkService.baseUrl + `legalPerson=false&kvkNumber=${padLeft(kvk, '0', 8)}`,
      })
      .catch(e => console.error(e));
  },
};
