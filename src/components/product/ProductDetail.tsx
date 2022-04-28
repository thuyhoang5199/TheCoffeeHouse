import {
  faMinus,
  faPlus,
  faSquarePollHorizontal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, isNil } from 'lodash';
import React from 'react';
import {
  Product,
  ProductOption,
  ProductOptionItem,
} from '../../models/orders/Product';
import { ProductCart, ProductExtraCart } from '../../models/orders/ProductCart';
// import { ProductCart, ProductExtraCart } from '../../recoils/cartState';
import { numberWithCommas } from '../../utils/common';
export const ProductDetail = ({
  product,
  cart,
  minusCart,
  plusCart,
  plusCartDetailQuantity,
  minusCartDetailQuantity,
  changeCartDetailExtra,
  handleAddToCart,
}: {
  product: Product | undefined | null;
  cart: ProductCart;
  minusCart: Function;
  plusCart: Function;
  plusCartDetailQuantity: Function;
  minusCartDetailQuantity: Function;
  changeCartDetailExtra: Function;
  handleAddToCart: Function;
}) => {
  console.log(JSON.stringify(cart));
  return !isNil(product) ? (
    <div>
      <div className='mx-auto md:max-w-[900px] grid grid-cols-2 p-5 shadow-[0px_10px_20px_rgba(0,0,0,0.1)] rounded-lg md:my-20'>
        <div>
          <div className='carousel'>
            {product.images.map((image: string, index: number) => (
              <div
                id={`product_image_${index}`}
                className='w-full carousel-item'
                key={index}
              >
                <img src={image} alt='' className='rounded-lg  ' />
              </div>
            ))}
          </div>
          <div className='flex justify-center mb-4'>
            {product.images.map((image: string, index: number) => (
              <a
                href={`#product_image_${index}`}
                className='cursor-pointer w-20 m-2 focus:opacity-50'
                key={index}
              >
                <img className='rounded-lg' src={image} />
              </a>
            ))}
          </div>
          <p className='leading-[22px] text-base text-[#666] font-normal'>
            {product.description}
          </p>
        </div>
        <div className='pl-8 w-full '>
          <p className='md:text-3xl md:leading-8 leading-6 text-lg w-full font-semibold ml-0'>
            {product.name}
          </p>
          <div className='flex justify-between mt-5 '>
            <p>{product.price_str}</p>
            <div className='flex '>
              <button
                onClick={() => minusCart()}
                className={`rounded-full  w-[32px] h-[32px] flex items-center justify-center ${
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
          <div className='border-solid bg-[#f5f5f5] border border-[#ededee] rounded flex h-11 mt-9'>
            <FontAwesomeIcon
              className='text-[#e4e4e4] h-5 w-[18px] my-3 mx-[11px]'
              icon={faSquarePollHorizontal}
            />
            <input
              type='text'
              className='bg-white text-[#f5f5f5] px-4 focus:outline-none font-[inherit] overflow-visible font-normal outline-0 flex-1 border-0'
              placeholder='Ghi chú thêm cho món này'
              required
            />
          </div>
          <div className='mt-4 border-[#ededed] border rounded-2xl px-[15px] '>
            {product.options.map((option: ProductOption) => (
              <div key={option.group_id}>
                <p className='bg-[#e4e4e4] py-2 px-[22px] font-semibold text-xs leading-6 text-[#666] uppercase mx-[-16px]'>
                  CHỌN {option.name}{' '}
                  {option.min > 0 ? '(BẮT BUỘC)' : '(TÙY CHỌN)'}
                </p>
                <div className='flex justify-between'>
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
                <div>
                  {option.min == 0 && option.max == 2 ? (
                    option.items.map(
                      (item: ProductOptionItem, index: number) => (
                        <div
                          className='py-[15px] h-[70px]  border-t first:border-t-0 flex justify-between items-center'
                          key={item.id}
                        >
                          <div className='items-center'>
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
                                className=' text-[#e4e4e4] text-base font-black antialiased inline-block not-italic'
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
          </div>
          <button
            onClick={() => handleAddToCart()}
            className='w-full h-12 text-white mt-3 bg-gradient-to-r from-[#e87800] to-[#fa8c16] shadow-[0px_2px_8px_rgba(0,0,0,0.12)] rounded-r-full rounded-l-full text-base leading-5 flex-1 text-white'
          >
            {numberWithCommas(get(cart, 'price', 0))}đ - Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div className='md:max-w-[900px] mx-auto'>
        <p className='bg-[#e4e4e4] py-2 px-[22px] items-center w-full md:max-w-[900px] font-semibold text-xs leading-6 text-[#666] uppercase'>
          {get(product, 'description_html', '') != ''
            ? 'THÔNG TIN SẢN PHẨM'
            : ''}
        </p>
        <div
          className='m-4 py-[12px] px-[15px]'
          dangerouslySetInnerHTML={{ __html: product.description_html }}
        ></div>
      </div>
    </div>
  ) : (
    <></>
  );
};
