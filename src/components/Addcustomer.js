import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addcustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState ({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    phone: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      addCustomer(customer);
      setOpen(false);
  };

  const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value})
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="Firstname"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Lastname"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Street"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}