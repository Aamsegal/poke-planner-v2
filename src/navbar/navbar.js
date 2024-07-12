/* ---React Imports--- */
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

/* ---MUI Imports--- */
import Button from '@mui/material/Button';

import "./navbar.css"

function NavBar(props) {

    const [burgerMenuStatus, setBurgerMenuStatus] = useState(false)

    //testing commit for contributions overview on github

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
                        marginRight: "7px",
                        marginTop: "3px",
                        marginBottom: "3px"
                    }}
                    onClick={() => navBarNavigation(buttonPath)}
                >
                    {currentButtonKey}
                </Button>
            )

        })

    };

    const showHideDropdown = (dropDownChoice) => {

        const updatedState = !burgerMenuStatus;

        setBurgerMenuStatus(prevState => !prevState);

        let navBarButtonContainerElements = document.getElementById("navBarButtonContainer");
        
        if(updatedState === false) {

            navBarButtonContainerElements.style.display = "none";

        }else{

            navBarButtonContainerElements.style.display = "flex";

        }

        

    };

    return(

        <div className="navBarContainer">

            <div className="navBarButtonContainer" id="navBarButtonContainer">

                {renderButtons()}

            </div>

            <div className="burgerButton">

                <Button onClick={() => showHideDropdown("press")}>X</Button>

            </div>

        </div>

    );

};

export default NavBar;