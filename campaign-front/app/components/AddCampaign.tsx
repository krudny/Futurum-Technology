import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddCampaign({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    bid: "",
    fund: "",
    status: "",
    radius: "",
    productID: "",
  });

  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/campaign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const message = await response.text();

    if (response.status === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    handleClose();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      const availableProducts = data.filter(
        (product) => product.campaign === null,
      );
      setProducts(availableProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await fetch("http://localhost:8080/campaign/statuses");
      const data = await response.json();
      setStatuses(data);
    };
    fetchStatuses();
  }, []);



  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Campaign</DialogTitle>
      <DialogContent>
        <TextField
          label="Campaign Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Bid"
          name="bid"
          type="number"
          value={formData.bid}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Fund"
          name="fund"
          type="number"
          value={formData.fund}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
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
        {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
        ))}
          </TextField>
        <TextField
          label="Radius"
          name="radius"
          type="number"
          value={formData.radius}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
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
          {products.map(
            (product: { id: number; name: string; campaign: string }) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ),
          )}
        </TextField>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button onClick={handleClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          Add campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
