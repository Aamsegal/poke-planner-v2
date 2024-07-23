import React from "react";

function PokemonIcons(props) {

    return(
        
        <div className="spriteContainer pokeInfoContainer" style={{width: "33%"}}>

            <img src={props.iconSprite["front_default"]}/>
        
        </div>

    )

};

export default PokemonIcons;