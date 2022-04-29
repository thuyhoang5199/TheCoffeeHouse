import { faHourglass1, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, isNil } from 'lodash';
import React from 'react';
import {
  Product,
  ProductOption,
  ProductOptionItem,
} from '../../models/orders/Product';
import { ProductCart, ProductExtraCart } from '../../models/orders/ProductCart';
import { numberWithCommas } from '../../utils/common';

export const ModalProductDetail = ({
  product,
  cart,
  minusCart,
  plusCart,
  plusCartDetailQuantity,
  minusCartDetailQuantity,
  changeCartDetailExtra,
  handleAddToCart,
}: {
  product: Product | null | undefined;
  cart: ProductCart;
  minusCart: Function;
  plusCart: Function;
  plusCartDetailQuantity: Function;
  minusCartDetailQuantity: Function;
  changeCartDetailExtra: Function;
  handleAddToCart: Function;
}) => {
  // console.log(JSON.stringify(cart));
  return (
    <div>
      <input type='checkbox' id='modalProductDetail' className='modal-toggle' />
      <label
        htmlFor='modalProductDetail'
        className='modal cursor-pointer z-[9999]'
      >
        <label
          className='modal-box relative p-0 w-full  max-w-md h-full md:h-auto'
          htmlFor=''
        >
          <div className='p-4 flex items-center border-b  '>
            <label
              htmlFor='modalProductDetail'
              className='cursor-pointer p-2 text-2xl text-gray-400'
            >
              ✕
            </label>
            <h5 className='text-base leading-6 font-semibold text-gray-900 dark:text-white mx-auto'>
              Thêm món mới
            </h5>
          </div>
          <div className='p-6 space-y-6'>
            <div className='flex'>
              <img
                className='h-[140px] w-[140px]'
                src={get(product, 'thumbnail', '')}
                alt=''
              />
              <div className='pl-4'>
                <p className='text-lg leading-6 text-[#262626]  font-semibold'>
                  {get(product, 'name', '')}
                </p>
                <p className='leading-[22px] text-base text-[#666] font-normal'>
                  {get(product, 'description', '')}
                </p>
                <div className='flex justify-between mt-5'>
                  <p>{get(product, 'price_str', '')}</p>
                  <div className='flex '>
                    <button
                      onClick={() => minusCart()}
                      className={`rounded-full w-[32px] h-[32px] flex items-center justify-center ${
                        cart.quantity > 1 ? ' bg-[#fa8c16]' : ' bg-[#e4e4e4]'
                      }`}
                    >
                      <FontAwesomeIcon className=' text-white' icon={faMinus} />
                    </button>
                    <p className='text-lg mx-[18px]'>{cart.quantity}</p>
                    <button
                      onClick={() => plusCart()}
                      className=' rounded-full bg-[#fa8c16] w-[32px] h-[32px] flex items-center justify-center'
                    >
                      <FontAwesomeIcon className=' text-white' icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-solid bg-[#f5f5f5] border border-[#ededee] rounded flex h-11 mt-9'>
              <FontAwesomeIcon
                className='text-[#e4e4e4] h-5 w-[18px] my-3 mx-[11px]'
                icon={faSquarePollHorizontal}
              />
              <input
                type='text'
                className='bg-white  px-4 focus:outline-none font-[inherit] overflow-visible outline-0 flex-1 border-0'
                placeholder='Ghi chú thêm cho món này'
                required
              />
            </div>
          </div>
          <div>
            {get(product, 'options', []).map((option: ProductOption) => (
              <div key={option.group_id}>
                <p className='bg-[#e4e4e4] py-2 px-[22px] font-semibold text-xs leading-6 text-[#666] uppercase '>
                  CHỌN {option.name}{' '}
                  {option.min > 0 ? '(BẮT BUỘC)' : '(TÙY CHỌN)'}
                </p>
                <div className='flex px-4 justify-between'>
                  {option.min == 1 && option.max == 1 ? (
                    option.items.map(
                      (item: ProductOptionItem, index: number) => (
                        <div className='flex items-center' key={item.id}>
                          <input
                            id={item.id}
                            name={option.group_id.toString()}
                            type='radio'
                            defaultChecked={option.default_index == index}
                            className=' box-border w-6 h-6  overflow-visible radio checked:bg-[#fa8c16]'
                            onClick={() => {
                              if (option.items.length > 1)
                                changeCartDetailExtra(item.id, option.group_id);
                            }}
                          />
                          <div className='pl-3 flex-col justify-center flex'>
                            <label htmlFor={item.id}>{item.name}</label>
                            <label htmlFor={item.id}>{item.price_str}</label>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <></>
                  )}
                </div>
                <div className='px-4 pb-4'>
                  {option.min == 0 && option.max >= 1 ? (
                    option.items.map(
                      (item: ProductOptionItem, index: number) => (
                        <div
                          className='py-[15px] h-[70px] mx-[15px] border-t first:border-t-0 flex justify-between items-center'
                          key={item.id}
                        >
                          <div className='p-b-[1px]'>
                            <p>{item.name}</p>
                            <p>{item.price_str}</p>
                          </div>
                          <div className='flex items-center '>
                            <button
                              className={`rounded-full bg-white  w-6 h-6 border-2 border-[#e4e4e4] flex items-center justify-center ${
                                get(
                                  cart.extras.find(
                                    (extra: ProductExtraCart) =>
                                      extra.id == item.id,
                                  ),
                                  'quantity',
                                  0,
                                ) == 0
                                  ? ' hidden'
                                  : ' '
                              }`}
                            >
                              <FontAwesomeIcon
                                className='text-[#e4e4e4] text-base font-black antialiased inline-block not-italic '
                                icon={faMinus}
                                onClick={() =>
                                  minusCartDetailQuantity(
                                    item.id,
                                    option.group_id,
                                  )
                                }
                              />
                            </button>
                            <p className='text-lg mx-[8px]'>
                              {get(
                                cart.extras.find(
                                  (extra: ProductExtraCart) =>
                                    extra.id == item.id,
                                ),
                                'quantity',
                                0,
                              )}
                            </p>
                            <button className=' rounded-full bg-white border-2 border-[#e4e4e4] w-6 h-6 flex items-center justify-center'>
                              <FontAwesomeIcon
                                className=' text-[#e4e4e4] text-base font-black antialiased inline-block not-italic'
                                icon={faPlus}
                                onClick={() =>
                                  plusCartDetailQuantity(
                                    item.id,
                                    option.group_id,
                                  )
                                }
                              />
                            </button>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
            <div className='flex p-3 justify-end items-center'>
              <label
                htmlFor='modalProductDetail'
                onClick={() => handleAddToCart()}
                className='flex items-center justify-center w-[376px] h-12 text-white bg-gradient-to-r from-[#e87800] to-[#fa8c16] shadow-[0px_2px_8px_rgba(0,0,0,0.12)] rounded-r-full rounded-l-full text-base leading-5 flex-1 text-white'
              >
                {numberWithCommas(get(cart, 'price', 0))}đ - Thêm vào giỏ hàng
              </label>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
