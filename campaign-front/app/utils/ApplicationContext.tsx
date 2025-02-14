import React, { createContext, useContext, useEffect, useState } from "react";
import { Campaign, ApplicationContextType, FetchDataProps, Product } from "@/app/interfaces/interfaces";
import toast from "react-hot-toast";

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [balance, setBalance] = useState(0);

  async function fetchData<T>({ url, setState, error_feedback }: FetchDataProps<T>): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8080/${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: T = await response.json();
      setState(data);
    } catch (error) {
      toast.error(`Błąd podczas pobierania ${error_feedback}: ${error}`);
    }
  }

  async function refreshCampaigns(): Promise<void> {
    await fetchData<Campaign[]>({ url: "campaign", setState: setCampaigns, error_feedback: "kampanii" });
  }

  async function refreshProducts(): Promise<void> {
    await fetchData<Product[]>({ url: "products", setState: setProducts, error_feedback: "produktów" });
  }

  async function refreshStatuses(): Promise<void> {
    await fetchData<string[]>({ url: "campaign/statuses", setState: setStatuses, error_feedback: "statusów" });
  }

  async function refreshBalance(): Promise<void> {
    await fetchData<number>({ url: "user/balance?userId=1", setState: setBalance, error_feedback: "balansu" });
  }

  useEffect(() => {
    refreshCampaigns();
    refreshProducts();
    refreshStatuses();
    refreshBalance();
  }, []);

  return (
      <ApplicationContext.Provider
          value={{
            campaigns,
            products,
            statuses,
            balance,
            fetchData,
            refreshCampaigns,
            refreshProducts,
            refreshStatuses,
            refreshBalance,
          }}
      >
        {children}
      </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
}
