import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./activityCard.module.css";
import { removeActivity, deleteActivity } from "../../redux/actions";
import { getCountryDetail } from "../../redux/actions";
import { useEffect } from "react";

const ActivityCard = ({ activity, countryId, country}) => {
    const dispatch = useDispatch();
    const defaultImage = useSelector(state => state.defaultActivityImage)
    const countryy = useSelector((state) => state.countryDetail);
    
    
    const removeActivityFromButton = () => {
        console.log("countryId", countryId)
        console.log("activity", activity.Id)
            // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this activity?")) {
            try{
                dispatch(removeActivity(countryId, activity.Id))
                alert(`${activity.name} removed from ${countryId} successfully`)
            }catch{
                alert("Error removing activity")
            }
        }
    }

    const deleteActivityFromButton = () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to delete this activity?")){
                try{
                    dispatch(deleteActivity(activity.Id))
                    alert(`${activity.name} deleted successfully`)
                }catch{
                    alert("Error deleting activity")
                }
            }
    }

    useEffect(() => {
        dispatch(getCountryDetail(country))
    }, [dispatch, country, countryy])

    return (
            <div className={style.activity}>
                    <h3>{activity.name}</h3>
                    <div className={style.actInfo}>
                    <p>Difficulty level: {activity.difficulty}</p>
                    <p>Duration: {activity.duration} weeks</p>
                    <p>Season: {activity.season}</p>
                </div>
                <button onClick={removeActivityFromButton}>X</button>
                <button onClick={deleteActivityFromButton}>D</button>
                {Boolean(activity.image)? 
                    <img src={activity.image} alt="Activity" width="200" />
                    :<img src={defaultImage} alt="imagen" />
                }
            </div>
    )
}

export default ActivityCard