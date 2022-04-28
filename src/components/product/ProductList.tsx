import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNil } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../models/orders/Product';
export const ProductList = ({
  products,
  isModal = false,
  clickShowModal,
}: {
  products: Product[];
  isModal?: boolean;
  clickShowModal: Function;
}) => {
  return (
    <div
      className={`container px-4 mx-auto transition-opacity grid grid-cols-1 sm:grid-cols-2${
        !isModal ? ' md:grid-cols-4 xl:grid-cols-6' : ''
      }`}
    >
      {!isNil(products) ? (
        products.map((product: Product) => (
          <Link to={`/product/${product.slug}`} key={product.id}>
            <div
              className={`flex flex-row lg:mt-3 mt-2 mx-4 p-2 cursor-pointer rounded-lg bg-white  shadow-[0px_10px_20px_rgba(0,0,0,0.1)] ${
                !isModal ? '  md:flex-col' : ''
              }`}
            >
              <img
                className={`object-cover overflow-hidden shrink-0 rounded-lg w-[100px] ${
                  !isModal ? ' md:w-full' : ''
                }`}
                src={product.thumbnail}
                alt=''
              />
              <div className='p-2'>
                <h4 className='text-base mt-0.5 mb-1 h-11 leading-6 overflow-hidden font-semibold webkit-box'>
                  {product.name}
                </h4>
                <div className='text-sm leading-[18px] mt-auto items-center justify-between flex'>
                  <p
                    className='mb-0 text-sm '
                    dangerouslySetInnerHTML={{ __html: product.price_str }}
                  ></p>
                  <button
                    className=' rounded-full bg-[#fa8c16] w-[32px] h-[32px] flex items-center justify-center'
                    onClick={(e: any) => clickShowModal(e, product.slug)}
                  >
                    <FontAwesomeIcon className=' text-white' icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
