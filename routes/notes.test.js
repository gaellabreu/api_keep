const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

const redis = require('redis');
const redisClient = redis.createClient();

const uuid = require('uuid');

describe('Note Endpoints', () => {
  let redisClientStub;

  beforeEach(() => {
    redisClientStub = sinon.stub(redisClient, 'command');
  });

  afterEach(() => {
    redisClientStub.restore();
  });

  it('should add a note with expiry time', (done) => {
    const note = 'Test note';
    const time = 60;

    redisClientStub.withArgs('SETEX', sinon.match.any, sinon.match.any, sinon.match.any).yields(null, 'OK');

    request
      .post('/note/addnote')
      .send({ note, time })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.equal('Value added');

        done();
      });
  });

  it('should add a note without expiry time', (done) => {
    const note = 'Test note';

    redisClientStub.withArgs('SET', sinon.match.any, sinon.match.any).yields(null, 'OK');

    request
      .post('/note/addnote')
      .send({ note })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.equal('Value added');

        done();
      });
  });

  it('should get the timer value', (done) => {
    const timerValue = 10;

    redisClientStub.withArgs('GET', sinon.match.any).yields(null, timerValue.toString());

    request
      .get('/note/gettimer')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.equal(timerValue);

        done();
      });
  });

  it('should increase the timer value', (done) => {
    const timerValue = 10;

    redisClientStub.withArgs('GET', sinon.match.any).yields(null, timerValue.toString());
    redisClientStub.withArgs('SET', sinon.match.any, sinon.match.any).yields(null, 'OK');
    redisClientStub.withArgs('INCR', sinon.match.any).yields(null, timerValue + 1);

    request
      .post('/note/increasetimer')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.equal('timer increased');

        done();
      });
  });

  it('should decrease the timer value', (done) => {
    const timerValue = 10;

    redisClientStub.withArgs('GET', sinon.match.any).yields(null, timerValue.toString());
    redisClientStub.withArgs('SET', sinon.match.any, sinon.match.any).yields(null, 'OK');
    redisClientStub.withArgs('DECR', sinon.match.any).yields(null, timerValue - 1);

    request
      .post('/note/decreasetimer')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.equal('timer decreased');

        done();
      });
  });
});
