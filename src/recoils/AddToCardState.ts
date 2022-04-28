import { atom, selector, useRecoilState } from 'recoil';
import { ProductCart } from '../models/orders/ProductCart';
// import { CartState } from './CartState';
// import { ProductCart } from '../models/orders/ProductCart';

export const addToCardState = atom<ProductCart[]>({
  key: 'addToCartState',
  default: [],
});

export const addToCart = (carts: ProductCart[], itemCart: ProductCart) => {
  const newCarts = [...carts];

  newCarts.push(itemCart);

  console.log(newCarts);

  return newCarts;
};

export const cartTotal = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const carts = get(addToCardState);
    return carts.reduce((total, item) => {
      return total + item.price;
    }, 0);
  },
});
