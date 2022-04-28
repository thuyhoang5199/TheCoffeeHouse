import { Product } from "./Product";

export interface Menu {
  id: number;
  name: string;
  slug: string;
  style: number;
  thumbnail: string;
  title: string;
  products: Product[];
}