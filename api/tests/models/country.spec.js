const { Country, Activity, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: false }))
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done())
      })
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' })
      })
    })
  }) 
  describe('Relations', () => {
    describe('Activity', () => {
      it('should have a relation with Activity', async () => {
        const country = await Country.create({ name: 'CHURUGUAY', id:'CHUR', flag: 'https://restcountries.eu/data/arg.svg', continent: 'Americas', capital: 'Buenos Aires', subregion: 'South America', area: 2780400, population: 43590400 })
        const activity = await Activity.create({ name: 'Trekking', difficulty: 3, duration: 5, season: 'Summer', countryId: ['CHUR'] })
        await country.addActivity(activity)
        const activities = await country.getActivities()
        expect(activities[0].name).to.equal('Trekking')
      })
    })
  })
})

/* describe('Country models 1', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }
    )) */

