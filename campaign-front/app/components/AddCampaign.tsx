import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import {DialogProps, Field, FormData} from "@/app/interfaces/interfaces";

export default function AddCampaign({ open, setOpen }: DialogProps) {
  const {refreshProducts, refreshCampaigns, refreshBalance, products, statuses } = useApplicationContext();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    bid: "",
    fund: "",
    status: "",
    radius: "",
    productID: "",
  });
  const fields: Field[] = [
    { label: "Campaign Name", name: "name", type: "text" },
    { label: "Bid", name: "bid", type: "number" },
    { label: "Fund", name: "fund", type: "number" },
    { label: "Radius", name: "radius", type: "number" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const message = await response.text();
    await refreshProducts();
    await refreshCampaigns();
    await refreshBalance();
    toast[response.status === 200 ? "success" : "error"](message);
    setOpen(false);

  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>Add Campaign</DialogTitle>
      <DialogContent>
        {fields.map(({ label, name, type }) => (
            <TextField
                key={name}
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                fullWidth
                margin="dense"
            />
        ))}
        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        >
          {statuses.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Product Name"
          name="productID"
          value={formData.productID}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        >
          {products
              .filter(product => product.campaignId === null)
              .map(product => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
              ))}
        </TextField>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          Add Campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
