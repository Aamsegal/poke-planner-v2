import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./navbar/navbar";
import HomePage from "./homePage/homePage";
import PokedexApp from "./pokedexApp/pokedexApp";
import TeamPlanner from "./teamPlanner/teamPlanner";
import GameInfo from "./gameInfo/gameInfo";
import NoPageFound from "./noPageFound/noPageFound";

import './App.css';

function App() {

    const [height, setHeight] = useState(0);

    const pathNames = {
        "Home": "/",
        "Pokedex": "/pokedex",
        "Team Planner": "/teamPlanner",
        "Game Info": "/gameInfo"
    }

    return (

        <div className="appContainer">

            <Router>

                <NavBar 
                    pathInfo={pathNames}
                    setHeight={setHeight}
                />

                <div className="routeContainer" style={{marginTop: `${height}px`}}>

                    <Routes>

                        <Route path={pathNames["Home"]} Component={HomePage}/>

                        <Route path={pathNames["Pokedex"]} Component={PokedexApp}/>

                        <Route path={pathNames["Team Planner"]} Component={TeamPlanner}/>

                        <Route path={pathNames["Game Info"]} Component={GameInfo}/>

                        <Route path="*" Component={NoPageFound}/>


                    </Routes>
                    
                </div>

            
            </Router>
        
        </div>
    );
}

export default App;
