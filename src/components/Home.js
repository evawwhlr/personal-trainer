import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
       <>
           <h1>Welcome back to your personal training overview</h1>
           <Button component={Link} to="/Customer" variant="contained">
                Track Bookings
            </Button>
       </>
    );
}