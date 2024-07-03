const express = require('express');
const routes = express.Router();
const {verifyAccessToken} = require ('../helpers/jwtHelper')

const authController = require('../controller/authController');


  routes.post('/registerUser',authController.registerUser)

  routes.post('/loginUser',verifyAccessToken,authController.loginUser)


module.exports = routes;