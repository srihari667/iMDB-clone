const express = require('express')
const { ReadActor, CreateActor } = require('../controllers/actorControllers')
const { protectProducer } = require('../middlewares/authmiddlewareProducer')
const Routes = express.Router()
Routes.route('/getall').get(ReadActor)
Routes.route('/createActor').post(protectProducer, CreateActor)

module.exports = Routes
