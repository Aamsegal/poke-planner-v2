import React from "react";

import ToolTips from "../../toolTips/tooltips";

function PokemonAbilities(props) {

    console.log(props)

    return(

        <div className="abilityContainer pokeInfoContainer" style={{width: "33%"}}>

            <h3 className="pokemonDataHeaders">Ability List</h3>

            {props.pokemonAbilitiesList.map((currentAbilityInfo) => {

                const abilityName = currentAbilityInfo.ability.name;
                const abilityText = props.abilityInfo[abilityName];

                const abilityInfo = {name: abilityName, text: abilityText}
                const pokemonName = props.pokemonName;

                return (

                    <ToolTips

                        abilityInfo={abilityInfo}
                        pokemonName={pokemonName}


                    />
                    
                )

            })}

        </div>

    )
};

export default PokemonAbilities;

/*
    <Tooltip title={props.abilityInfo[abilityName] === undefined ? "ChockyMilk": props.abilityInfo[abilityName]}>

        <p 
            id={`${pokemonName}_${abilityName}`}
            className="pokemonDataText"
        >
            {currentAbilityInfo.ability.name}
        </p>

    </Tooltip>
*/