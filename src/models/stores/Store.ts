export interface Store {
  full_address: string;
  id: number;
  images: string[];
  location: {
    lat: number;
    long: number;
  };
  name: string;
  open_time: string;
  phone: string;
  pu_city: string;
}
