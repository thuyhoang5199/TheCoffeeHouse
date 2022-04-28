import { filter, get, isEmpty, isNil, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { ProductDetail } from '../../components/product/ProductDetail';
import { Product, ProductOption } from '../../models/orders/Product';
import { ProductExtraCart } from '../../models/orders/ProductCart';
import { addToCardState, addToCart } from '../../recoils/AddToCardState';
import { CartState } from '../../recoils/cartState';
// import { CartState } from '../../recoils/cartState';

import { OrderServices } from '../../services/OrderService';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [productsDetail, setProductsDetail] = useState<Product | null>();
  const [carts, setCarts] = useRecoilState(addToCardState);

  const [cart, setCart] = useRecoilState(CartState);
  const fetch = () => OrderServices.getProductDetail(slug as string);
  const { data, error } = useSWR(`PRODUCT_${slug}`, fetch);
  useEffect(() => {
    if (error) {
      alert('error');
    }
    setProductsDetail(data);
    if (!isNil(data))
      setCart({
        name: data.name,
        id: data.id,
        quantity: 1,
        price: data.base_price,
        extras: [],
      });
  }, [error, data]);

  const minusCartQuantity = () => {
    // if (cart.quantity > 1) {
    //   setCart({ ...cart, quantity: cart.quantity - 1 });
    // }

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
    // setCart({ ...cart, quantity: cart.quantity + 1 });
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
      // console.log(newExtras, newPrice);
    }
  };
  // useEffect(() => {
  //   // console.log(reduce(data, function (sumItems: Posts[], item: Menu) { return sumItems.concat(item.posts) }, []));
  //   if (isNil(data) || isEmpty(data)) {
  //     setProductsDetail({});
  //   }
  //   else {
  //     setProductsDetail(get(data, []));
  //   }
  // }, [data]);
  // if (error)
  //   console.log(error.message);
  // }
  const handleAddToCart = () => {
    const newCarts = addToCart(carts, cart);
    setCarts(newCarts);
  };
  if (!data && !error) {
    return <p>loading....</p>;
  }
  return (
    <>
      <ProductDetail
        product={productsDetail}
        cart={cart}
        minusCart={minusCartQuantity}
        plusCart={plusCartQuantity}
        plusCartDetailQuantity={plusCartDetailQuantity}
        minusCartDetailQuantity={minusCartDetailQuantity}
        changeCartDetailExtra={changeCartDetailExtra}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
};
