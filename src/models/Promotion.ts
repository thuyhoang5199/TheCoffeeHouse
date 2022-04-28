export interface Promotion {
  title: string;
  campaigns: CampaignsItem[];
}
export interface CampaignsItem {
  allow_order: boolean;
  brand: string;
  coupon_count: boolean;
  coupons: CouponsItem[];
  description: string;
  discount_rate: number;
  end_time: number;
  id: string;
  image: string;
  show_all_coupons: boolean;
  time_left: string;
  title: string;
}
export interface CouponsItem {
  barcode: string;
  effective_from: boolean;
  effective_to: boolean;
  end_time: number;
  image: string;
  quantity: boolean;
}
