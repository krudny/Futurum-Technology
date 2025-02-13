import {Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from '@mui/material';
import {useState} from "react";
import toast from "react-hot-toast";

export default function AddProduct({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({ name });
    const response = await fetch(`http://localhost:8080/products?${params.toString()}`, {
      method: "POST",
    });

    const message = await response.text();

    if (response.status === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
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
        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
        <Button onClick={handleSubmit} type="submit" variant="outlined" color="success">Add product</Button>
      </DialogActions>
    </Dialog>
  )
}