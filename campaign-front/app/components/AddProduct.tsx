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
import {DialogProps } from "@/app/interfaces/interfaces";

export default function AddProduct({open, setOpen}: DialogProps) {
  const [name, setName] = useState("");
  const { refreshProducts } = useApplicationContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
        `http://localhost:8080/products?${new URLSearchParams({ name })}`,
        { method: "POST" }
    );
    const message = await response.text();
    await refreshProducts();
    toast[response.status === 200 ? "success" : "error"](message);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
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
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          Add product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
