const express = require('express');
const adminRoutes = require('./admin/adminRoutes');
const accountRoutes = require('./user/accountRoutes');

const router = express.Router();

/**
   * @api {get} / Server Status
   * @apiVersion 1.0.0
   * @apiName checkStatus
   * @apiDescription Check server status
   * @apiGroup General
   *
   * @apiSuccess {String} status URL of the report
   */
router.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

router.use('/admin', adminRoutes);

router.use('/account', accountRoutes);

router.use('/docs', express.static('docs'));

module.exports = router;
