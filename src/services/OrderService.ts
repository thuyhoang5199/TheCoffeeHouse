import { Product } from './../models/orders/Product';
import { Menu } from '../models/orders/Menu';
import { HttpService } from './HttpService';
export const OrderServices = {
  getMenu: (): Promise<Menu[]> =>
    HttpService.tch.post('menu', { src: 'TCH-WEB' }).then(({ data }) => {
      // return data.menu.slice(0, -1) as Menu[];
      return data.menu.filter((menu: Menu) => menu.slug !== 'combo-1');
    }),
  getProductDetail: (slug: string): Promise<Product> =>
    HttpService.tch
      .post('menu/product-detail', { slug: slug })
      .then(({ data }) => {
        // return data.menu.slice(0, -1) as Menu[];
        return data.product as Product;
      }),
};
