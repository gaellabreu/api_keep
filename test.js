const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const {app} = require('./index')

const request = supertest(app);

describe('GET /note/all', () => {
    it('should return an array of notes', (done) => {
      request.get('/note/all')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          // Write your assertions here
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
  
          done();
        });
    });
  });
  