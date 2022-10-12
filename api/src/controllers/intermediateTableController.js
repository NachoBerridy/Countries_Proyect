const { conn } = require('../db.js')
const { Country, Activity } = conn.models

const deleteActivityFromCountry = async (req, res) => {

    const { id } = req.body
    const { countryId } = req.body
    try {
        const activity = await Activity.findByPk(id)
        const country = await Country.findByPk(countryId)
        await country.removeActivity(activity)
        res.json(`${activity.name} deleted from ${country.name}`)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    deleteActivityFromCountry
}

