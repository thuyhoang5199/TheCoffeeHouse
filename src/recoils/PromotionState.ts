import { atom } from 'recoil';
import { CouponsItem } from '../models/Promotion';

export const promotionState = atom<CouponsItem>({
  key: 'promotionState',
  default: undefined,
});
