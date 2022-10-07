const { conn } = require('../db.js')
const { Country, Activity } = conn.models

const postActivity = async (req, res) => {   
    try {
        //Desestruro el body de la request
        const { name, difficulty, duration, season, image, countryId } = req.body;
        //Creo la actividad
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            image,
        })
        //Busco los paises que deben enlaazarse con la actividad
        const countries = await countryId.map(c => {
            return Country.findByPk(c)
        })
        //Enlazo los paises con la actividad
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

const updateActivity = async (req, res) => {
    const { name } = req.params
    try {
        const activity = await Activity.findOne({
            where: {
                name
            }
        })
        const { difficulty, duration, season, image, countryId } = req.body
        await activity.update({
            difficulty,
            duration,
            season,
            image
        })
        const countries = await countryId.map(c => {
            return Country.findByPk(c)
        })
        await Promise.all(countries).then(c => {
            c.forEach(country => {
                country.addActivity(activity)
            })
        })
        res.json(activity)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteActivity =  (req, res) => {
    //
    const { id } = req.params
    Activity.findByPk(id)
    .then (activity => {activity.destroy()})
    .then (activity => res.json(activity))
    .catch (error => res.status(500).json(error))
} 

/* const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params
        const activity = await Activity.findByPk(id)
        await activity.destroy()
        res.json(activity)
    } catch (error) {
        res.status(500).json(error)
    }
}  */

const getActivities = async (req, res) => {
    try {
        const resp = await Activity.findAll(
            {
                include: {
                    model: Country,
                }
            }
        )
        const activities = resp.map(a => {
            return {
                id: a.Id,
                name: a.name,
                difficulty: a.difficulty,
                duration: a.duration,
                season: a.season,
                image: a.image,
                countries: a.countries
            }
        })
        res.json(activities)
    } catch (error) {
        res.status(500).json(error)
    }
}


/* const getActivities = (req, res) => {
    Activity.findAll(
        {
            include: {
                model: Country,
            }
        }
    )
    .then (
        resp => {
            const activities = resp.map(a => {
                return {
                    id: a.Id,
                    name: a.name,
                    difficulty: a.difficulty,
                    duration: a.duration,
                    season: a.season,
                    image: a.image,
                    countries: a.countries
                }
            })
            res.json(activities)
        }
    ).catch (error => res.status(500).json(error))
}  */

module.exports = {
    postActivity,
    getActivities,
    deleteActivity,
    updateActivity
}

