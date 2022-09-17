import React from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/actions/index.js";
import { useSelector, useDispatch } from "react-redux";

const LandingPage = () => {
    const dispatch = useDispatch();
    dispatch(getCountries());
    return (
        <div>
            <Link to= '/Home'>Home</Link>
        </div>
    );
}

export default LandingPage;