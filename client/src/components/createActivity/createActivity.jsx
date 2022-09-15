import React from "react";

export default function CreateActivity() {
    let [input, setInput] = React.useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countries: [],
    });

    let handleChange = (e) => {
      e.preventDefault()

      setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    let handleSubmit = (e) => {
      e.preventDefault();
      console.log(input);
    };
    

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
          <input
            type="text"
            name="countries"
            id="countries"
            value={input.countries}
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value= 'Create Activity'/>
        </form>

      </React.Fragment>
    );
    }
