/* ---React Imports--- */
import React, {useState, useEffect} from "react";

/* ---External Packages */
import axios from "axios";

function PokemonTypes(props) {

    const [typeWeakness, setTypeWeakness] = useState({});
    const [typeStrengths, setTypeStrengths] = useState({});

    const damageRelationCalculator = {
        "double_damage_from": 2,
        "double_damage_to": 2,
        "half_damage_from": .5,
        "half_damage_to": .5,
        "no_damage_from": 0,
        "no_damage_to": 0
    }

    const pokemonWeaknessCalculator = async (typeName) => {
            
        const getPokemonTypeAxiosConfig = {
            method: "post",
            url: "http://localhost:8080/pokeApi/types",
            data: {
                type: typeName
            }
        };

        let typeDamageData = {};

        try{

            const typeAxiosResponse = await axios.request(getPokemonTypeAxiosConfig);
            typeDamageData = typeAxiosResponse.data["damage_relations"];

        }catch(error) {

            console.log(error)

        };

        console.log(typeDamageData)

        const defense = {};
        const offense = {};

        for(const [calculationType, amount] of Object.entries(damageRelationCalculator)) {

            /* checks if its damage from or against */
            if(calculationType.includes("_from")){

                for(const currentTypeInfo of typeDamageData[calculationType]) {
                    
                    const currentTypeName = currentTypeInfo.name;

                    if(defense[currentTypeName] === undefined) {

                        defense[currentTypeName] = amount;

                    }else{

                        defense[currentTypeName] = defense[currentTypeName] * amount;

                    }

                }

            }else if(calculationType.includes("_to")){

                for(const currentTypeInfo of typeDamageData[calculationType]) {
                    
                    const currentTypeName = currentTypeInfo.name;

                    if(offense[currentTypeName] === undefined) {

                        offense[currentTypeName] = amount;

                    }else{

                        offense[currentTypeName] = offense[currentTypeName] * amount;

                    }

                }

            }
            
        };

        console.log("Defense")
        console.log(defense)
        console.log("Offense")
        console.log(offense)

    };

    useEffect(() => {

        for(const currentType of props.types) {

            let currentTypeName = currentType.type.name;
            pokemonWeaknessCalculator(currentTypeName)
        }

    },[props.types])

    return (
        <div className="typesContainer" style={{width: "33%"}}>

            <h3 className="pokemonDataHeaders">Types</h3>
            {props.types.map((types) => {

                return (
                    <p 
                        id={`${props.pokemonName}_${types.type.name}`}
                        key={`${props.pokemonName}_${types.type.name}`}
                        className="pokemonDataText"
                    >
                        {types.type.name}
                    </p>
                )

            })}

        </div>     
    )

};

export default PokemonTypes;