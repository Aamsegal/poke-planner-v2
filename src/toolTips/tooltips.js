import React from "react"
import Tooltip from '@mui/material/Tooltip';

function ToolTips(props) {

    return (

        <Tooltip title={props.abilityInfo.text}>

            <p 
                id={`${props.pokemonName}_${props.abilityInfo.name}`}
                className="pokemonDataText"
            >
                {props.abilityInfo.name}
            </p>

        </Tooltip>

    )

};

export default ToolTips;