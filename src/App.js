import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./homePage/homePage";
import NoPageFound from "./noPageFound/noPageFound";

import './App.css';

function App() {
    return (

        <Router>
        
            <div className="appContainer">

                <Routes>

                    <Route path="/" Component={HomePage}/>

                    {/* <Route path="/pokedex"/> */}

                    <Route path="*" Component={NoPageFound}/>


                </Routes>
            
            </div>

        </Router>
    );
}

export default App;
