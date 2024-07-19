/* ---React Imports--- */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ---MUI Imports--- */
import Button from '@mui/material/Button';

import "./navbar.css"

function NavBar(props) {

    const refDiv = useRef(null);

    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    const [burgerMenuStatus, setBurgerMenuStatus] = useState(false);

    const buttonStyle = {
        marginLeft: "7px",
        marginRight: "7px",
        marginTop: "3px",
        marginBottom: "3px"
    };

    //testing commit for contributions overview on github

    const navigate = useNavigate(); //allows sending to other routes through functions

    /* allows navigation to different routes though parameters */
    const navBarNavigation = (path) => {

        navigate(path);
        setIsNavBarVisible(false)

    };

    /* goes through keys of path prop to render buttons and their code */
    const renderButtons = () => {

        const buttonInfoObject = props.pathInfo;

        return Object.keys(buttonInfoObject).map((currentButtonKey) => {

            const buttonPath = buttonInfoObject[currentButtonKey]

            return (
                <Button
                    key={`${buttonPath}_Key`}
                    variant="contained"
                    size="small"
                    sx={buttonStyle}
                    onClick={() => navBarNavigation(buttonPath)}
                >
                    {currentButtonKey}
                </Button>
            )

        })

    };

    const showHideDropdown = () => {

        /* toggles true or false */
        setIsNavBarVisible((isNavBarVisible) => !isNavBarVisible);

    };

    const checkIfMobile = () => {

        const windowWidth = window.innerWidth;

        /* we set navbar to be visible if we see that the width is larger than 600px */
        if(windowWidth > 450) {

            setIsNavBarVisible(true);

        }else{

            setIsNavBarVisible(false);

        }

    };

    useEffect(() => {

        const updateHeight = () => {
            if (refDiv.current) {
                props.setHeight(refDiv.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        const debounceDurationChecker = 0;

        /* creates a timer every time use effect is changed */
        /* if timer between calls is greater than 25 ms then it runs the function in it */
        let debounceTimer;
        const debounceResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                checkIfMobile()
            }, debounceDurationChecker)
        };

        window.addEventListener("resize", debounceResize);

    }, [props.setHeight])

    return(

        <nav ref={refDiv} className="navBarContainer" id="navBarContainer">

            <div className="pokePlannerTitleContainer navBarElement">
                <h1 className="pokePlannerTitleHeader">Poke-Planner</h1>
            </div>

            <div className="burgerButton navBarElement">

                <Button
                    className="navBarToggleButton"
                    onClick={() => showHideDropdown()}
                    variant="contained"
                    size="small"
                    sx={buttonStyle}
                >
                    X
                </Button>

            </div>

            <div className={`navBarButtonContainer ${isNavBarVisible ? "isOpen" : ""} navBarElement`} id="navBarButtonContainer">

                {renderButtons()}

            </div>

            

        </nav>

    );

};

export default NavBar;