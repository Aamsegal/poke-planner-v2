/* ---React Imports--- */
import React, { useState, useEffect } from "react";

/* ---MUI Imports--- */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete } from "@mui/material";

/* ---External Packages */

import "./pokedexApp.css";
import zIndex from "@mui/material/styles/zIndex";

const Pokedex = require("pokeapi-js-wrapper")
const customPokedexOptions = {
    protocol: "https",
    hostName: "pokeapi.co",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 5 * 1000, // 5s
    cacheImages: true
};
const P = new Pokedex.Pokedex(customPokedexOptions);

function PokedexApp(props){

    const [pokemonList, setPokemonList] = useState([]);

    const [pokemonName, setPokemonName] = useState("");
    const [searchedForPokemonApiInfo, setSearchedForPokemonApiInfo] = useState({});
    const [abilityInfo_State, setAbilityInfo_State] = useState({});

    const grabAllPokemon = async () => {

        const rawPokemonList = await P.getPokemonsList();

        console.log(rawPokemonList)

        const cleanedPokemonList = [];

        for(const currentPokemon of rawPokemonList.results) {

            const currentPokemonName = currentPokemon.name;

            cleanedPokemonList.push(currentPokemonName);
        }

        setPokemonList(cleanedPokemonList);

    }

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
        setPokemonName(addition)

    }

    const grabAbilityInfo = async (abilities) => {

        console.log(abilities)

        const abilityInfo = {};

        for(const currentAbilityInfo of abilities) {

            const currentAbilityName = currentAbilityInfo.ability.name;

            try{
    
                const searchForAbilityApiResponse = await P.getAbilityByName(currentAbilityName);

                const abilityText = searchForAbilityApiResponse["effect_entries"][1].effect;

                abilityInfo[currentAbilityName] = abilityText;
    
            }catch(error) {

                console.log(error)
    
            }

        }

        setAbilityInfo_State(abilityInfo)

    };

    const searchForPokemon = async () => {

        console.log(`searchForPokemon() - ${pokemonName}`)

        const lowerCaseName = pokemonName.toLocaleLowerCase();

        try{

            const searchForPokemonApiResponse = await P.getPokemonByName(lowerCaseName);

            grabAbilityInfo(searchForPokemonApiResponse.abilities)
            
            setSearchedForPokemonApiInfo(searchForPokemonApiResponse)

        }catch(error){

            console.log(error)

        }

    };

    useEffect(() => {

        console.log("Im Mounted")

        if(pokemonList.length === 0) {

            grabAllPokemon()

        }

    },[])

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

                        {searchedForPokemonApiInfo.abilities.map((currentAbilityInfo) => {

                            const abilityName = currentAbilityInfo.ability.name;
                            const pokemonName = searchedForPokemonApiInfo.name;

                            return (

                                <Tooltip title={abilityInfo_State[abilityName] === undefined ? "ChockyMilk": abilityInfo_State[abilityName]}>

                                    <p 
                                        id={`${pokemonName}_${abilityName}`}
                                        className="pokemonDataText"
                                    >
                                        {currentAbilityInfo.ability.name}
                                    </p>

                                </Tooltip>
                            )

                        })}

                    </div>

                    <div className="typesContainer pokeInfoContainer" style={{width: "33%"}}>

                        <h3 className="pokemonDataHeaders">Types</h3>
                        {searchedForPokemonApiInfo.types.map((types) => {

                            return (
                                <p 
                                    id={`${searchedForPokemonApiInfo.name}_${types.type.name}`}
                                    key={`${searchedForPokemonApiInfo.name}_${types.type.name}`}
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

                    <Autocomplete
                        options={pokemonList}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => setPokemonName(value)}
                        sx={{width: "50%"}}
                        freeSolo
                        renderInput={(params) => (

                            <TextField
                                {...params}
                                id="outlined-basic"
                                label="Search"
                                variant="standard"
                                //value={pokemonName}
                                onChange={(event) => updatePokemonSearchName(event)}
                            />
                        )}
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