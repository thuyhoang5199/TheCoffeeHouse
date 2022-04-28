import { MenuNew } from '../models/news/MenuNew';
import { HttpService } from './HttpService';
export const NewServices = {
  getMenu: (): Promise<MenuNew[]> =>
    HttpService.tch.get('news/newsfeed').then(({ data }) => {
      return data.news as MenuNew[];
    }),
};
