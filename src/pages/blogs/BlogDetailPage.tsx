import {
  faArrowLeft,
  faArrowRight,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, isEmpty, isNil, reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { NewsList } from '../../components/news/NewsList';
import { MenuNew } from '../../models/news/MenuNew';
import { Posts } from '../../models/news/Posts';
import { NewServices } from '../../services/NewService';
export const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState<Posts | undefined>(undefined);
  const { data, error } = useSWR('MENU_NEWS', NewServices.getMenu);
  const [posts, setPosts] = useState<MenuNew[]>([]);
  useEffect(() => {
    // console.log(reduce(data, function (sumItems: Posts[], item: Menu) { return sumItems.concat(item.posts) }, []));
    if (isNil(data) || isEmpty(data)) {
      setBlogDetail(undefined);
      setPosts([]);
    } else {
      const arrNews = reduce(
        data,
        function (searchProduct: Posts[], item: MenuNew) {
          return searchProduct.concat(item.posts);
        },
        [],
      );
      const postDetail = arrNews.find((item: Posts) => item.id == id);
      console.log(postDetail);
      setBlogDetail(postDetail);
      setPosts(get(data, '[0].posts', []));
    }
  }, [data]);

  if (error) {
    console.log(error.message);
  }
  const arrNew = reduce(
    data,
    function (sumItems: Posts[], item: MenuNew) {
      return sumItems.concat(item.posts);
    },
    [],
  );

  const displayNews = arrNew.slice(0, 4);
  return (
    <div>
      {!isNil(blogDetail) ? (
        // <div className='md:mt-[50px] md:mb-[26px]'>
        <div className='bg-white p-[50px] mx-auto md:mt-[50px] md:mb-[26px] shadow-[0px_10px_20px_rgba(0,0,0,0.1)] rounded-lg md:mx-w-[900px] lg:w-[1020px]'>
          <h1 className='mb-[30px] text-[32px] font-medium leading-6'>
            {blogDetail.title}
          </h1>
          <div
            className=''
            dangerouslySetInnerHTML={{ __html: blogDetail.html }}
          ></div>
        </div>
      ) : (
        // </div>
        <></>
      )}
      <div className='flex justify-center items-center pt-[50px] '>
        <FontAwesomeIcon
          icon={faNewspaper}
          className='font-black text-[#faa515] mr-3 md:text-[22px] not-italic'
        />
        <p className='font-semibold text-3xl'>Tin Tức Liên Quan</p>
      </div>
      <NewsList posts={displayNews} />
      <Link to='/blogs' className='flex justify-center'>
        <div className='flex mt-8 items-center'>
          <p className=' text-[#FA8C16] font-semibold'>Xem tất cả tin tức</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className='font-semibold text-[#FA8C16] ml-3 '
          />
        </div>
      </Link>
    </div>
  );
};
