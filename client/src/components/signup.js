import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <form>
                <input className='border border-black rounded-sm m-1' type='text' name='name' placeholder='Name'></input><br />
                <input className='border border-black rounded-sm m-1' type='email' name='email' placeholder='Email'></input><br />
                <input className='border border-black rounded-sm m-1' type='password' name='password' placeholder='Password'></input><br />
                <input className='border border-black rounded-sm m-1' type='password' name='confirm_password' placeholder='Confirm Password'></input><br />
            </form>
            <input className='bg-black text-white rounded-sm m-1 p-1 hover:cursor-pointer hover:bg-cyan-500 hover:text-black transition-all duration-200' type='submit' name='signup' value="Sign Up"></input>

            <p>Already Registered? <Link to="/Login">Login</Link></p>

        </div>
    );
}

export default Signup;
