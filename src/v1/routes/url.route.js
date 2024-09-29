const express = require('express');
const validate = require('../middlewares/validate.middleware');
const schemas = require('../validations/url.validation');
const urlController = require('../controllers/url.controller');

const router = express.Router();

router.post('/shorten', validate(schemas.urlValidation), urlController.createUrl);
router.get('/:short_url', urlController.redirectUrl);

module.exports = router;