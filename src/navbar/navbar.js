/* ---React Imports--- */
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

/* ---MUI Imports--- */
import Button from '@mui/material/Button';

import "./navbar.css"

function NavBar(props) {

    const navigate = useNavigate(); //allows sending to other routes through functions

    /* allows navigation to different routes though parameters */
    const navBarNavigation = (path) => {

        navigate(path)

    };

    /* goes through keys of path prop to render buttons and their code */
    const renderButtons = () => {

        const buttonInfoObject = props.pathInfo;

        return Object.keys(buttonInfoObject).map((currentButtonKey) => {

            const buttonPath = buttonInfoObject[currentButtonKey]

            return (
                <Button 
                    variant="contained"
                    size="small"
                    sx={{
                        marginLeft: "7px",
                        marginRight: "7px"
                    }}
                    onClick={() => navBarNavigation(buttonPath)}
                >
                    {currentButtonKey}
                </Button>
            )

        })

    };

    return(

        <div className="navBarContainer">

            {renderButtons()}

        </div>

    );

};

export default NavBar;