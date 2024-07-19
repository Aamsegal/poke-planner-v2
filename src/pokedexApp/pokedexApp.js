/* ---React Imports--- */
import React, { useState, useEffect } from "react";

/* ---MUI Imports--- */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/* ---External Packages */
import axios from 'axios';

import "./pokedexApp.css";

function PokedexApp(props){

    useEffect(() => {

        console.log("Im Mounted")

    },[])

    const [pokemonName, setPokemonName] = useState("");
    const [searchedForPokemonApiInfo, setSearchedForPokemonApiInfo] = useState({});

    const typeColorChart = {
        "hp": {
            text: "HP",
            color:"#9EE865"
        },
        "attack": {
            text: "Attack",
            color:"#F5DE69"
        },
        "defense": {
            text: "Defense",
            color:"#F09A65"
        },
        "special-attack": {
            text: "Sp. Attack",
            color:"#66D8F6"
        },
        "special-defense": {
            text: "Sp. Defense",
            color:"#899EEA"
        },
        "speed": {
            text: "Speed",
            color:"#E46CCA"
        }
    };

    const updatePokemonSearchName = (event) => {

        const addition = event.target.value;
        console.log(addition)
        setPokemonName(addition)

    }

    const searchForPokemon = async () => {

        console.log(`searchForPokemon() - ${pokemonName}`)

        const lowerCaseName = pokemonName.toLocaleLowerCase()

        try{

            const searchForPokemonApiConfig = {
                url: `https://pokeapi.co/api/v2/pokemon/${lowerCaseName}/`,
                method: "GET"
            };

            const searchForPokemonApiResponse = await axios.request(searchForPokemonApiConfig);

            setSearchedForPokemonApiInfo(searchForPokemonApiResponse.data)

        }catch(error) {

            console.log(error)

        }

    };

    const renderPokemonInfo = () => {

        const isPokemonInfoGathers = Object.keys(searchedForPokemonApiInfo).length === 0 ? false : true;

        if(isPokemonInfoGathers == false) {

            return <p>No Pokemon Found</p>

        }else{

            return (

                <div className="pokemonData">

                    <div className="spriteContainer pokeInfoContainer" style={{width: "33%"}}>

                        <img src={searchedForPokemonApiInfo.sprites["front_default"]}  />
                    
                    </div>
                    
                    <div className="abilityContainer pokeInfoContainer" style={{width: "33%"}}>

                        <h3 className="pokemonDataHeaders">Ability List</h3>

                        {searchedForPokemonApiInfo.abilities.map((abilityInfo) => {

                            return (
                                <p 
                                    id={`${searchedForPokemonApiInfo.name}_${abilityInfo.ability.name}`}
                                    className="pokemonDataText"
                                >
                                    {abilityInfo.ability.name}
                                </p>
                            )

                        })}

                    </div>

                    <div className="typesContainer pokeInfoContainer" style={{width: "33%"}}>

                        <h3 className="pokemonDataHeaders">Types</h3>
                        {searchedForPokemonApiInfo.types.map((types) => {

                            return (
                                <p 
                                    id={`${searchedForPokemonApiInfo.name}_${types.type.name}`}
                                    className="pokemonDataText"
                                >
                                    {types.type.name}
                                </p>
                            )

                        })}

                    </div>

                    <div className="statsContainer pokeInfoContainer" style={{backgroundColor: "#3D3D3D", width: "33%"}}>

                        <h3 className="pokemonDataHeaders">Stats</h3>
                        <div className="individualStats">

                            {searchedForPokemonApiInfo.stats.map((stats) => {
                                return (
                                    <p 
                                        id={`${searchedForPokemonApiInfo.name}_${stats["base_stat"]}`}
                                        className="pokemonDataText"
                                        style={{
                                            color: typeColorChart[stats.stat.name].color,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {typeColorChart[stats.stat.name].text} - {stats["base_stat"]}
                                    </p>
                                )
                            })}

                        </div>

                    </div>                    

                </div>

            )

        }

    }

    return(
        <div className="pokedexAppContainer">

            <div className="pokeDexApp">

                <div className="pokedexInputContainer">

                    <TextField 
                        id="outlined-basic"
                        label="Search"
                        variant="standard"
                        value={pokemonName}
                        onChange={(event) => updatePokemonSearchName(event)}
                    />
                    <Button 
                        variant="contained"
                        onClick={() => searchForPokemon()}
                    >
                        Search
                    </Button>

                </div>

                <div className="pokemonInfoDisplayContainer">

                    {renderPokemonInfo()}

                </div>

            </div>


        </div>
    )

};

export default PokedexApp;