import React from "react"
import { useDispatch, useSelector } from "react-redux" 
import { createActivity } from "../../redux/actions"
import Select from 'react-select'
import style from './createActivity.module.css'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import home from './homeButton.svg'

export default function CreateActivity() {
  

  let dispatch = useDispatch()
  let countriesList = useSelector(state => state.countries)
  let [submit, setSubmit] = React.useState(true)
  let [errors, setErrors] = React.useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: ""
  }) 

  
  let [input, setInput] = React.useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  })
  
 
  
  let handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
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

    let handleSubmit = (e) => {
      e.preventDefault()
      console.log("🚀 ~ file: createActivity.jsx ~ line 16 ~ CreateActivity ~ input", JSON.stringify(input))
      dispatch(createActivity(input))
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
        <form onSubmit={e => handleSubmit(e)} className={style.form}>
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
          <Select className={style.select} placeholder='Season'>

            {['summer', 'winter', 'autumn', 'spring'].map((season) => {
              return <option value={season}>{season}</option>
            })}
          </Select>
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
          <input type="submit" disabled = {submit} value= 'Create Activity'/>
        </form>
      </div>
    </div>
  )
}