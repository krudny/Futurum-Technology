import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCampaigns } from "@/app/utils/CampaignContext";

interface FormData {
  name: string;
  bid: string;
  fund: string;
  status: string;
  radius: string;
  productID: string;
}

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddCampaign({ open, setOpen }: DialogProps) {
  const { fetchCampaigns, fetchProducts, fetchStatuses, products, statuses } = useCampaigns();
  const [formData, setFormData] = useState<FormData>({ name: "", bid: "", fund: "", status: "", radius: "", productID: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const message = await response.text();
      if (!response.ok) throw new Error(message);

      toast.success(message);
      setOpen(false);
      await fetchCampaigns();

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Campaign</DialogTitle>
        <DialogContent>
          <TextField label="Campaign Name" name="name" value={formData.name} onChange={handleChange} required fullWidth margin="dense" />
          <TextField label="Bid" name="bid" type="number" value={formData.bid} onChange={handleChange} required fullWidth margin="dense" />
          <TextField label="Fund" name="fund" type="number" value={formData.fund} onChange={handleChange} required fullWidth margin="dense" />
          <TextField label="Radius" name="radius" type="number" value={formData.radius} onChange={handleChange} required fullWidth margin="dense" />

          <TextField select label="Status" name="status" value={formData.status} onChange={handleChange} required fullWidth margin="dense">
            {statuses.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
            ))}
          </TextField>

          <TextField select label="Product Name" name="productID" value={formData.productID} onChange={handleChange} required fullWidth margin="dense">
            {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="outlined" color="success">
            Add Campaign
          </Button>
        </DialogActions>
      </Dialog>
  );
}
