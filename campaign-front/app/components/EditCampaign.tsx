import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem, Autocomplete,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import { Campaign, Field, FormData } from "@/app/interfaces/interfaces";
import { useDialogContext } from "@/app/utils/DialogContext";

export default function EditCampaign({ campaign }: { campaign: Campaign }) {
  const {
    refreshProducts,
    refreshCampaigns,
    refreshBalance,
    cities,
    products,
    statuses,
      keywords
  } = useApplicationContext();
  const { editDialog, toggleEditDialog } = useDialogContext();

  const [formData, setFormData] = useState<FormData>({
    name: campaign.name,
    bid: campaign.bid,
    fund: campaign.fund,
    status: campaign.status,
    city: campaign.city.name,
    radius: campaign.radius,
    keyword: campaign.keyword,
    productId: campaign.product.id,
  });

  const fields: Field[] = [
    { label: "Campaign Name", name: "name", type: "text" },
    { label: "Bid", name: "bid", type: "number" },
    { label: "Fund", name: "fund", type: "number" },
    { label: "Radius", name: "radius", type: "number" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8080/campaign/${campaign.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      },
    );
    const message = await response.text();
    await refreshProducts();
    await refreshCampaigns();
    await refreshBalance();
    toast[response.status === 200 ? "success" : "error"](message);
    toggleEditDialog();
  };

  const availableProducts = products.filter(
    (product) =>
      product.campaignId === null || product.id === formData.productId,
  );

  return (
    <Dialog
      open={editDialog}
      onClose={toggleEditDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Edit Campaign</DialogTitle>
      <DialogContent>
        {fields.map(({ label, name, type }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            type={type}
            value={(formData)[name] || ""}
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
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        >
          {cities.map((city, index) => (
            <MenuItem key={index} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
        <Autocomplete
            options={keywords}
            value={formData.keyword || ""}
            onChange={(event, newValue) =>
                setFormData({ ...formData, keyword: newValue || "" })
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Keyword"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                />
            )}
        />
        <TextField
          select
          label="Product Name"
          name="productId"
          value={formData.productId}
          onChange={(e) =>
            setFormData({ ...formData, productId: Number(e.target.value) })
          }
          required
          fullWidth
          margin="dense"
        >
          {availableProducts.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={toggleEditDialog} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          Save Campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
