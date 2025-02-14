import {Dispatch, SetStateAction} from "react";

export interface Campaign {
  id: number;
  name: string;
  bid: number;
  fund: number;
  product: Product;
  radius: number;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  campaignId: number | null;
}

export interface ApplicationContextType {
  campaigns: Campaign[];
  products: Product[];
  statuses: string[];
  balance: number;
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
  bid: string;
  fund: string;
  status: string;
  radius: string;
  productID: string;
}

export interface Field {
  label: string;
  name: keyof FormData;
  type: string;
}

export interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}