import { Product, ProductOption } from '../../models/orders/Product';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useParams } from 'react-router-dom';
import { addToCardState, addToCart } from '../../recoils/AddToCardState';
import { OrderServices } from '../../services/OrderService';
import useSWR from 'swr';
import { filter, get, isEmpty, isNil, reduce, sumBy } from 'lodash';
import { Menu } from '../../models/orders/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faHourglass1,
  faMinus,
  faNewspaper,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { ProductMenu } from '../../components/product/ProductMenu';
import { ProductList } from '../../components/product/ProductList';
import { ProductExtraCart } from '../../models/orders/ProductCart';
import { HttpService } from '../../services/HttpService';
import { ModalProductDetail } from '../../components/product/ModalProductDetail';
import { NewServices } from '../../services/NewService';
import { MenuNew } from '../../models/news/MenuNew';
import { Posts } from '../../models/news/Posts';
import { NewsList } from '../../components/news/NewsList';
import { CartState } from '../../recoils/cartState';
import { MediaBoxService } from '../../services/MediaBoxService';
import { MediaBox } from '../../models/mediaBox/MediaBox';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDetail, setProductsDetail] = useState<Product | null>();
  const [cart, setCart] = useRecoilState(CartState);
  const { slug } = useParams();
  const [carts, setCarts] = useRecoilState(addToCardState);
  const [posts, setPosts] = useState<MenuNew[]>([]);
  const [mediaBox, setMediaBox] = useState<MediaBox[]>([]);
  const { data: dataMediaBox, error: errMediaBox } = useSWR(
    'MEDIA_BOX',
    MediaBoxService.getMenu,
  );
  const { data, error } = useSWR('MENU_PRODUCT', OrderServices.getMenu);

  const { data: news, error: newError } = useSWR(
    'MENU_NEWS',
    NewServices.getMenu,
  );
  useEffect(() => {
    if (isNil(dataMediaBox) || isEmpty(dataMediaBox)) {
      setMediaBox([]);
    } else {
      // dataMediaBox.map((item:MediaBox)=> {if(item.deeplink !== null){}})
      setMediaBox(dataMediaBox);
    }
  }, [dataMediaBox]);
  useEffect(() => {
    if (isNil(news) || isEmpty(news)) {
      setPosts([]);
    } else {
      setPosts(get(news, '[0].posts', []));
    }
  }, [news]);

  useEffect(() => {
    if (isNil(data) || isEmpty(data)) {
      setProducts([]);
    } else {
      let menuSelected: Menu;
      // if (slug === 'product-listing') {
      //   menuSelected = data[0];
      // } else {
      //   menuSelected = data.find((item: Menu) => item.slug == slug) as Menu;
      // }
      // setProducts(get(menuSelected, 'products', []));
      setProducts(get(data, 'products', []));
    }
  }, [data, slug]);
  if (error) {
    console.log(error.message);
  }
  const clickShowModal = (e: any, slug?: string) => {
    e.preventDefault();
    if (!isNil(slug)) {
      HttpService.tch
        .post('menu/product-detail', { slug: slug })
        .then(({ data }) => {
          const product = data.product as Product;
          setProductsDetail(product);
          setCart({
            name: product.name,
            id: product.id,
            quantity: 1,
            price: product.base_price,
            extras: [],
          });

          // console.log(data);
        });
      if (!data && !error) return <p>loading...</p>;
      const inputModalProductDetail = document.getElementById(
        'modalProductDetail',
      ) as HTMLInputElement;
      if (!isNil(inputModalProductDetail)) {
        inputModalProductDetail.click();
      }
    } else {
      setProductsDetail(null);
    }
  };
  const minusCartQuantity = () => {
    if (cart.quantity > 1) {
      if (isNil(productsDetail)) return;
      setCart({
        ...cart,
        quantity: cart.quantity - 1,
        price: cart.price - productsDetail.base_price,
      });
    }
  };
  const plusCartQuantity = () => {
    if (isNil(productsDetail)) return;
    setCart({
      ...cart,
      quantity: cart.quantity + 1,
      price: cart.price + productsDetail.base_price,
    });
  };
  const minusCartDetailQuantity = (id: string, group_id: number) => {
    if (!isNil(productsDetail)) {
      const optionSelected = productsDetail.options.find(
        (option: ProductOption) => option.group_id == group_id,
      );
      if (isNil(optionSelected)) return;
      const itemSelected = optionSelected.items.find((item) => item.id == id);
      if (isNil(itemSelected)) return;
      const indexCartExtraSelected = cart.extras.findIndex(
        (extra: ProductExtraCart) => extra.id == id,
      );
      if (indexCartExtraSelected == -1) {
        return;
      }
      if (cart.extras[indexCartExtraSelected].quantity > 0) {
        setCart({
          ...cart,
          extras: cart.extras
            .map((item: ProductExtraCart, index: number) => {
              if (index == indexCartExtraSelected)
                return { ...item, quantity: item.quantity - 1 };
              else return item;
            })
            .filter(
              (extraCartSelectedMinus: ProductExtraCart) =>
                extraCartSelectedMinus.quantity != 0,
            ),
          price: cart.price - itemSelected.price,
        });
      }
    }
  };

  const plusCartDetailQuantity = (id: string, group_id: number) => {
    if (!isNil(productsDetail)) {
      const optionSelected = productsDetail.options.find(
        (option: ProductOption) => option.group_id == group_id,
      );
      if (isNil(optionSelected)) return;
      const { max } = optionSelected;
      const itemSelected = optionSelected.items.find((item) => item.id == id);
      if (isNil(itemSelected)) return;
      const indexCartExtraSelected = cart.extras.findIndex(
        (extra: ProductExtraCart) => extra.id == id,
      );
      const totalExtraQuantity = sumBy(
        filter(
          cart.extras,
          (extra: ProductExtraCart) => extra.group_id == group_id,
        ),
        (extra: ProductExtraCart) => extra.quantity,
      );

      if (totalExtraQuantity < max) {
        if (indexCartExtraSelected < 0) {
          const newExtraItem = {
            code: itemSelected.code,
            group_id: group_id,
            id: itemSelected.id,
            name: itemSelected.name,
            price: itemSelected.price,
            price_str: itemSelected.price_str,
            quantity: 1,
          };
          setCart({
            ...cart,
            extras: [...cart.extras, newExtraItem],
            price: cart.price + itemSelected.price,
          });
        } else {
          setCart({
            ...cart,
            extras: [
              ...cart.extras.map((item: ProductExtraCart, index: number) => {
                if (index == indexCartExtraSelected)
                  return { ...item, quantity: item.quantity + 1 };
                else return item;
              }),
            ],
            price: cart.price + itemSelected.price,
          });
        }
      }
    }
  };
  const changeCartDetailExtra = (id: string, group_id: number) => {
    let newPrice = cart.price;
    const oldExtra = cart.extras.filter((i) => i.group_id == group_id);
    newPrice -= sumBy(oldExtra, (extra: ProductExtraCart) => extra.price);
    const newExtras = cart.extras.filter((i) => i.group_id != group_id);
    if (!isNil(productsDetail)) {
      const optionSelected = productsDetail.options.find(
        (option: ProductOption) => option.group_id == group_id,
      );
      if (isNil(optionSelected)) return;
      const itemSelected = optionSelected.items.find((item) => item.id == id);
      if (isNil(itemSelected)) return;
      newExtras.push({
        code: itemSelected.code,
        group_id: group_id,
        id: itemSelected.id,
        name: itemSelected.name,
        price: itemSelected.price,
        price_str: itemSelected.price_str,
        quantity: 1,
      });
      newPrice += itemSelected.price;
      setCart({
        ...cart,
        extras: newExtras,
        price: newPrice,
      });
    }
  };
  const handleAddToCart = () => {
    const newCarts = addToCart(carts, cart);
    setCarts(newCarts);
  };
  const arrProduct = reduce(
    data,
    function (searchProduct: Product[], item: Menu) {
      return searchProduct.concat(item.products);
    },
    [],
  );
  const displayProduct = arrProduct.slice(0, 12);

  const arrNew = reduce(
    news,
    function (sumItems: Posts[], item: MenuNew) {
      return sumItems.concat(item.posts);
    },
    [],
  );

  const displayNews = arrNew.slice(0, 8);

  return (
    <div>
      <section className='bg-gradient-to-r from-[#ffb141] to-[#fb8d17] py-5 px-4  '>
        <div className='carousel w-full mx-auto md:max-w-[960px] lg:max-w-[1020px] xl:max-w-[1230px] '>
          {!isNil(mediaBox) ? (
            mediaBox.map((item: MediaBox, index: number) => (
              <div key={index}>
                <div
                  id={index.toString()}
                  className='carousel-item relative w-full'
                >
                  <img
                    src={item.icon_web}
                    className='w-full max-h-[480px] object-cover'
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className='flex justify-center w-full py-2 gap-2'>
          {!isNil(mediaBox) ? (
            mediaBox.map((item: MediaBox, index: number) => (
              <div key={index}>
                <a href={`#${index}`} className='p-4'>
                  <FontAwesomeIcon
                    className=' hover:text-blue text-[#e4e4e4] text-base font-black antialiased inline-block not-italic'
                    icon={faMinus}
                  />
                </a>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </section>

      <div className='pb-10 pt-4'>
        <div className='md:justify-center justify-between pt-2.5 flex w-full items-center lg:mb-8 mb-4'>
          <FontAwesomeIcon
            className='text-2xl mr-3 text-[#faa515]'
            icon={faTrophy}
          />
          <p className='lg:text-3xl lg:leading-9 text-[#252627] leading-7 text-lg font-semibold'>
            Sản phẩm từ Nhà
          </p>
        </div>
        <ProductMenu menu={data} slug={slug} />
        <ProductList
          products={displayProduct}
          clickShowModal={clickShowModal}
        />
        <Link to='/product-listing' className='flex justify-center'>
          <div className='flex mt-8 items-center '>
            <p className=' text-[#FA8C16] font-semibold'>Xem tất cả</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className='font-semibold text-[#FA8C16] ml-3 '
            />
          </div>
        </Link>
      </div>

      <ModalProductDetail
        product={productsDetail}
        cart={cart}
        minusCart={minusCartQuantity}
        plusCart={plusCartQuantity}
        plusCartDetailQuantity={plusCartDetailQuantity}
        minusCartDetailQuantity={minusCartDetailQuantity}
        changeCartDetailExtra={changeCartDetailExtra}
        handleAddToCart={handleAddToCart}
      />

      <div className='flex justify-center items-center mt-2.5 '>
        <FontAwesomeIcon
          icon={faNewspaper}
          className='font-black text-[#faa515] mr-3 md:text-[22px] not-italic'
        />
        <p className='font-semibold text-3xl'>Tin tức</p>
      </div>
      <NewsList posts={displayNews} />
      <Link to='/blogs' className='flex justify-center pb-7'>
        <div className='flex mt-8 items-center'>
          <p className=' text-[#FA8C16] font-semibold'>Xem tất cả</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className='font-semibold text-[#FA8C16] ml-3 '
          />
        </div>
      </Link>
      <section className='bg-gradient-to-r from-[#fa8c16] to-[#874d00]  '>
        <div className='absolute'>
          <img
            src='https://order.thecoffeehouse.com/_nuxt/img/cf-bg.2a2088b.svg'
            alt=''
          />
        </div>
        <div className='grid grid grid-cols-1 md:grid-cols-2 container mx-auto justify-between items-center px-8 md:py-[50px]'>
          <div className='flex-1 px-4'>
            <div className='flex'>
              <img
                className='w-[100px] flex-none '
                src='https://order.thecoffeehouse.com/_nuxt/img/squarelogo.035676b.png'
                alt=''
              />
              <div className='flex-1 pl-4'>
                <p className='text-white text-xl leading-[140%] font-semibold'>
                  Đặt qua app THE COFFEE HOUSE để tích điểm{' '}
                  <br className='sm:block hidden md:hidden' /> và hưởng quyền
                  lợi thành viên.
                </p>
              </div>
            </div>
            <div className='flex justify-center'>
              <img
                className='w-[100px]'
                src='https://order.thecoffeehouse.com/_nuxt/img/app-store-2.a04cf2b.png'
                alt=''
              />
              <img
                className='w-[100px]'
                src='	https://order.thecoffeehouse.com/_nuxt/img/google-play-2.9945b62.png'
                alt=''
              />
            </div>
          </div>
          <div className='md:flex-[0_0_58%] flex-[0_0_100%] py-[5%] flex-none'>
            <img
              className='md:object-contain object-cover'
              src='https://order.thecoffeehouse.com/_nuxt/img/newappv6.f2e1281.png'
              alt=''
            />
          </div>
        </div>
      </section>
    </div>
  );
};
