import React, { useState } from 'react';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function AddCustomer(props) {

    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return (
        <div>
        <Button style={{marginTop: 10}} variant="contained" color="primary" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                label="Firstname"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Lastname"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Streetaddress"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Postcode"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="City"
                name="city"
                value={customer.city}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Email"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Phone"
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}