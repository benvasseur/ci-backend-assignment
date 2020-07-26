const express = require('express');
const user = require('../../models/user');

const router = express.Router();

/**
   * @api {get} /admin/users List of users
   * @apiVersion 1.0.0
   * @apiName usersList
   * @apiDescription Get a list of all users
   * @apiGroup Admin
   *
   * @apiSuccess {Object[]} users List of users
   */
router.route('/users').get(async (req, res) => {
  try {
    const users = await user.getAll();
    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
