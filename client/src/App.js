import React from 'react';
import Home from './components/Home';
import LandingPage from "./components/landing_page";
import Login from "./components/login"
import Signup from "./components/signup"
import { Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Signup' element={<Signup />} />
        <Route exact path='/Home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
