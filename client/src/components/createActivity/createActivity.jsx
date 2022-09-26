import React from "react"
import { useDispatch, useSelector } from "react-redux" 
import { createActivity } from "../../redux/actions"
import Select from 'react-select'
import style from './createActivity.module.css'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import home from '../../assets/homeButton.svg'

export default function CreateActivity() {
  

  let dispatch = useDispatch()
  let countriesList = useSelector(state => state.countries)
  let [submit, setSubmit] = React.useState(true)
  let [errors, setErrors] = React.useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: "",
    image: ""
  }) 

  const [defaultImage, setDefaultImage] = React.useState("https://images.unsplash.com/photo-1523867904486-8153c8afb94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NDA3MzkxNQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080")

  let [input, setInput] = React.useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    image: "",
    countries: [],
  })
  
  const [seasonOptions, setSeasonOptions] = React.useState(['summer', 'winter', 'autumn', 'spring']) 
  
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

  let handleSelect = (e) => {
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
    console.log("🚀 ~ file: createActivity.jsx ~ line 16 ~ CreateActivity ~ input", JSON.stringify(input))
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


  
  const validate = (input) => {
    let err = {}
    if (!input.name || input.name.length < 3) {
      err.name = "Name must have at least 3 characters"
    }
    if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
      err.difficulty = "Difficulty must be between 1 and 5"
    }
    if (!input.duration || input.duration < 1 || input.duration > 24) {
      err.duration = "Duration must be between 1 and 24"
    }
    if (!input.countries) {
      err.countries = "You must select at least one country"
    }
    if ( err=== {} ) {
      setSubmit(true)
    }else {
      setSubmit(false)
    }
    return err
  }

  useEffect(() => {
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
                onChange={(e) => handleSelect(e)}
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
            <input type="submit" disabled = {submit} value= 'Create Activity'/>
          </div>
        </form>
        
      </div>
    </div>
  )
}