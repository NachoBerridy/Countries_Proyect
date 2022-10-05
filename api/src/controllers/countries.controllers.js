const axios = require('axios')
const { conn } = require('../db.js')
const { Country, Activity } = conn.models

const getCountries = async () => {
  try{
    const apiRequest = await axios.get('https://restcountries.com/v3.1/all')
    const countries = apiRequest.data.map(c => {
      let {cca3, name, flags, continents, capital = ['No capital'], subregion, area, population } = c
      
      name = name.common.split(" ").join("_");
      try{
        name = name.replace('(','')
        name = name.replace(')','')
      }catch{}
      for (let i = 1; i < name.length; i++) {
        if (name[i] === "_") {
          name = name.slice(0, i + 1) + name[i + 1].toUpperCase() + name.slice(i + 2)
        }  
      }
      return {
        id: cca3,
        name: name,
        flag: flags.svg,
        continent: continents[0],
        capital: capital[0],
        subregion: subregion,
        area: area,
        population: population, 
      }
    })
    await Country.bulkCreate(countries, {ignoreDuplicates: true})
    // res.json(countries)
    let resp = await Country.findAll(
      {
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'duration', 'season','image']
        },
        attributes: ['id', 'name', 'flag', 'continent', 'population', 'capital', 'subregion', 'area']
      }

    )
    resp = resp.map(c => {
      name = c.name.split("_").join(" ");
      return {
        id: c.id,
        name: name,
        flag: c.flag,
        continent: c.continent,
        population: c.population,
        capital: c.capital,
        subregion: c.subregion,
        area: c.area,
        activities: c.activities.map(a => {
          return {
            name: a.name
          }
        })
      }
    })
    return resp
  }
  catch (error) {
    // res.status(500).json(error)
    return error
  }
  
}

const getCountriesByName = async (req, res) => {
  let { name } = req.params
  name = name.split(" ").join("_");
  name = name.toLowerCase()
  name = name.charAt(0).toUpperCase() + name.slice(1)
  for (let i = 1; i < name.length; i++) {
    if (name[i] === "_") {
      name = name.slice(0, i + 1) + name[i + 1].toUpperCase() + name.slice(i + 2)
    }  
  }
  try {
    
    let country = await Country.findAll(
      
      {
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'duration', 'season', 'image']
        },
        where: {
          name: name
        },
        // logging: console.log
      }
    )
    country = country.map(c => {
      name = c.name.split("_").join(" ");
      return {
        id: c.id,
        name: name,
        flag: c.flag,
        continent: c.continent,
        population: c.population,
        capital: c.capital,
        subregion: c.subregion,
        area: c.area,
        activities: c.activities
      }
    })
    if (country.length){
      res.json(country)
    }else{
      res.status(404).json({error: 'Country not found'})
    }
  } catch (error) {
    res.json(error)
  }
}

const getCountriesByCode = async (code) => {
 
  const ID = code.toUpperCase()
  try {
    let country = await Country.findByPk(ID)
    //return country
    if (country){
      return country
    }else{
      return {error: 'Country not found'}
    }
  } catch (error) {
    return error
  }
}




module.exports = {
  getCountries,
  getCountriesByName,
  getCountriesByCode,
}