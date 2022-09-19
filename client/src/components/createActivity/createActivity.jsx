import React from "react"
import { useDispatch, useSelector } from "react-redux" 
import { createActivity } from "../../redux/actions"
import Select from 'react-select'

export default function CreateActivity() {
    
  let dispatch = useDispatch()
  let countriesList = useSelector(state => state.countries)
  /* const options = countriesList.map((country) => {
    return {value: country.id, label: country.name}
  }) */


  let [input, setInput] = React.useState({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: [],
  })
  
  let handleChange = (e) => {
    e.preventDefault()
    
    setInput((prev) => ({
      ...prev,
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


  return (
    <React.Fragment>
      
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="difficulty">Difficulty</label>
        <input
          type="number"
          name="difficulty"
          id="difficulty"
          value={input.difficulty}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          id="duration"
          value={input.duration}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="season">Season</label>
        <input
          type="text"
          name="season"
          id="season"
          value={input.season}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="countries">Countries</label>
        

        <Select 
          isMulti
          options={
            countriesList.map((country) => {
              return {value: country.id, label: country.name}
            }
          )}
          onChange={(e) => handleSelect(e)}
        />
        
        <input type="submit" value= 'Create Activity'/>
      </form>

    </React.Fragment>
  )
}