const express = require('express')
const routes = express()
const ProfileController = require('./controllers/ProfileController')
const JobContoller = require('./controllers/jobController')
const DashboardController = require('./controllers/DashboardController')
const Profile = require('./model/Profile')

routes.get('/', DashboardController.index)
routes.get('/job', JobContoller.create)
routes.get('/job/:id', JobContoller.show)
routes.get('/profile', ProfileController.index)

routes.post('/job', JobContoller.save)
routes.post('/job/:id', JobContoller.update)
routes.post('/profile', ProfileController.update)

//Detetando
routes.post('/job/delete/:id', JobContoller.delete)

module.exports = routes