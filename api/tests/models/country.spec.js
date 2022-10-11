const { Country, conn } = require('../../src/db.js')
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
  /* describe('Methods', () => {
    beforeEach(() => Country.sync({ force: true }))
    describe('getCountry', () => {
      it('should return a country', async () => {
        await Country.create({ name: 'Argentina' })
        const country = await Country.getCountry('Argentina')
        expect(country.name).to.equal('Argentina')
      })
    })
  }) */
})

/* describe('Country models 1', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }
    )) */

