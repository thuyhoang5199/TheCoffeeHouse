import { get, isNil } from 'lodash';
import React from 'react';
import { MenuNew } from '../../models/news/MenuNew';

export const NewsMenu = ({
  menu,
  menuClickHandle,
  selectedMenu = 0,
}: {
  menu: MenuNew[] | undefined;
  menuClickHandle: Function;
  selectedMenu: Number;
}) => {
  return (
    <div className='mx-auto border md:justify-center md:w-6/12 rounded-r-full rounded-l-full flex justify-center flex-row overflow-auto py-2.5 px-[30px] items-center flex-nowrap cursor-pointer'>
      {!isNil(menu) ? (
        menu.map((menu: MenuNew, index: number) => (
          // <p className={'flex hover:text-[#0056b3] font-semibold text-[#26262680] mx-[15px] text-xs leading-[30px] shrink-0 uppercase shadow-[0px_2px_8px_rgba(0,0,0,0.12)] items-center h-8 px-2.5 bg-gradient-to-r from-[#e87800] to-[#fa8c16] rounded-r-full rounded-l-full ' + (((index == 0) || name == menu.name) ? '  text-white' : '')} key={index} onClick={() => menuClickHandle(index)}>{menu.name}</p>
          <button
            className={`flex hover:text-[#0056b3] font-semibold  mx-[15px] text-xs leading-[30px] shrink-0 uppercase  items-center h-8 px-2.5  rounded-r-full rounded-l-full ${
              selectedMenu == index
                ? 'bg-gradient-to-r from-[#e87800] to-[#fa8c16]  text-white'
                : ' text-[#26262680] '
            }`}
            key={index}
            onClick={() => menuClickHandle(index)}
          >
            {menu.name}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
