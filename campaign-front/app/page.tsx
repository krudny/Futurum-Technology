"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import AddProduct from "@/app/components/AddProduct";
import AddCampaign from "@/app/components/AddCampaign";
import CampaignList from "@/app/components/CampaignList";
import {useCampaigns} from "@/app/utils/CampaignContext";

export default function Home() {
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);

  const { balance } = useCampaigns();

  const handleOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleOpenCampaignDialog = async () => {
    setOpenCampaignDialog(true);
  };

  return (
    <div className="container flex flex-col items-center justify-center mx-auto max-w-screen-lg">
      <div className="flex flex-col items-center gap-y-6 mt-24 mb-8">
        <h1 className="text-7xl font-medium">Campaign Manager</h1>
        <h2 className="text-3xl">
          Available balance: <span className="text-green-500">{balance} PLN</span>
        </h2>
      </div>

      <div className="flex gap-x-4">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleOpenProductDialog}
        >
          Add product
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleOpenCampaignDialog}
        >
          Add campaign
        </Button>
      </div>



      <AddProduct open={openProductDialog} setOpen={setOpenProductDialog} />
      <AddCampaign open={openCampaignDialog} setOpen={setOpenCampaignDialog} />
      <CampaignList />


    </div>
  );
}
