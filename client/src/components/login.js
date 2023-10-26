import React from 'react';
import google from "../images/google.png"
import { REACT_APP_API_URL } from "../config/index"
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const Login = () => {

    const googleAuth = () => {
        window.open(
            `${REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <form>
                <input className='border border-black rounded-sm m-1' type='email' name='email' placeholder='Email'></input><br />
                <input className='border border-black rounded-sm m-1' type='password' name='password' placeholder='Password'></input><br />
            </form>
            <input className='bg-black text-white rounded-sm m-1 p-1 hover:cursor-pointer hover:bg-cyan-500 hover:text-black transition-all duration-200' type='submit' name='login' value="Login"></input>

            <button onClick={googleAuth} className='flex justify-center items-center border-2 border-black bg-white text-black'>
                <img src={google} alt='google png' />
                <span>sign up with google</span>
            </button>

            <p>New here? <Link to="/Signup">Sign Up</Link></p>
        </div>
    );
}

export default Login;
