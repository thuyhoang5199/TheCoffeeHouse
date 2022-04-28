import React from 'react';
import { Menu } from '../../models/orders/Menu';
import { Link } from 'react-router-dom';
import { isNil } from 'lodash';

export const ProductMenu = ({
  menu,
  slug,
}: {
  menu: Menu[] | undefined;
  slug: string | undefined;
}) => {
  return (
    <ul className='flex mx-auto justify-center overflow-x-auto mb-3.5 mt-5 '>
      {!isNil(menu) ? (
        menu.map((menu: Menu, index: number) => (
          <li className='mb-2 transition-all' key={menu.id}>
            <Link to={`/${menu.slug}`} className='block py-2 px-4'>
              <div
                className={
                  'flex rounded-full w-[86px] h-[86px] bg-[#fff7e6] transition-all overflow-hidden items-center justify-center ' +
                  ((slug == 'product-listing' && index == 0) ||
                  slug == menu.slug
                    ? 'bg-[#ffe7ba]'
                    : '')
                }
              >
                <img className='h-3/4' src={menu.thumbnail} alt='' />
              </div>
              <h5
                className={
                  'mt-1.5 text-center text-xs w-[86px] mb-0 text-[#B2B2B2] font-semibold ' +
                  ((slug == 'product-listing' && index == 0) ||
                  slug == menu.slug
                    ? 'text-[#fa8c16]'
                    : '')
                }
              >
                {menu.name}
              </h5>
            </Link>
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
};
