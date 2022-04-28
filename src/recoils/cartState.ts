import { atom } from 'recoil';
import { ProductCart } from '../models/orders/ProductCart';

export const CartState = atom<ProductCart>({
  key: 'cartState',
  default: {
    name: '',
    id: '',
    quantity: 1,
    price: 0,
    extras: [],
  },
});
