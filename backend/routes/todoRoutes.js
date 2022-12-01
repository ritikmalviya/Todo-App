const express = require('express');
const router = express.Router();

const {home} = require('../controller/todoController')


router.get('/',home)
router.get('/getTodos')

module.exports = router;