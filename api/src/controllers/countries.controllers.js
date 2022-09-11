const axios = require('axios');
const getCountries = async (req, res) => {
  const countries = await axios.get('https://restcountries.com/v3.1/all');
  res.json(countries.data);
}

const getCountriesByName = async (req, res) => {
  const { name } = req.query;
  const countries = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  res.json(countries.data);
}

const getCountriesByCode = async (req, res) => {
  const { code } = req.params;
  const countries = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
  res.json(countries.data);
}

module.exports = {
  getCountries,
  getCountriesByName,
  getCountriesByCode,
};