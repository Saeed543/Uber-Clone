import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import LandingPage from "./components/landing_page";
import SignIn from "./components/SignIn"
import SignUp from "./components/Signup"
import { Navigate, Route, Routes } from 'react-router-dom';
import { REACT_APP_API_URL } from './config';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${REACT_APP_API_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);


  return (
    <div>
      <Routes>
        <Route exact path='/' element={user ? <Home user={user} /> : <LandingPage />} />
        <Route exact path='/Signin' element={user ? <Home user={user} /> : <SignIn />} />
        <Route exact path='/Signup' element={user ? <Home user={user} /> : <SignUp />} />
        <Route exact path='/Home' element={user ? <Home user={user} /> : <Navigate to="/SignIn" />} />
      </Routes>
    </div>
  );
}

export default App;
