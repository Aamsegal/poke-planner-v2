/* ---React Imports--- */
import React, { useState, useEffect } from "react";

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
import PokemonIcons from "../pokemonDetails/pokemonIcon/pokemonIcon";
import PokemonAbilities from "../pokemonDetails/pokemonAbility/pokemonAbilities";
import PokemonStats from "../pokemonDetails/pokemonStats/pokemonStats";
import PokemonTypes from "../pokemonDetails/pokemonTypes/pokemonTypes";
import "./pokedexApp.css";

function PokedexApp(props){

    const [pokemonList, setPokemonList] = useState([]);

    const [pokemonName, setPokemonName] = useState("");
    const [searchedForPokemonApiInfo, setSearchedForPokemonApiInfo] = useState({});
    const [abilityInfo_State, setAbilityInfo_State] = useState({});

    const grabAllPokemon = async () => {

        const grabAllPokemonAxiosConfig = {
            method: "get",
            url: "http://localhost:8080/pokeApi/pokemonList"
        };

        try{

            const searchForPokemonApiResponse = await axios.request(grabAllPokemonAxiosConfig);
            const cleanedPokemonList = [];

            for(const currentPokemon of searchForPokemonApiResponse.data.results) {

                const currentPokemonName = currentPokemon.name;

                cleanedPokemonList.push(currentPokemonName);
            }

            setPokemonList(cleanedPokemonList);

        }catch(error){

            console.log(error)

        }                

    };

    

    const updatePokemonSearchName = (event) => {

        const addition = event.target.value;
        setPokemonName(addition)

    }

    const grabAbilityInfo = async (abilities) => {

        const abilityInfo = {};

        for(const currentAbilityInfo of abilities) {

            const currentAbilityName = currentAbilityInfo.ability.name;
            
            const axiosConfig = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:8080/pokeApi/grabPokemonAbilityInfo",
                data: {
                    pokemonAbility: currentAbilityName
                }
            };

            try{

                const searchForAbilityApiResponse = await axios.request(axiosConfig);
                const abilityText = searchForAbilityApiResponse.data["effect_entries"][1].effect;

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

        const axiosConfig = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:8080/pokeApi/grabPokemonInfo",
            data: {
                pokemonName: lowerCaseName
            }
        };

        try{

            const searchForPokemonApiResponse = await axios.request(axiosConfig);

            grabAbilityInfo(searchForPokemonApiResponse.data.abilities)
            
            setSearchedForPokemonApiInfo(searchForPokemonApiResponse.data)

        }catch(error){

            console.log("it broke")
            console.log(error)

        }

    };

    const generateIconList = (spriteList) => {

        if(spriteList !== undefined) {

            const imageOrder = [
                {imageName: "front_default", imageText: "Male"},
                {imageName: "front_female", imageText: "Female"},
                {imageName: "back_default", imageText: "Male"},
                {imageName: "back_female", imageText: "Female"},
                {imageName: "front_shiny", imageText: "Male"},
                {imageName: "front_shiny_female", imageText: "Female"},
                {imageName: "back_shiny", imageText: "Male"},
                {imageName: "back_shiny_female", imageText: "Female"}
            ];

            const imageLinks = [];

            for(const imageInfo of imageOrder) {

                const currentImage = searchedForPokemonApiInfo.sprites[imageInfo.imageName];

                if(currentImage !== null) {

                    imageInfo.imageName = currentImage;

                    imageLinks.push(imageInfo)

                }
                
            };

            return(imageLinks)

        }else{

            return([])
            
        }
        
    }

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

                    <PokemonIcons
                        iconSprite={generateIconList(searchedForPokemonApiInfo.sprites)}
                    />

                    <PokemonAbilities
                        pokemonName={searchedForPokemonApiInfo.name}
                        pokemonAbilitiesList={searchedForPokemonApiInfo.abilities}
                        abilityInfo={abilityInfo_State}
                    />
                    
                    <PokemonTypes
                        pokemonName={searchedForPokemonApiInfo.name}
                        types={searchedForPokemonApiInfo.types}
                    />       

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

                    <PokemonStats 
                        searchedForPokemonApiInfo={searchedForPokemonApiInfo}
                    />

                </div>

            </div>


        </div>
    )

};

export default PokedexApp;