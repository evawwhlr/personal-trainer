import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    const dayjs = require('dayjs')
    dayjs().format();

    const deleteTraining= (id) => {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                alert('Something went wrong in deletion');
            }
            else {
                setOpen(true);
                fetchTrainings();
            }
        })
        .catch(err => console.error(err))
    };

    const [columns] = useState([
        {field: 'date', sortable: true, filter: true, floatingFilter: true, resizable: true, cellStyle: { 'text-align': "left" }, valueFormatter: (params) => { return dayjs(params.value).format('MMM D, h:mm A')}},
        {field: 'duration', sortable: true, filter: true, floatingFilter: true, resizable: true, cellStyle: { 'text-align': "left" }},
        {field: 'activity', sortable: true, filter: true, floatingFilter: true, width: 150, cellStyle: { 'text-align': "left" }},
        {headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true, width: 150, cellStyle: { 'text-align': "left" }},
        {
            headerName: ' ',
            field: 'id',
            resizable: true,
            cellRenderer: params =>
                <IconButton color="error" onClick = {() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);


    return (
       <>
        <div className="ag-theme-material" style={{height: 700, width: '100%'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
            />
        </div>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Customer was successfully deleted"
            />       
       </>
    );
}