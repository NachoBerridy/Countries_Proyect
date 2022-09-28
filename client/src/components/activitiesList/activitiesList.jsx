import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteActivity } from "../../redux/actions";

const ActivitiesList = () => {
    const activities = useSelector((state) => state.activities)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        console.log(e.target.value)
        dispatch(deleteActivity(e.target.value))
    }
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
                            <input type="button" name="delte" id="1" value={a.id} onClick={handleClick} />
                        </div>
                    )
                
                }
            </div>
        </div>
    )
}

export default ActivitiesList