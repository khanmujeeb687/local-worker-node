const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');


router.get('/api/:city', userController.getUserCategories);

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.get('/skills', userController.skills);

router.post('/search/:query', userController.search);

router.get('/details',[checkAuth], userController.getLoggedInUserDetails);

router.get('/:category/:city', userController.getCategory);

router.patch('/',[checkAuth],userController.updateUser);



module.exports = router;