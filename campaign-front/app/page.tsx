"use client"

import { Button } from '@mui/material';
import {useState} from "react";
import AddProduct from "@/app/components/AddProduct";

export default function Home() {
  const [openProduct, setOpenProduct] = useState(false);

  const handleOpenProduct = () => {
    setOpenProduct(true);
  }

  return (
      <div className="container flex flex-col items-center justify-center mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center gap-y-6 mt-24 mb-8">
          <h1 className="text-7xl font-semibold">Campaign Manager</h1>
          <h2 className="text-3xl">Available balance: <span className="text-green-500">5999PLN</span></h2>
        </div>

        <div className="flex gap-x-4">
          <Button variant="outlined" color="primary" size="large" onClick={handleOpenProduct}>Add product</Button>
          <Button variant="outlined" color="primary" size="large">Add campaign</Button>
        </div>

        <AddProduct open={openProduct} setOpen={setOpenProduct} />

      </div>
  );
}
