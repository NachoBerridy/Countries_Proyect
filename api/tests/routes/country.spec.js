/* eslint-disable import/no-extraneous-dependencies */
/* const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  it ('should get 404 if the country does not exist', () => {
    agent.get('/countries/dasdas').expect(404)
  });

  it ('should get 200 if the country exists', () => {
    agent.get('/countries/Argentina').expect(200)
  });
  it('should get 200', () =>
      agent.get('/countries/?code=ARG').expect(200)
  )
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
}); */
