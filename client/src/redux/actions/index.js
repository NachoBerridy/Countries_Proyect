import {GET_COUNTRIES, POST_ACTIVITIES, FILTER_COUNTRIES_BY_ACTIVITY, FILTER_COUNTRIES_BY_CONTINENT, SORT_COUNTRIES, GET_ACTIVITIES} from './types.js'
import axios from "axios"

export function getCountries(){
  return async function (dispatch){
    const response = await axios.get('http://localhost:3001/countries')
    return dispatch({
      type: GET_COUNTRIES,
      payload: response.data
    })
  }
}

export function getActivities (){
  return async function (dispatch){
  const response = await axios.get('http://localhost:3001/activities')
  return dispatch({
    type: GET_ACTIVITIES,
    payload: response.data
  })
}}

export function sortCountries(payload){
  return {
    type: SORT_COUNTRIES,
    payload
  }
}

export function filterCountriesByActivity(payload){
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload
  }
}
export function filterCountriesByContinent(payload){
  return {
    type: FILTER_COUNTRIES_BY_CONTINENT,
    payload
  }
}

export function createActivity(activity){
    
  let newActivity = {
    name: activity.name,
    difficulty: activity.difficulty,
    duration: activity.duration,
    season: activity.season,
    countryId: activity.countries
  } 

  return async function (dispatch){
      
    const response = await axios.post('http://localhost:3001/Activity', newActivity)
    return dispatch({
        type: POST_ACTIVITIES,
        payload: response.data
    })
  }
}