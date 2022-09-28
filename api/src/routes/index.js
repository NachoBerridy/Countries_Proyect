const { Router } = require('express')
const { getCountries, getCountriesByName, getCountriesByCode } = require('../controllers/countries.controllers.js')
const { postActivity, getActivities, deleteActivity } = require('../controllers/activities.controllers.js')

const router = Router()

router.get('/countries', async (req, res) =>{
    try {
        if (!req.query.code){
            let countries = await getCountries()
            res.json(countries)  
        }else{
            let { code } = req.query;
            let country = await getCountriesByCode(code);
            res.json(country)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.get('/countries/:name', getCountriesByName)
router.post('/Activity', postActivity)
router.get('/Activities', getActivities)
router.delete('/Activity/delete/:id', deleteActivity)
router.get('*', (req, res) =>{
    res.status(404).json({error: 'Page not found'})
})
module.exports = router
