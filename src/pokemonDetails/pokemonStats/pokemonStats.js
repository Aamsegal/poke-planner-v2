/* ---React Imports--- */
import React from "react";

/* ---MUI Imports--- */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from "@mui/material/styles";

/* ---External Packages */
import axios from "axios";

/* internal */
import "./pokemonStats.css"

function PokemonStats(props) {

    const pokemonStatChart = {
        "hp": {
            text: "HP",
            color:"#9EE865",
            max: 255, //blissy
        },
        "attack": {
            text: "Attack",
            color:"#F5DE69",
            max: 190, //mega mewtwo X
        },
        "defense": {
            text: "Defense",
            color:"#F09A65",
            max: 230, //shuckle
        },
        "special-attack": {
            text: "Sp. Attack",
            color:"#66D8F6",
            max: 194, //mega mewtwo 7
        },
        "special-defense": {
            text: "Sp. Defense",
            color:"#899EEA",
            max: 230, //shuckle
        },
        "speed": {
            text: "Speed",
            color:"#E46CCA",
            max: 200, //regieleki
        },
        "total": {
            text: "Total",
            color: "#E46CCA",
            max: 780 //mega rayquaza */
        }
    };

    const generateStatProgressBar = (pokemonStat, statMaxValue) => {

        const pokemonStatProgressBarValue = ((pokemonStat/statMaxValue)*100).toFixed(3);

        return pokemonStatProgressBarValue

    };

    const renderPokemonStats = () => {

        const checkForPokemonInfo = props.searchedForPokemonApiInfo.stats === undefined ? false : true;

        if(checkForPokemonInfo === true) {
            return (

                <div className="individualStatContainer">

                    {props.searchedForPokemonApiInfo.stats.map((stats) => {
    
                        const Placeholder = styled(LinearProgress)(({theme}) => ({
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: pokemonStatChart[stats.stat.name].color, // Change this to your desired color
                            },
                            backgroundColor: "white"
                        }))
    
                        return (

                            <div className="individualStats" style={{width: "30%"}}>

                                <p
                                    id={`${props.searchedForPokemonApiInfo.name}_${stats["base_stat"]}_number`}
                                    key={`${props.searchedForPokemonApiInfo.name}_${stats.stat.name}_${stats["base_stat"]}_number`}
                                    className="pokemonDataText"
                                    style={{
                                        color: pokemonStatChart[stats.stat.name].color,
                                        fontWeight: "bold"
                                    }}>
                                    {stats["base_stat"]}
                                </p>

                                <p
                                    id={`${props.searchedForPokemonApiInfo.name}_${stats["base_stat"]}_Text`}
                                    key={`${props.searchedForPokemonApiInfo.name}_${stats.stat.name}_${stats["base_stat"]}_Text`}
                                    className="pokemonDataText"
                                    style={{
                                        color: pokemonStatChart[stats.stat.name].color,
                                        fontWeight: "bold"
                                    }}>
                                    {pokemonStatChart[stats.stat.name].text}
                                </p>

                                <Placeholder 
                                    variant="determinate"
                                    value={generateStatProgressBar(stats["base_stat"],pokemonStatChart[stats.stat.name].max)}
                                    style={{
                                        backgroundColor: "white",
                                        height: "8px"
                                    }}
                                />
    
                            </div>
                        )
                    })}

                </div>
                
            )
        }else{
            return(
                <p>Select a Pokemon</p>
            )
        }

    }

    return (
        <div className="statsContainer">
            
            <h3 className="pokemonDataHeaders" style={{width: "100%"}}>Stats</h3>

            {renderPokemonStats()}

        </div>        
    )

};

export default PokemonStats;
