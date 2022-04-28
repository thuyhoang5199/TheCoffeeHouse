export interface ProductCart {
  name: string;
  id: string;
  quantity: number;
  price: number;
  extras: ProductExtraCart[];
}

export interface ProductExtraCart {
  id: string;
  code: string;
  name: string;
  price: number;
  price_str: string;
  quantity: number;
  group_id: number;
}
