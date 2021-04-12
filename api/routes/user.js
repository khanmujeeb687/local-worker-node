const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');


router.get('/api/:city', userController.getUserCategories);

router.post('/', userController.createUser);

router.post('/search/:query', userController.search);

router.get('/details',[checkAuth], userController.getLoggedInUserDetails);

router.get('/:category', userController.getCategory);

router.patch('/',[checkAuth],userController.updateUser);



module.exports = router;