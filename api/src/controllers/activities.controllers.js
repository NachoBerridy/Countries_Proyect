const axios = require('axios')
const { conn } = require('../db.js')
const { Country, Activity } = conn.models

const postActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, image, countryId } = req.body;
        const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        image,
        })
        //cargar la actividad en el pais
        console.log(countryId)
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

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll(
            {
                attributes: ['name']
            }
        )
        res.json(activities)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    postActivity,
    getActivities
}

