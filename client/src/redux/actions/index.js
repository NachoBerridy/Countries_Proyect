import {GET_COUNTRIES, 
        POST_ACTIVITIES, 
        FILTER_COUNTRIES_BY_ACTIVITY, 
        FILTER_COUNTRIES_BY_CONTINENT, 
        SORT_COUNTRIES, GET_ACTIVITIES, 
        REMOVE_FILTER,
        SEARCH_COUNTRY,
        DELETE_ACTIVITY} from './types.js'
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

export function searchCountry(payload){
  return {
    type: SEARCH_COUNTRY,
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

export function removeFilter(payload){
  return {
    type: REMOVE_FILTER,
    payload
  }
}

export function createActivity(activity){
  console.log(activity.image)
  let newActivity = {
    name: activity.name,
    difficulty: activity.difficulty,
    duration: activity.duration,
    season: activity.season,
    countryId: activity.countries,
    image: activity.image
  } 

  return async function (dispatch){
      
    const response = await axios.post('http://localhost:3001/Activity', newActivity)
    return dispatch({
        type: POST_ACTIVITIES,
        payload: response.data
    })
  }
}

export function deleteActivity(id){
  return async function (dispatch){
    const response = await axios.delete(`http://localhost:3001/Activity/delete/${id}`)
    return dispatch({
      type: DELETE_ACTIVITY,
      payload: response.data
    })
  }
}