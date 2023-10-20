import React from 'react';
import Map from './maps';
import Navbar from './components/navbar'

const App = () => {

  return (
    <>
      <Navbar/>
      <Map className="justify-center" />
      <h1 className='bg-blue-500'> Hello World</h1>
    </>
  );
}

export default App;
