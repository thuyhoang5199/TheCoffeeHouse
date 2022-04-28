import { Http2ServerRequest } from 'http2';
import { divide, isNil } from 'lodash';
import React from 'react';
import { Store } from '../../models/stores/Store';

export const StoreList = ({ menu }: { menu: Store[] | undefined }) => {
  return (
    <div className='container px-8 mx-auto transition-opacity grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-6'>
      {!isNil(menu) ? (
        menu.map((menu: Store, index: number) => (
          <div
            key={index}
            className='pl-6 items-center flex p-2 rounded-lg bg-white  shadow-[0px_10px_20px_rgba(0,0,0,0.1)]'
          >
            <img
              className='rounded-lg h-[100px] w-[100px]'
              src={menu.images.slice(-1)[0]}
              alt=''
            />
            <div className='flex-1 ml-4 leading-[22px]'>
              <p className='text-[#838387] font-bold text-xs uppercase'>
                THE COFFEE HOUSE
              </p>
              <p className='leading-[22px] py-[3px]'>{menu.full_address}</p>
              <p className='text-[#2626264d] text-sm pb-[3px]'>
                Cách đây 0.5km
              </p>
              <div className='flex text-[#fa8c16]'>
                <p className={`after:content-['|'] after:px-4`}>Xem bản đồ</p>
                <p>Chi tiết cửa hàng</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
