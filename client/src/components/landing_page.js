import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const LandingPage = () => {

    // const handLelogin = () => {

    // }

    return (
        <div className='min-h-screen flex items-center justify-center flex-col'>
            <div className='font-semibold'> Welcome, user!</div>
            <div className='m-2'>
                <Link to="/Login">
                    <button className='bg-black text-white border-red-400 rounded p-2 m-2'>Login</button>
                </Link>
                <Link to="/Sign-up">
                    <button className='bg-black text-white border-red-400 rounded p-2 m-2'>Sign-up</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
