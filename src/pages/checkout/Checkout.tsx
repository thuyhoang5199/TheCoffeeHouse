import { get, isEmpty, isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import useSWR from 'swr';
import { ModalPromotion } from '../../components/promotion/ModalPromotion';
import { ProductCart, ProductExtraCart } from '../../models/orders/ProductCart';
import { CampaignsItem, Promotion } from '../../models/Promotion';
import { addToCardState, cartTotal } from '../../recoils/AddToCardState';
import { PromotionService } from '../../services/PromotionService';
export const CheckoutPage = () => {
  const [carts, setCarts] = useRecoilState(addToCardState);
  const total = useRecoilValue(cartTotal);
  const [dataPromotion, setdataPromotion] = useState<Promotion[]>([]);
  const [coupon, setCoupon] = useState<CampaignsItem[]>([]);
  const { data, error } = useSWR('PROMOTION', PromotionService.getMenu);
  useEffect(() => {
    if (isNil(data) || isEmpty(data)) {
      setCoupon([]);
      // setdataPromotion([]);
    } else {
      // console.log(data);
      setdataPromotion(data);
      setCoupon(get(data, '[0].campaigns', []));
    }
  }, [data]);
  // console.log('coupon', coupon);
  // console.log('dataPromotion', dataPromotion);

  if (error) {
    console.log(error.message);
  }

  const clickShowModalPromotion = (
    e: any,
    coupon: CampaignsItem[] | undefined,
  ) => {
    e.preventDefault();
    if (!isNil(coupon)) {
      const inputModalPromotion = document.getElementById(
        'modalPromotions',
      ) as HTMLInputElement;
      if (!isNil(inputModalPromotion)) {
        inputModalPromotion.click();
      }
    }
  };
  // const clickShowPromotionDetail = (coupon: CampaignsItem[] | undefined, ) =>{
  // }

  const removeToCart = (id: string) => {
    let newCarts = carts.filter((arrCarts: ProductCart) => arrCarts.id != id);
    setCarts(newCarts);
  };
  const resetCarts = useResetRecoilState(addToCardState);

  return (
    <div>
      {!isNil(carts) ? (
        carts.map((itemCarts: ProductCart, index: number) => (
          <div key={index}>
            <p>
              {itemCarts.name} x {itemCarts.quantity}
            </p>

            {!isNil(itemCarts.extras) ? (
              itemCarts.extras.map(
                (itemExtra: ProductExtraCart, index: number) => (
                  <div key={index} className='text-blue pl-8'>
                    <h1>
                      {itemExtra.name} x {itemExtra.quantity}
                    </h1>
                  </div>
                ),
              )
            ) : (
              <></>
            )}

            <p>{itemCarts.price}</p>
            <button onClick={() => removeToCart(itemCarts.id)}>xóa</button>
          </div>
        ))
      ) : (
        <></>
      )}
      <h1>total: {total}</h1>
      <button onClick={(e: any) => clickShowModalPromotion(e, coupon)}>
        khuyen mai
      </button>

      <button onClick={resetCarts} className=''>
        Xóa đơn hàng
      </button>
      <ModalPromotion coupon={coupon} dataPromotion={dataPromotion} />
    </div>
  );
};
