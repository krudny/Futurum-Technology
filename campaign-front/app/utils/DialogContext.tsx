import React, { createContext, useContext, useState } from "react";
import { DialogContextType } from "@/app/interfaces/interfaces";

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [productDialog, setProductDialog] = useState(false);
  const [campaignDialog, setCampaignDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const toggleProductDialog = () => setProductDialog((prev) => !prev);
  const toggleCampaignDialog = () => setCampaignDialog((prev) => !prev);
  const toggleEditDialog = () => setEditDialog((prev) => !prev);

  return (
    <DialogContext.Provider
      value={{
        productDialog,
        campaignDialog,
        editDialog,
        toggleProductDialog,
        toggleCampaignDialog,
        toggleEditDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}
