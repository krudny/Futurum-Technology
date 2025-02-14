import { Dispatch, SetStateAction } from "react";

export interface City {
  id: number;
  name: string;
}

export interface Campaign {
  id: number;
  name: string;
  bid: number;
  fund: number;
  city: City;
  product: Product;
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

export interface DialogContextType {
  productDialog: boolean;
  campaignDialog: boolean;
  editDialog: boolean;
  toggleProductDialog: () => void;
  toggleCampaignDialog: () => void;
  toggleEditDialog: () => void;
}

export interface ApplicationContextType {
  campaigns: Campaign[];
  products: Product[];
  statuses: string[];
  balance: number;
  cities: City[];
  fetchData: <T>(props: FetchDataProps<T>) => Promise<void>;
  refreshCampaigns: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshStatuses: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  deleteCampaign: (id: number) => Promise<void>;
}

export interface FetchDataProps<T> {
  url: string;
  setState: Dispatch<SetStateAction<T>>;
  error_feedback: string;
}

export interface FormData {
  name: string;
  bid: number;
  fund: number;
  status: string;
  radius: number;
  city: string;
  productId: number | string;
}

export interface Field {
  label: string;
  name: keyof FormData;
  type: string;
}
