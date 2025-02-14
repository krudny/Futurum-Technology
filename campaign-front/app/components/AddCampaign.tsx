import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
 Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import { Field, FormData } from "@/app/interfaces/interfaces";
import { useDialogContext } from "@/app/utils/DialogContext";
import Loading from "@/app/loading";

export default function AddCampaign() {
  const {
    refreshProducts,
    refreshCampaigns,
    refreshBalance,
    cities,
    products,
    statuses,
      keywords,
  } = useApplicationContext();
  const { campaignDialog, toggleCampaignDialog } = useDialogContext();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    bid: 0,
    fund: 0,
    status: "",
    radius: 0,
    city: "",
    keyword: "",
    productId: 0,
  });

  useEffect(() => {
    if (statuses.length && cities.length && products.length) {
      const availableProducts = products.filter(
        (product) => product.campaignId === null,
      );
      setFormData({
        name: "",
        bid: 0,
        fund: 0,
        status: statuses[0],
        radius: 0,
        city: cities[0].name,
        keyword: keywords[0],
        productId: availableProducts.length ? availableProducts[0].id : 0,
      });
    }
  }, [statuses, cities, products, keywords]);

  const fields: Field[] = [
    { label: "Campaign Name", name: "name", type: "text" },
    { label: "Bid", name: "bid", type: "number" },
    { label: "Fund", name: "fund", type: "number" },
    { label: "Radius", name: "radius", type: "number" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    toggleCampaignDialog();
  };

  if (!statuses.length || !cities.length || !products.length) {
    return <Loading />;
  }

  return (
    <Dialog
      open={campaignDialog}
      onClose={toggleCampaignDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Add Campaign</DialogTitle>
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
          {products
            .filter((product) => product.campaignId === null)
            .map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={toggleCampaignDialog} variant="outlined" color="error">
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
