import { createContext, useContext, useEffect, useState } from "react";

interface Campaign {
  id: number;
  name: string;
  bid: number;
  fund: number;
  product: string;
  radius: number;
  status: string;
}

interface Product {
  id: number;
  name: string;
  campaign: string | null;
}

interface CampaignContextType {
  campaigns: Campaign[];
  fetchCampaigns: () => Promise<void>;
  products: Product[];
  fetchProducts: () => Promise<void>;
  statuses: string[];
  fetchStatuses: () => Promise<void>;
  balance: number;
  fetchBalance: () => Promise<void>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [balance, setBalance] = useState(0);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:8080/campaign");
      const data = await response.json();
      setCampaigns(data || []);
    } catch (error) {
      console.error("Błąd pobierania kampanii:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data); // Filtrujemy dostępne produkty
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await fetch("http://localhost:8080/campaign/statuses");
      const data = await response.json();
      setStatuses(data || []);
    } catch (error) {
      console.error("Błąd pobierania statusów:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/balance?userId=1");
      const data = await response.json();
      console.log("Fetched balance:", data); // ✅ Sprawdź, co zwraca API

      if (typeof data !== "number") {
        console.error("Błąd: API nie zwróciło liczby", data);
        setBalance(0); // ✅ Zapobiega błędom
      } else {
        setBalance(data);
      }
    } catch (error) {
      console.error("Błąd pobierania balansu:", error);
      setBalance(0);
    }
  };


  useEffect(() => {
    fetchCampaigns();
    fetchProducts();
    fetchStatuses();
    fetchBalance();
  }, []);

  return (
      <CampaignContext.Provider value={{ campaigns, fetchCampaigns, products, fetchProducts, statuses, fetchStatuses, balance, fetchBalance }}>
        {children}
      </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
}
