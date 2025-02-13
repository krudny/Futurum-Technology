"use client"

import { Button } from '@mui/material';

export default function Home() {
  return (
      <div className="container flex flex-col items-center justify-center mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center gap-y-6 my-10">
          <h1 className="text-7xl font-semibold">Campaign Manager</h1>
          <h2 className="text-3xl">Available balance: <span className="text-green-500">5999PLN</span></h2>
        </div>

        <div className="flex gap-x-4">
          <Button variant="outlined" color="primary" size="large">Add product</Button>
          <Button variant="outlined" color="primary" size="large">Add campaign</Button>
        </div>

      </div>
  );
}
