import { get, isEmpty, isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NewsMenu } from '../../components/news/NewsMenu';
import { NewsList } from '../../components/news/NewsList';
import { NewServices } from '../../services/NewService';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuNew } from '../../models/news/MenuNew';

export const BlogsPage = () => {
  const [posts, setPosts] = useState<MenuNew[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Number>(0);
  const { data, error } = useSWR('MENU_NEWS', NewServices.getMenu);
  const menuClickHandle = (index: Number) => {
    setPosts(get(data, `[${index}].posts`, []));
    setSelectedMenu(index);
    console.log(index);
  };

  useEffect(() => {
    // console.log(reduce(data, function (sumItems: Posts[], item: MenuNew) { return sumItems.concat(item.posts) }, []));
    if (isNil(data) || isEmpty(data)) {
      setPosts([]);
    } else {
      setPosts(get(data, '[0].posts', []));
    }
  }, [data]);
  if (error) {
    console.log(error.message);
  }

  return (
    <section className='bg-white mx-auto md:pt-[50px] md:pb-[26px]'>
      {/* <p>{selectedMenu.toString()}</p> */}
      <div className='flex justify-center items-center pt-2.5 md:mb-[30px] mb-4'>
        <FontAwesomeIcon
          icon={faNewspaper}
          className='font-black text-[#faa515] mr-3 md:text-[22px] not-italic'
        />
        <p className='font-semibold text-3xl'>Tin tức mới nhất</p>
      </div>
      <NewsMenu
        menu={data}
        selectedMenu={selectedMenu}
        menuClickHandle={menuClickHandle}
      />
      <NewsList posts={posts} />
    </section>
  );
};
