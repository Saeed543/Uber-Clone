import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const LandingPage = () => {

    // const handLelogin = () => {

    // }

    return (
        <div className='min-h-screen flex items-center justify-center flex-col'>
            <Typography component="div" fontFamily={'Roboto'} sx={{fontSize: "20px"}}> Welcome, user!</Typography>
            <div className='m-2'>
                <Link to="/Signin">
                    <Button variant='contained' sx={{ margin: 0.25 }}>Login</Button>
                </Link>
                <Link to="/Signup">
                    <Button variant='contained' sx={{ margin: 0.25}}>Sign-up</Button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
