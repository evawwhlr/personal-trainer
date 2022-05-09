import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Addtraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState ({
    date: new Date('2022-01-01T00:00:00.000Z'),
    duration: '',
    activity: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      addTraining(training);
      setOpen(false);
  };

  const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value,});
      console.log(training)
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent >
        <Stack sx={{ m: 2 }} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date"
              name="date"
              value={training.date}
              onChange={(newValue) => {
                setTraining({...training, date: newValue});
              }}
            />
          </LocalizationProvider>
           <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            type="number"
            label="Duration (min)"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
        </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}