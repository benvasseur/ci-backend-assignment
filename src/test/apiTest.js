/* eslint-disable no-undef, global-require, import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const user = require('../models/user');

const { expect } = chai;
chai.use(chaiHttp);

describe('Server status', () => {
  it('Check server status', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equals('OK');
        done();
      });
  });
});

describe('Admin API', () => {
  it('Get list of users', (done) => {
    chai
      .request(app)
      .get('/admin/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array');
        done();
      });
  });
});

describe('Account API', () => {
  const signupData = {
    username: 'testUsername',
    password: '123456',
  };

  let token = '';

  after(async () => {
    // Remove user test from database
    await user.removeByUsername(signupData.username);
  });

  it('Signup users', (done) => {
    chai
      .request(app)
      .post('/account/signup')
      .send(signupData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equals('Thanks for signing up!');
        done();
      });
  });

  it('Block user to register if username is already taken', (done) => {
    chai
      .request(app)
      .post('/account/signup')
      .send(signupData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equals('Username is already taken');
        done();
      });
  });

  it('Login users', (done) => {
    chai
      .request(app)
      .post('/account/login')
      .send(signupData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        token = res.body.token;
        done();
      });
  });

  it('Block user login if incorrect password', (done) => {
    chai
      .request(app)
      .post('/account/login')
      .send({
        username: signupData.username,
        password: 'wrongPassword',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equals('Incorrect password');
        done();
      });
  });

  it('Retrieve user data from token', (done) => {
    chai
      .request(app)
      .get('/account/profile')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equals(`You are logged in as ${signupData.username}`);
        done();
      });
  });
});
