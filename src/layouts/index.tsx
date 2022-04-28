import {
  faHouseChimney,
  faMugSaucer,
  faNewspaper,
  faStore,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, isEmpty, isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useSWR from 'swr';
import { ModalPromotion } from '../components/promotion/ModalPromotion';
import { CampaignsItem, Promotion } from '../models/Promotion';
import { PromotionService } from '../services/PromotionService';
export const Layout = () => {
  const [coupon, setCoupon] = useState<CampaignsItem[]>([]);
  const [dataPromotion, setdataPromotion] = useState<Promotion[]>([]);

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
  return (
    <div>
      <header className='z-[9999] bg-gradient-to-r from-[#ffb141] to-[#fb8d17] items-center flex md:h-20 sticky top-0 shadow-md'>
        <div className='flex container lg:px-8 mx-auto items-center'>
          <Link to='/' className='mr-4 hidden lg:block'>
            <img
              src='https://order.thecoffeehouse.com/_nuxt/img/logo.174bdfd.svg'
              alt=''
              className='w-[170px] h-[14px]'
            />
          </Link>

          <label
            htmlFor='modalAddress'
            className='header-delivery-bg cursor-pointer flex w-64 h-14 p-2 rounded-r-full rounded-l-full ml-5 '
          >
            <img
              src='	https://minio.thecoffeehouse.com/images/tch-web-order/Delivery2.png'
              alt=''
              className='rounded-full h-10 w-10'
            />
            <div className='pl-2'>
              <h5 className='text-white font-semibold text-base leading-tight mb-0.5'>
                Giao hàng
              </h5>
              <p className='text-white text-sm leading-none line-clamp-1 text-ellipsis overflow-hidden webkit-box-nav'>
                Tại: Nhập địa chỉ giao hàng
              </p>
            </div>
            <button className='pl-2'>
              {' '}
              <svg
                className='text-orange-300 h-5 w-3.5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </label>

          <nav className='flex hidden lg:block'>
            <ul className='flex text-white text-sm font-semibold ml-11'>
              <li className='mr-5'>
                <Link
                  className='hover:border-b hover:border-b-white focus:border-b focus:border-b-white pb-1'
                  to='/product-listing'
                >
                  Đặt hàng
                </Link>
              </li>
              <li className='mr-5'>
                <Link
                  className='hover:border-b hover:border-b-white focus:border-b focus:border-b-white pb-1'
                  to='/blogs'
                >
                  Tin tức
                </Link>
              </li>
              <li className='mr-5'>
                <Link
                  className='hover:border-b hover:border-b-white focus:border-b focus:border-b-white pb-1'
                  to='/store'
                >
                  Cửa hàng
                </Link>
              </li>
              <li className='mr-5'>
                <label
                  className='hover:border-b hover:border-b-white focus:border-b focus:border-b-white cursor-pointer pb-1'
                  onClick={(e: any) => clickShowModalPromotion(e, coupon)}
                >
                  Khuyến mãi
                </label>
              </li>
              <li>
                <a
                  className='hover:border-b hover:border-b-white pb-1 focus:border-b focus:border-b-white'
                  href='#'
                >
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </nav>
          <div className='flex items-center ml-auto justify-end'>
            <Link to='#'>
              <img
                className='w-10 pb-2'
                src='https://order.thecoffeehouse.com/_nuxt/img/Login.70dc3d8.png'
                alt=''
              />
            </Link>
            <Link to='/checkout'>
              <img
                className='w-[72px]'
                src='https://order.thecoffeehouse.com/_nuxt/img/Carticon.373916c.png'
                alt=''
              />
            </Link>
          </div>
        </div>
      </header>

      <input type='checkbox' id='modalAddress' className='modal-toggle' />
      <label htmlFor='modalAddress' className='modal cursor-pointer'>
        <label
          className='modal-box relative w-full max-w-2xl h-full md:h-auto'
          htmlFor=''
        >
          {/* <div className='bg-white flex w-[165px] p-2 justify-center rounded-r-full rounded-l-full border border-dashed border-[#fb8d17] absolute -top-2/4 left-2/4 translate-y-[20px] -translate-x-1/2 '>
            <div className=' flex justify-center p-1.5 bg-gradient-to-r from-[#e87800] to-[#fa8c16] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] rounded-r-full rounded-l-full'>
              <img
                className='w-10'
                src='https://minio.thecoffeehouse.com/images/tch-web-order/Delivery2.png'
                alt=''
              />
              <p className='font-semibold text-base leading-[22px] text-white pl-2 flex justify-center items-center'>
                Giao hàng
              </p>
            </div>
          </div> */}
          <div className=' rounded-md bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.12)] items-center flex'>
            <input
              type='text'
              className='rounded-md py-1.5 px-3 w-full focus:outline-none font-[inherit] overflow-visible text-base outline-0 flex-1 border-0'
              placeholder='Vui lòng nhập địa chỉ'
              required
            />
            <div className='py-1.5 px-[22px] cursor-pointer'>
              <button className=' bg-[#e4e4e4] h-5 w-5 flex items-center justify-center rounded-r-full rounded-l-full'>
                <FontAwesomeIcon icon={faX} className='text-white h-3 ' />
              </button>
            </div>
          </div>
        </label>
      </label>

      <ModalPromotion coupon={coupon} dataPromotion={dataPromotion} />
      <Outlet />

      <div className='lg:hidden bg-white p-4 flex justify-around sticky bottom-0 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]'>
        <Link to='/' className='flex-col flex items-center'>
          <FontAwesomeIcon
            icon={faHouseChimney}
            className='text-[#000000] opacity-60 text-xl leading-4'
          />
          <p className='text-xs leading-[18px] font-semibold text-[#838387]'>
            Trang chủ
          </p>
        </Link>
        <Link to='/product-listing' className='flex-col flex items-center'>
          <FontAwesomeIcon
            icon={faMugSaucer}
            className='text-[#000000] opacity-60 text-xl leading-4'
          />
          <p className='text-xs leading-[18px] font-semibold text-[#838387]'>
            Đặt hàng
          </p>
        </Link>
        <Link to='/blogs' className='flex-col flex items-center'>
          <FontAwesomeIcon
            icon={faNewspaper}
            className='text-[#000000] opacity-60 text-xl leading-4'
          />
          <p className='text-xs leading-[18px] font-semibold text-[#838387]'>
            Tin tức
          </p>
        </Link>
        <Link to='/store' className='flex-col flex items-center'>
          <FontAwesomeIcon
            icon={faStore}
            className='text-[#000000] opacity-60 text-xl leading-4'
          />
          <p className='text-xs leading-[18px] font-semibold text-[#838387]'>
            Cửa hàng
          </p>
        </Link>
      </div>
      <footer className='  bg-[url("https://order.thecoffeehouse.com/_nuxt/img/footer-desktop.727f3a2.png")]'>
        <div className='mx-auto container px-8 py-10 flex'>
          <div className='flex-none w-[175px]'>
            <img
              src='	https://order.thecoffeehouse.com/_nuxt/img/logo-footer.72c86fc.png'
              alt=''
            />
          </div>
          <div className='flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              <div>
                <div tabIndex={0} className='collapse static'>
                  <input type='checkbox' className='peer ' />
                  <div className='flex items-center justify-center text-sm collapse-title font-semibold text-white hover:border-b hover:border-b-white focus:border-b focus:border-b-white '>
                    Thông tin website
                  </div>
                  <div className='collapse-content  text-primary-content  '>
                    <ul className='text-white text-sm list-disc  ml-11'>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/product-listing'>
                          Đặt hàng
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/blogs'>
                          Tin tức
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/store'>
                          Cửa hàng
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <label
                          className=' pb-1'
                          onClick={(e: any) =>
                            clickShowModalPromotion(e, coupon)
                          }
                        >
                          Khuyến mãi
                        </label>
                      </li>
                      <li>
                        <a href='#'>Tuyển dụng</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div tabIndex={0} className='collapse static'>
                  <input type='checkbox' className='peer' />
                  <div className='flex items-center justify-center text-sm collapse-title font-semibold text-white hover:border-b hover:border-b-white focus:border-b focus:border-b-white'>
                    Điều khoản sử dụng
                  </div>
                  <div className='collapse-content  text-primary-content  '>
                    <ul className='text-white text-sm list-disc  ml-11'>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Quy chế website
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Bảo mật thông tin
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div tabIndex={0} className='collapse static'>
                  <input type='checkbox' className='peer' />
                  <div className='flex items-center justify-center text-sm collapse-title font-semibold text-white hover:border-b hover:border-b-white focus:border-b focus:border-b-white'>
                    Hotline
                  </div>
                  <div className='collapse-content  text-primary-content  '>
                    <ul className='text-white text-sm list-disc  ml-11'>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Đặt hàng 1800 6936 (07:00-20:30)
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Hỗ trợ 028.71.087.088 (07:00-21:00)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div tabIndex={0} className='collapse static'>
                  <input type='checkbox' className='peer' />
                  <div className='flex items-center justify-center text-sm collapse-title font-semibold text-white hover:border-b hover:border-b-white focus:border-b focus:border-b-white'>
                    Liên hệ
                  </div>
                  <div className='collapse-content  text-primary-content  '>
                    <ul className='text-white text-sm list-disc  ml-11'>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Head Office 1: 86 - 88 Cao Thang, Ward 4, District 3,
                          Ho Chi Minh, Vietnam. Head Office 2: Floor 3 & 4 The
                          Hub Building - 195/10E Dien Bien Phu, Ward 15, Binh
                          Thanh District, Ho Chi Minh, Vietnam. +842871 078 079
                          hi@thecoffeehouse.vn
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          Head Office 2: Floor 3 & 4 The Hub Building - 195/10E
                          Dien Bien Phu, Ward 15, Binh Thanh District, Ho Chi
                          Minh, Vietnam.
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          +842871 078 079
                        </Link>
                      </li>
                      <li className='mr-5'>
                        <Link className=' pb-1' to='/'>
                          hi@thecoffeehouse.vn
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black py-2.5'>
          <div className='mx-auto container px-8 flex justify-between'>
            <p className='text-white text-sm leading-[22px] flex items-center'>
              Copyright © 2021 The Coffee House. All rights reserved.
            </p>
            <a href='http://online.gov.vn/Home/WebDetails/48042?AspxAutoDetectCookieSupport=1'>
              <img
                src='https://order.thecoffeehouse.com/_nuxt/img/active.4cba64f.png'
                alt=''
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
