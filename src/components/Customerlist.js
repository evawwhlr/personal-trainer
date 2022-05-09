import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    const deleteCustomer = (link) => {
        fetch(link, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                alert('Something went wrong in deletion');
            }
            else {
                setOpen(true);
                fetchCustomers();
            }
        })
        .catch(err => console.error(err))
    };

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (!response.ok) {
                alert('Something went wrong in edit');
            }
            else {
                fetchCustomers();
            }
        })
        .catch(err => console.error(err))
    };

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then (response => {
            if (response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong when adding customer');
            }
        })
        .catch(err => console.error(err)) 
    };

    const addTraining = (newTraining, id) => {
        fetch(`https://customerrest.herokuapp.com/api/customers/${id}/trainings`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(console.log(newTraining))
        .then (response => {
            if (response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong when adding training');
            }
        })
        .catch(err => console.error(err)) 
    };

    const [columns] = useState([
        {field: 'firstname', sortable: true, filter: true, floatingFilter: true, width: 150, cellStyle: { 'textAlign': "left" }},
        {field: 'lastname', sortable: true, filter: true, floatingFilter: true, width: 150, cellStyle: { 'textAlign': "left" }},
        {field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, resizable: true, cellStyle: { 'textAlign': "left" }},
        {field: 'postcode', sortable: true, filter: true, floatingFilter: true, width: 120, cellStyle: { 'textAlign': "left" }},
        {field: 'city', sortable: true, filter: true, floatingFilter: true, width: 150, cellStyle: { 'textAlign': "left" }},
        {field: 'phone', sortable: true, filter: true, floatingFilter: true, resizable: true, cellStyle: { 'textAlign': "left" }},
        {
            headerName: ' ',
            field: 'links.0.href',
            width: 70,
            cellRenderer: params => <Editcustomer params={params} updateCustomer={updateCustomer}/> 
        },
        {
            headerName: ' ',
            field: 'links.0.href',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error" onClick = {() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
        {
            headerName: ' ',
            field: 'links.2.href',
            resizable: true,
            cellRenderer: params => <Addtraining params={params} addTraining={addTraining}/> 
        }
    ]);

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);


    return (
       <>
       <Box sx={{ width: '100%', margin: 2 }}>
            <Stack direction="row" spacing={2}>
                <Addcustomer addCustomer={addCustomer} />
                <Button variant="contained" onClick={onBtnExport}> Export Customers</Button>
            </Stack>
        </Box>

        <div className="ag-theme-material" style={{height: 700, width: '100%'}} >
            <AgGridReact
                ref={gridRef}
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
                rowHeight={50}
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