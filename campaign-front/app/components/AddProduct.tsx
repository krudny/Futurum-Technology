import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import { useDialogContext } from "@/app/utils/DialogContext";

export default function AddProduct() {
  const [name, setName] = useState("");
  const { refreshProducts } = useApplicationContext();
  const { productDialog, toggleProductDialog } = useDialogContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://campaign-manger-374135600235.us-central1.run.app/products?${new URLSearchParams({ name })}`,
      { method: "POST" },
    );
    const message = await response.text();
    await refreshProducts();
    toast[response.status === 200 ? "success" : "error"](message);
    toggleProductDialog();
  };

  return (
    <Dialog
      open={productDialog}
      onClose={toggleProductDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Add product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Enter product name"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button onClick={toggleProductDialog} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          color="success"
          disabled = {!name}
        >
          Add product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
