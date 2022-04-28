import React from 'react';
import { Link } from 'react-router-dom';
import { Posts } from '../../models/news/Posts';
export const NewsList = ({ posts }: { posts: any }) => {
  return (
    <div className='container px-4 mx-auto transition-opacity grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      {posts.map((newPosts: Posts) => (
        <div
          className='mt-[40px] mx-4 cursor-pointer rounded-lg bg-white  shadow-[0px_10px_20px_rgba(0,0,0,0.1)]'
          key={newPosts.id}
        >
          <img
            className='object-cover overflow-hidden shrink-0 rounded-t-lg '
            src={newPosts.thumbnail}
            alt=''
          />
          <div className='p-4'>
            <h4 className='text-base mt-0.5 mb-4 h-11 leading-6 overflow-hidden font-semibold webkit-box'>
              {newPosts.title}
            </h4>
            <div className=' justify-end items-center ml-auto flex'>
              <Link to={`/blogs/${newPosts.id}`}>
                <button className='text-xs hover:underline hover:decoration-[#007bff] leading-5 rounded-r-full py-2 px-[22px] text-white rounded-l-full bg-gradient-to-r from-[#e87800] to-[#fa8c16] '>
                  ĐỌC TIẾP
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
