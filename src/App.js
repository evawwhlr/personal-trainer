import React,  { useState } from 'react';
import './App.css';
import ResponsiveAppBar from "./components/Navigation"

import Home from './components/Home';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Customer" element={<Customerlist />}></Route>
        <Route path="/Trainings" element={<Traininglist />}></Route>
        <Route path="/Calendar" element={<Calendar />}></Route>
        <Route path="/Statistics" element={<Stats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
