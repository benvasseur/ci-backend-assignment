const express = require('express');
const passport = require('passport');
const user = require('../../models/user');

const router = express.Router();

/**
   * @api {get} /account/signup Sign up user
   * @apiVersion 1.0.0
   * @apiName signup
   * @apiDescription Create a user account
   * @apiGroup Account
   *
   * @apiSuccess {String} message Welcome message
   */
router.route('/signup').post(async (req, res) => {
  try {
    await user.register(req.body);
    res.json({
      message: 'Thanks for signing up!',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

/**
   * @api {get} /account/login Login user
   * @apiVersion 1.0.0
   * @apiName login
   * @apiDescription Login a user
   * @apiGroup Account
   *
   * @apiSuccess {String} message Welcome message
   */
router.route('/login').post(async (req, res) => {
  try {
    const token = await user.login(req.body);
    res.json({
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

/**
   * @api {get} /account/profile Get user profile
   * @apiVersion 1.0.0
   * @apiName profile
   * @apiDescription Check if user is logged in
   * @apiGroup Account
   *
   * @apiSuccess {String} message Message saying which user is logged in
   */
router.route('/profile')
  .all(passport.authenticate('jwt', { session: false, failWithError: true }))
  .get((req, res) => {
    res.json({
      message: `You are logged in as ${req.user.username}`,
    });
  });

module.exports = router;
