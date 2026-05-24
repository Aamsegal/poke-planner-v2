const express = require("express");
const axios = require("axios");

const pokeApi = express.Router();

let P = "";

async function setupPokedex() {

    const { default: Pokedex } = await import("pokedex-promise-v2");
    P = new Pokedex();

    console.log("pokedex set")

};

setupPokedex();


pokeApi.get("/", async (req, res) => {

    res.json({message: "pokeApiEndpoint is working"})

});

pokeApi.get("/pokemonList", async (req, res) => {
    console.log("get /pokemonList was reached")

    let requestResponse = {};

    try{

        requestResponse = await P.getPokemonsList();

    }catch(error) {

        console.log(error)

    }

    res.json(requestResponse)

});

pokeApi.post("/grabPokemonInfo", async(req, res) => {

    console.log("post /grabPokemonInfo was reached")

    const pokemonName = req.body.pokemonName;

    let requestResponse = {};

    try{

        requestResponse = await P.getPokemonByName(pokemonName);

    }catch(error) {

        console.log(error)

    }

    res.json(requestResponse)

});

pokeApi.post("/grabPokemonAbilityInfo", async(req, res) => {

    console.log("post /grabPokemonAbilityInfo was reached")

    const abilityName = req.body.pokemonAbility;

    let requestResponse = {};

    try{

        requestResponse = await P.getAbilityByName(abilityName);

    }catch(error) {

        console.log(error)

    }

    res.json(requestResponse)

});

pokeApi.post("/types", async(req, res) => {
    console.log("get /types was reached")

    const typeName = req.body.type;
    console.log(req.body)

    if(typeName === undefined) {

        res.json({message: "Please provide a type"})
        return
    }

    let requestResponse = {};

    try{

        requestResponse = await P.getTypeByName(typeName);

    }catch(error) {

        console.log(error)

    }

    res.json(requestResponse)

})

module.exports = pokeApi;