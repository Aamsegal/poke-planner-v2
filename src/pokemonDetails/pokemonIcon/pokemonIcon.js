import React, {useState, useEffect} from "react";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function PokemonIcons(props) {

    const [pokemonSpriteList, setPokemonSpriteImage] = useState(props.iconSprite);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {

        setCurrentImageIndex(0)
        setPokemonSpriteImage(props.iconSprite);

    },[props.iconSprite]);

    const imageChange = (direction) => {

        let updatedDirection = currentImageIndex + direction;

        const maxImageNumber = pokemonSpriteList.length-1;

        if(updatedDirection > maxImageNumber) {

            updatedDirection = 0;

        }else if(updatedDirection < 0) {

            updatedDirection = maxImageNumber;
        }

        setCurrentImageIndex(updatedDirection)
    };

    return(
        
        <div className="spriteContainer pokeInfoContainer" style={{width: "33%"}}>

            <img src={pokemonSpriteList[currentImageIndex].imageName}/>

            <p style={{margin: "0"}}>{pokemonSpriteList[currentImageIndex].imageText}</p>
            
            <div className="spriteToggle">

                <IconButton>

                    <ArrowCircleLeftIcon onClick={() => imageChange(-1)} variant="container" fontSize="small"/>

                </IconButton>

                <IconButton>

                    <ArrowCircleRightIcon onClick={() => imageChange(1)} variant="container" fontSize="small"/>

                </IconButton>

            </div>
        
        </div>

    )

};

export default PokemonIcons;