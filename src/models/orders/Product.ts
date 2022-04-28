export interface Product {
  map: any;
  base_price: number;
  base_price_str: string;
  description: string;
  description_html: string;
  hint_note: string[];
  id: string;
  images: string[];
  is_delivery: boolean;
  is_pickup: boolean;
  name: string;
  options: ProductOption[];
  price_str: string;
  thumbnail: string;
  slug: string;
}

export interface ProductOption {
  group_id: number;
  name: string;
  description: string;
  min: number;
  max: number;
  default_index: number;
  items: ProductOptionItem[];
}
export interface ProductOptionItem {
  code: string;
  id: string;
  is_main: boolean;
  name: string;
  price: number;
  price_str: string;
  product_id: string;
  val: string;
  product_name: string;
  localize: {
    en: string;
    vi: string;
  };
}
