export interface Campaign {
  id: number;
  name: string;
  bid: number;
  fund: number;
  city: City;
  product: Product;
  keyword: string;
  radius: number;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  campaignId: number | null;
}

export interface Status {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}