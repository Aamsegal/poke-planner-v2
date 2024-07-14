/* ---React Imports--- */
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

/* ---MUI Imports--- */
import Button from '@mui/material/Button';

import "./navbar.css"

function NavBar(props) {

    const [isNavBarVisible, setIsNavBarVisible] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    const [burgerMenuStatus, setBurgerMenuStatus] = useState(false);

    

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

    const showHideDropdown = () => {

        /* toggles true or false */
        setIsNavBarVisible(!isNavBarVisible);

    };

    const checkIfMobile = () => {

        const windowWidth = window.innerWidth;

        /* we set navbar to be visible if we see that the width is larger than 600px */
        if(windowWidth > 600) {
            setIsNavBarVisible(true);
        };

    };

    useEffect(() => {

        const debounceDurationChecker = 25;

        /* creates a timer every time use effect is changed */
        /* if timer between calls is greater than 25 ms then it runs the function in it */
        let debounceTimer;
        const debounceResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                checkIfMobile()
            },debounceDurationChecker)
        };

        window.addEventListener("resize", debounceResize);

    },[])

    return(

        <div className="navBarContainer">

            <div className={`navBarButtonContainer ${isNavBarVisible ? "displayedNavBarButton" : "hiddenNavbarButton"}`} id="navBarButtonContainer">

                {renderButtons()}

            </div>

            <div className="burgerButton">

                <Button
                    onClick={() => showHideDropdown("press")}
                    variant="contained"
                    size="small"
                >
                    X
                </Button>

            </div>

        </div>

    );

};

export default NavBar;