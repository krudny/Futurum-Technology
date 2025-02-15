import { Campaign, City, Product } from "@/app/interfaces/ModelInterfaces";
import { FetchDataProps } from "@/app/interfaces/Interfaces";

export interface ApplicationContextType {
  campaigns: Campaign[];
  products: Product[];
  statuses: string[];
  balance: number;
  cities: City[];
  keywords: string[];
  fetchData: <T>(props: FetchDataProps<T>) => Promise<void>;
  refreshCampaigns: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshStatuses: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  deleteCampaign: (id: number) => Promise<void>;
}

export interface DialogContextType {
  productDialog: boolean;
  campaignDialog: boolean;
  editDialog: boolean;
  toggleProductDialog: () => void;
  toggleCampaignDialog: () => void;
  toggleEditDialog: () => void;
}
