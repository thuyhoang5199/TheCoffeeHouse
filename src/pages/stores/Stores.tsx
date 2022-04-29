import { faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filter, get, isEmpty, isNil, toLower, uniqBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { StoreList } from '../../components/stores/StoreList';
import { StoreMenu } from '../../components/stores/StoreMenu';

import { Store } from '../../models/stores/Store';
import { StoreServices } from '../../services/StoreService';

export const StorePage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState<Store[]>([]);
  const [menuStores, setMenuStores] = useState<string[]>([]);
  const { data, error } = useSWR('MENU_STORES', StoreServices.getMenu);
  useEffect(() => {
    if (isNil(data) || isEmpty(data)) {
      setStores([]);
    } else {
      setStores(data);
    }
  }, [data]);
  if (!isNil(stores)) {
    const nameCity = stores.map((i: Store) => i.pu_city);
    const menuStoresFilter = nameCity.reduce(function (acc: any, curr: any) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
    // console.log('lplplpl', menuStoresFilter);
    // setMenuStores(menuStoresFilter);
    // console.log('lplplpl', menuStores);
  }
  // const filterMenuStores = () => {
  //   if (!isNil(stores)) {
  //     const nameCity = stores.map((i: Store) => i.pu_city);
  //     const menuStores = nameCity.reduce(function (acc: any, curr: any) {
  //       return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  //     }, {});
  //     console.log('lplplpl', menuStores);
  //   }
  // };

  if (error) {
    console.log(error.message);
  }

  const searchStores = (e: any) => {
    const searchString = e.target.value.toLowerCase();
    const filteredStores = uniqBy(
      filter(stores, (item: Store) =>
        toLower(item.name).includes(searchString),
      ),
      (item: Store) => item.id,
    );
    setSearch(filteredStores);
  };

  return (
    <>
      <div className='flex pt-8 pb-4 items-center justify-center'>
        <FontAwesomeIcon
          icon={faStore}
          className='text-2xl mr-3 text-[#faa515]'
        />
        <p className='lg:text-3xl lg:leading-9 text-[#252627] leading-7 text-lg font-semibold'>
          Danh sách chuỗi cửa hàng
        </p>
      </div>
      <input
        type='text'
        onKeyUp={searchStores}
        className='bg-white  font-[inherit]  text-base  w-full p-8 m-4'
        placeholder='Nhập tên đường, quận huyện, tỉnh thành...'
        required
      />

      <StoreList menu={search} />
      <StoreList menu={stores} />
    </>
  );
};
