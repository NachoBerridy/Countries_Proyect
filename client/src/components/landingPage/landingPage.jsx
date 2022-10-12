import React from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import style from './landingPage.module.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    dispatch(getCountries());
    return (
        <div className={style.div}>
            <Link to= '/Home' className={style.Link}>
                HOME
            </Link>
        </div>
    );
}

export default LandingPage;