import React from "react"
import { useDispatch, useSelector } from "react-redux" 
import { createActivity } from "../../redux/actions"
import Select from 'react-select'
import style from './createActivity.module.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import home from '../../assets/homeButton.svg'
import validate from './functions.js'

export default function CreateActivity() {
  
  const dispatch = useDispatch()
  const defaultImage = useSelector(state => state.defaultActivityImage)
  const countriesList = useSelector(state => state.countries)

  //Estados locales
  // const [defaultImage, setDefaultImage] = useState("https://images.unsplash.com/photo-1523867904486-8153c8afb94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDA3MzkxNQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080")
  const [seasonOptions, setSeasonOptions] = useState(['summer', 'winter', 'autumn', 'spring']) 
  const [submit, setSubmit] = useState(true)
  let [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    image: "",
    countries: [],
  })
  const [errors, setErrors] = useState({
    name: "Name must have at least 3 characters",
    difficulty: "Difficulty must be between 1 and 5",
    duration: "Duration must be between 1 and 24",
    season: "",
    countries: "You must select at least one country",
    image: ""
  }) 
  
  //Funciones que controlan los cambios en el formulario
  
  let handleChange = (e) => {
    
    e.preventDefault()
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      })) 
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  let handleSelectCountries = (e) => {
    setInput((prev) => ({
      ...prev,
      countries: e.map((country) => country.value)
    }))
  }

  let handleSelectSeason = (e) => {
    setInput((prev) => ({
      ...prev,
      season: e.value
    }))
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    if (input.image === "") {
      setInput((prev) => ({
        ...prev,
        image: defaultImage
      }))
    }
    dispatch(createActivity(input))
    alert("Activity created successfully!")
    setInput({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      image: "",
      countries: [],
    })
  }


  //UseEffect que controla el estado del botón submit y cuando se renderiza el componente

  useEffect(() => {
    if (errors.name || errors.difficulty || errors.duration || errors.countries) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
  }, [errors,input])

  return (
    <div className={style.container}>
      <Link to='/Home' className={style.home}>
        <img src={home} alt="home" />
      </Link>
      <div className={style.container1}>
        <form onSubmit={e => handleSubmit(e)} className={style.form} >
          <div className={style.column1}>
            <h2>Create Activity</h2>
            <input
              placeholder="Name"
              type="text"
              name="name"
              key="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name? <p>{errors.name}</p> : null}
            <input
              placeholder="Difficulty (1-5)"
              type="number"
              name="difficulty"
              key="difficulty"
              value={input.difficulty}
              onChange={(e) => handleChange(e)}
            />
            {errors.difficulty? <p>{errors.difficulty}</p> : null}
            <input
              placeholder="Duration"
              type="number"
              name="duration"
              key="duration"
              value={input.duration}
              onChange={(e) => handleChange(e)}
            />
            {errors.duration? <p>{errors.duration}</p> : null}
            <Select className={style.select} placeholder='Season'
              options ={seasonOptions.map((season) => {
                return {value: season, label: season}
              })}
              onChange={(e)=> handleSelectSeason(e)}
            />
            {errors.season? <p>{errors.season}</p> : null}
            <Select 
              className={style.select}
              isMulti
              placeholder="Select Countries"
              options={
                countriesList.map((country) => {
                  return {value: country.id, label: country.name}
                }
                )}
                onChange={(e) => handleSelectCountries(e)}
            />
            {errors.countries? <p>{errors.countries}</p> : null}
          </div>
          <div className={style.column2}>
            {input.image? <img src={input.image} alt="activity"/> : <img src={defaultImage} alt="activity"/>}
            <input
              placeholder="Image"
              name="image"
              key="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              />
            <input type="submit" disabled = {submit}  value= 'Create Activity'/>
          </div>
        </form>
        
      </div>
    </div>
  )
}