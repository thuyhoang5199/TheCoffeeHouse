import {
  faAngleLeft,
  faClone,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNil, lowerFirst } from 'lodash';
import React, { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CampaignsItem, CouponsItem, Promotion } from '../../models/Promotion';
import { promotionState } from '../../recoils/PromotionState';

export const ModalPromotion = ({
  coupon,
  dataPromotion,
}: {
  coupon: CampaignsItem[] | undefined;
  dataPromotion: Promotion[] | undefined;
}) => {
  const [promotion, setPromotion] = useState<CampaignsItem | undefined>(
    undefined,
  );

  // const clickShowPromotionDetail = (itemCouponDetail: CouponsItem[]) => {
  //   if (!isNil(itemCouponDetail)) {
  //     const inputModalPromotion = document.getElementById(
  //       'modalPromotionsDetail',
  //     ) as HTMLInputElement;
  //     if (!isNil(inputModalPromotion)) {
  //       inputModalPromotion.click();
  //     }
  //   }
  // };
  const clickShowPromotionDetail = (index: number) => {
    const inputModalPromotion = document.getElementById(
      'modalPromotionsDetail',
    ) as HTMLInputElement;
    if (!isNil(inputModalPromotion)) {
      inputModalPromotion.click();
    }
    if (!isNil(coupon)) setPromotion(coupon[index]);
  };

  return (
    <div>
      <input type='checkbox' id='modalPromotions' className='modal-toggle' />
      <label htmlFor='modalPromotions' className='modal cursor-pointer'>
        <label className='modal-box sm:w-[402px] p-0 relative' htmlFor=''>
          <div className='p-2 flex items-center border-b  '>
            <label
              htmlFor='modalPromotions'
              className='cursor-pointer p-2 text-2xl text-gray-400'
            >
              <FontAwesomeIcon className=' text-black h-4' icon={faXmark} />
            </label>
            <h5 className='text-base leading-6 font-semibold text-gray-900 dark:text-white mx-auto '>
              Khuyến mãi
            </h5>
          </div>
          <div className='p-4'>
            <div className='flex border bg-[#fafafa] justify-between mb-4'>
              <img
                className='px-3'
                src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDBIMThWNUgxNlYySDEyVjBaTTYgMFYySDJWNUgwVjBINlpNMTIgMThWMTZIMTZWMTNIMThWMThIMTJaTTYgMThIMFYxM0gyVjE2SDZWMThaTTAgOEgxOFYxMEgwVjhaIiBmaWxsPSIjRkE4QzE2Ii8+Cjwvc3ZnPgo='
                alt=''
              />
              <input
                className='px-[11px] text-base font-[inherit] bg-[#fafafa]'
                type='text'
                placeholder='Nhập mã khuyến mãi'
                required
              />
              <button className='text-white bg-[#ededee] py-1.5 px-[22px] '>
                Áp dụng
              </button>
            </div>
            <div>
              {!isNil(dataPromotion) ? (
                dataPromotion.map((data: Promotion, index: number) => (
                  <p
                    key={index}
                    className='bg-[#ededee] py-1.5 px-4 font-semibold text-xs leading-6 text-[#666] uppercase mx-[-16px]'
                  >
                    {data.title}
                  </p>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className='pt-[22px] '>
              {!isNil(coupon) ? (
                coupon.map((itemCoupon: CampaignsItem, index: number) => (
                  <label
                    onClick={() => clickShowPromotionDetail(index)}
                    key={index}
                    className='mb-2 py-5 px-4 flex items-center bg-[url("https://order.thecoffeehouse.com/_nuxt/img/card_voucher.321d7af.png")] background-size bg-[100%_100%] shadow-[0px_10px_20px_rgba(0,0,0,0.1)]'
                  >
                    <img
                      className='pl-2.5 h-20 pr-6'
                      src={itemCoupon.image}
                      alt=''
                    />
                    <div className='pr-4 pl-8'>
                      <p>{itemCoupon.title}</p>
                      <p className='text-[#26262694] text-xs leading-[22px]'>
                        {itemCoupon.time_left}
                      </p>
                      <label
                        className='text-[#fa8c16] text-base cursor-pointer'
                        htmlFor='modalPromotions'
                      >
                        Sử dụng ngay
                      </label>
                    </div>
                  </label>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </label>
      </label>

      <input
        type='checkbox'
        id='modalPromotionsDetail'
        className='modal-toggle'
      />
      <label htmlFor='modalPromotionsDetail' className='modal cursor-pointer'>
        <label className='modal-box sm:w-[402px] p-0 relative' htmlFor=''>
          <div className='p-2 flex items-center border-b  '>
            <label
              htmlFor='modalPromotionsDetail'
              className='cursor-pointer p-2 text-2xl text-gray-400'
            >
              <FontAwesomeIcon className=' text-black h-4' icon={faAngleLeft} />
            </label>
            <h5 className='text-base leading-6 font-semibold text-gray-900 dark:text-white mx-auto '>
              Chi tiết khuyến mãi
            </h5>
          </div>
          <div className='p-4'>
            {!isNil(promotion) ? (
              <div>
                <div className='pt-4 pb-[138px] sm:pb-[84px] flex justify-between flex-col items-center'>
                  <h4 className='font-semibold text-lg leading-[26px] mb-1'>
                    {promotion.title}
                  </h4>
                  <p className='mb-8 text-sm leading-[22px] text-[#26262694]'>
                    {promotion.time_left}
                  </p>
                  <img
                    className='w-[152px] h-[152px] mb-3'
                    src='https://order.thecoffeehouse.com/_nuxt/img/QR-code.3bf0228.png'
                    alt=''
                  />
                  {promotion.coupons.map((detailCoupons: CouponsItem) => (
                    <div className='flex items-center'>
                      <p className='mr-1 text-sm leading-6 font-semibold text-[#0084ff]'>
                        {detailCoupons.barcode}
                      </p>
                      <FontAwesomeIcon
                        className=' text-[#e4e4e4] text-sm leading-none '
                        icon={faClone}
                      />
                    </div>
                  ))}
                  <p className='text-[#0084ff] text-sm leading-6 font-semibold text-center'>
                    {promotion.description}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </label>
      </label>
    </div>
  );
};
