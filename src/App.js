import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Portfolio from './components/Portfolio';

const App = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
