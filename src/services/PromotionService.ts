import { Promotion } from '../models/Promotion';
import { HttpService } from './HttpService';

export const PromotionService = {
  getMenu: (): Promise<Promotion[]> =>
    HttpService.tch
      .post('coupon/dashboard', { is_limit_order: true })
      .then(({ data }) => {
        return data.results as Promotion[];
      }),
};
