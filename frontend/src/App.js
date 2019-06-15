import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Routes from './routes';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
