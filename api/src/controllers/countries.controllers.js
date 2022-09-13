const axios = require('axios')
const { conn } = require('../db.js')
const { Country } = conn.models

const getCountries = async () => {
  try{
    const apiRequest = await axios.get('https://restcountries.com/v3.1/all')
    const countries = apiRequest.data.map(c => {
      let {cca3, name, flags, continents, capital = ['No capital'], subregion, area, population } = c
      return {
        id: cca3,
        name: name.common,
        flag: flags.svg,
        continent: continents[0],
        capital: capital[0],
        subregion: subregion,
        area: area,
        population: population, 
      }
    })
    // console.log(countries)
    await Country.bulkCreate(countries, {ignoreDuplicates: true})
    // res.json(countries)
    let resp = Country.findAll(
      {
        attributes: ['name', 'flag', 'continent']
      }
    )
    return resp
  }
  catch (error) {
    // res.status(500).json(error)
    return error
  }
  
}

const getCountriesByName = async (req, res) => {
  let { name } = req.params
  name = name.toLowerCase()
  name = name.charAt(0).toUpperCase() + name.slice(1)
  try {
    let country = await Country.findAll(
      {
        where: {
          name: name
        },
        logging: console.log
      }
    )
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