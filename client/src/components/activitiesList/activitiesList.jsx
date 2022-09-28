import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteActivity } from "../../redux/actions";
import style from './activitiesList.module.css'

const ActivitiesList = () => {
    const activities = useSelector((state) => state.activities)
    const dispatch = useDispatch()
    const handleClick = (e) => {

        dispatch(deleteActivity(e))
    }
    return (
        <div className={style.container}>
            <h1>Activities</h1>
            <div className={style.List}>
                {
                    activities.map(a => 
                        <div className={style.card}>
                            <h3>{a.name}</h3>
                            <img src={a.image} alt="actImage" />
                            <ul>
                                {
                                    a.countries.map(c =>
                                        <li>{c.name} <img src={c.flag} alt="flag"/></li>
                                    )
                                }
                            </ul>
                            <input type="button" name="delte" id="1" value='Delete Activity' onClick={() => handleClick(a.id)} />
                        </div>
                    )
                
                }
            </div>
        </div>
    )
}

export default ActivitiesList