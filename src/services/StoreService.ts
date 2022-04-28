import { Store } from '../models/stores/Store';
import { HttpService } from './HttpService';
export const StoreServices = {
  getMenu: (): Promise<Store[]> =>
    HttpService.tch.get('stores/all').then(({ data }) => {
      return data.stores as Store[];
    }),
};
