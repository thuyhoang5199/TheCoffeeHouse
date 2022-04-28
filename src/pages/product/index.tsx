import {
  filter,
  get,
  isEmpty,
  isNil,
  map,
  reduce,
  sum,
  sumBy,
  uniqBy,
} from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductList } from '../../components/product/ProductList';
import { ProductMenu } from '../../components/product/ProductMenu';
import { Menu } from '../../models/orders/Menu';
import { OrderServices } from '../../services/OrderService';
import { Product, ProductOption } from '../../models/orders/Product';
import { ModalProductDetail } from '../../components/product/ModalProductDetail';
import { HttpService } from '../../services/HttpService';
import { useRecoilState } from 'recoil';
// import { CartState } from '../../recoils/cartState';
import { ProductCart, ProductExtraCart } from '../../models/orders/ProductCart';
import { addToCardState, addToCart } from '../../recoils/AddToCardState';
import { CartState } from '../../recoils/cartState';
export const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsDetail, setProductsDetail] = useState<Product | null>();
  const [cart, setCart] = useRecoilState(CartState);
  const [filtering, setFiltering] = useState<Product[]>([]);
  const { slug } = useParams();
  const [carts, setCarts] = useRecoilState(addToCardState);

  const { data, error } = useSWR('MENU_PRODUCT', OrderServices.getMenu);
  useEffect(() => {
    if (isNil(data) || isEmpty(data)) {
      setProducts([]);
    } else {
      let menuSelected: Menu;
      if (slug === 'product-listing') {
        menuSelected = data[0];
      } else {
        menuSelected = data.find((item: Menu) => item.slug == slug) as Menu;
      }
      setProducts(get(menuSelected, 'products', []));
    }
  }, [data, slug]);
  if (error) {
    console.log(error.message);
  }

  const searchProducts = (e: any) => {
    const arrProduct = reduce(
      data,
      function (searchProduct: Product[], item: Menu) {
        return searchProduct.concat(item.products);
      },
      [],
    );
    // console.log("ahahah", arrProduct);
    // console.log(arrProduct.includes());
    const searchString = e.target.value.toLowerCase();
    // console.log(searchString);
    const filteredProducts = uniqBy(
      arrProduct.filter((item: Product) =>
        item.name.toLowerCase().includes(searchString),
      ),
      (item: Product) => item.id,
    );
    setFiltering(filteredProducts);
    // console.log(filteredProducts);
  };
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
    // console.log('hihi');
    // console.log(productsDetail);
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
      // console.log(newExtras, newPrice);
    }
  };
  const handleAddToCart = () => {
    const newCarts = addToCart(carts, cart);
    setCarts(newCarts);
  };
  return (
    <div className='md:pt-[50px]'>
      <div className='md:justify-center justify-between pt-2.5 flex w-full items-center lg:mb-8 mb-4'>
        <FontAwesomeIcon
          className='text-2xl mr-3 text-[#faa515]'
          icon={faTrophy}
        />
        <p className='lg:text-3xl lg:leading-9 text-[#252627] leading-7 text-lg font-semibold'>
          Sản phẩm từ Nhà
        </p>
        {/* <button type="button" className='rounded-lg text-[#838387] bg-[#e3e3e3] w-8 h-8 justify-center flex items-center ml-8'>
          <FontAwesomeIcon icon={faSearch} /></button> */}
        <label
          htmlFor='modalSearchProduct'
          className='rounded-lg cursor-pointer text-[#838387] bg-[#e3e3e3] w-8 h-8 justify-center flex items-center ml-8'
        >
          <FontAwesomeIcon icon={faSearch} />
        </label>
      </div>
      <ProductMenu menu={data} slug={slug} />
      <ProductList products={products} clickShowModal={clickShowModal} />

      <input
        type='checkbox'
        id='modalSearchProduct'
        className='modal-toggle '
      />
      <label htmlFor='modalSearchProduct' className='modal cursor-pointer  '>
        <label
          className='modal-box relative p-0 w-full max-w-2xl h-full md:h-auto'
          htmlFor=''
        >
          <div className='p-4 flex items-center border-b  '>
            <label
              htmlFor='modalSearchProduct'
              className='cursor-pointer p-2 text-2xl text-gray-400'
            >
              ✕
            </label>
            <h5 className='text-base leading-6 text-[#262626] mx-auto font-semibold'>
              Tìm kiếm
            </h5>
          </div>
          <div className='p-6 space-y-6'>
            <div className='border-solid bg-[#fafafa] border border-[#ededee] rounded flex h-11 mt-5'>
              <FontAwesomeIcon
                className='text-[#e4e4e4] h-5 w-[18px] font-black my-3 mx-[11px]'
                icon={faSearch}
              />
              <input
                type='text'
                onKeyUp={searchProducts}
                className='bg-[#fafafa] focus:outline-none font-[inherit] overflow-visible text-base outline-0 flex-1 border-0'
                placeholder='Tìm theo tên sản phẩm bạn quan tâm'
                required
              />
            </div>
            <ProductList
              products={filtering}
              isModal={true}
              clickShowModal={clickShowModal}
            />
          </div>
        </label>
      </label>

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
    </div>
  );
};
