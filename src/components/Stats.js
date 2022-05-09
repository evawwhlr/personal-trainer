import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



export default function Stats() {


    return (
       <>
           <h1>Coming soon...</h1>
           <Button component={Link} to="/Customer" variant="contained">
                Back to Customer List
            </Button>
       </>
    );
}