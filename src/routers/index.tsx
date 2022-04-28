import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../layouts';
import { BlogsPage } from '../pages/blogs';
import { BlogDetailPage } from '../pages/blogs/BlogDetailPage';
import { CheckoutPage } from '../pages/checkout/Checkout';
import { HomePage } from '../pages/home/Home';
import { ProductListingPage } from '../pages/product';
import { ProductDetailPage } from '../pages/product/detail';
import { StorePage } from '../pages/stores/Stores';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='blogs' element={<BlogsPage />} />
          <Route path='store' element={<StorePage />} />
          <Route path=':slug' element={<ProductListingPage />} />
          <Route path='product/:slug' element={<ProductDetailPage />} />
          <Route path='blogs/:id' element={<BlogDetailPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
