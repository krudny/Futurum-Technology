import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {ApplicationContextType} from "@/app/interfaces/ContextInterfaces";
import {Campaign, City, Product} from "@/app/interfaces/ModelInterfaces";
import {FetchDataProps} from "@/app/interfaces/Interfaces";

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [balance, setBalance] = useState(0);
  const [cities, setCities] = useState<City[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  async function fetchData<T>({
    url,
    setState,
    error_feedback,
  }: FetchDataProps<T>): Promise<void> {
    try {
      const response = await fetch(`https://campaign-manger-374135600235.us-central1.run.app/${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: T = await response.json();
      setState(data);
    } catch (error) {
      toast.error(`Błąd podczas pobierania ${error_feedback}: ${error}`);
    }
  }

  async function refreshCities(): Promise<void> {
    await fetchData<City[]>({
      url: "city",
      setState: setCities,
      error_feedback: "miast",
    });
  }

  async function refreshCampaigns(): Promise<void> {
    await fetchData<Campaign[]>({
      url: "campaign",
      setState: setCampaigns,
      error_feedback: "kampanii",
    });
  }

  async function refreshProducts(): Promise<void> {
    await fetchData<Product[]>({
      url: "products",
      setState: setProducts,
      error_feedback: "produktów",
    });
  }

  async function refreshStatuses(): Promise<void> {
    await fetchData<string[]>({
      url: "utils/statuses",
      setState: setStatuses,
      error_feedback: "statusów",
    });
  }

  async function refreshKeywords(): Promise<void> {
    await fetchData<string[]>({
      url: "utils/keywords",
      setState: setKeywords,
      error_feedback: "keywordów",
    });
  }

  async function refreshBalance(): Promise<void> {
    await fetchData<number>({
      url: "user/balance?userId=1",
      setState: setBalance,
      error_feedback: "balansu",
    });
  }

  async function deleteCampaign(id: number): Promise<void> {
    const response = await fetch(`https://campaign-manger-374135600235.us-central1.run.app/campaign/${id}`, {
      method: "DELETE",
    });
    const message = await response.text();
    await Promise.all([
        refreshCampaigns(),
        refreshProducts(),
        refreshStatuses(),
    ])
    toast[response.status === 200 ? "success" : "error"](message);
  }

  useEffect(() => {
    async function loadData() {
      await Promise.all([
        refreshCampaigns(),
        refreshProducts(),
        refreshStatuses(),
        refreshBalance(),
        refreshCities(),
        refreshKeywords(),
      ]);
    }
    loadData();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        campaigns,
        products,
        statuses,
        balance,
        cities,
        keywords,
        fetchData,
        refreshCampaigns,
        refreshProducts,
        refreshStatuses,
        refreshBalance,
        deleteCampaign,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within a ApplicationProvider",
    );
  }
  return context;
}
