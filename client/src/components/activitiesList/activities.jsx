import React from "react";
import { useSelector } from "react-redux";

const ActivitiesList = () => {
    const activities = useSelector((state) => state.activities)
    return (
        <div>
            <h1>Activities</h1>
            <div>
                {
                    activities.map(a => 
                        <div>
                            <h3>{a.name}</h3>
                            <img src={a.image} alt="actImage" />
                            <ul>
                                {
                                    a.countries.map(c =>
                                        <li>{c.name} <img src={c.flag} alt="flag"/></li>
                                    )
                                }
                            </ul>
                            <button>Delete</button>
                        </div>
                    )
                
                }
            </div>
        </div>
    )
}

export default ActivitiesList