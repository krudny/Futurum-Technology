"use client";

import { Button } from "@mui/material";
import AddProduct from "@/app/components/AddProduct";
import AddCampaign from "@/app/components/AddCampaign";
import CampaignList from "@/app/components/CampaignList";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import { useDialogContext } from "@/app/utils/DialogContext";
import Loading from "@/app/loading";

export default function Home() {
  const { balance } = useApplicationContext();
  const { toggleProductDialog, toggleCampaignDialog } = useDialogContext();

  if (balance == null) {
    return <Loading />
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto max-w-screen-lg">
      <div className="flex flex-col items-center gap-y-10 mt-24 mb-8">
        <h1 className="text-4xl font-light md:text-7xl">Campaign Manager</h1>
        <h2 className="text-2xl font-light">
          Available balance: {" "}
          <span className="text-green-500">{balance} PLN</span>
        </h2>
      </div>

      <div className="flex gap-x-4">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={toggleProductDialog}
        >
          Add product
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={toggleCampaignDialog}
        >
          Add campaign
        </Button>
      </div>

      <AddProduct />
      <AddCampaign />
      <CampaignList />
    </div>
  );
}
