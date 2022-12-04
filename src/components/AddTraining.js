import React, { useState } from 'react';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', 
        activity: '',
        duration: '',
        customer: props.customerId
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const changeDate = (e) => {
        setTraining({...training, date: e});
      };

    return (
        <div>
        <Button color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={training.date}
                    onChange={changeDate}
                    
                    renderInput={(date) => <TextField {...date} />}/>
            </LocalizationProvider>
            <TextField
                margin="dense"
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Duration (min)"
                name="duration"
                value={training.duration}
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