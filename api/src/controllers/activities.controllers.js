const axios = require('axios')
const { conn } = require('../db.js')
const { Country, Activity } = conn.models

const postActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countryId } = req.body;
        const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        })
        //cargar la actividad en el pais
        const countries = await countryId.map(c => {
            return Country.findByPk(c)
        })
        await Promise.all(countries).then(c => {
            c.forEach(country => {
                country.addActivity(newActivity)
            })
        })
        res.json(newActivity)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    postActivity
}

