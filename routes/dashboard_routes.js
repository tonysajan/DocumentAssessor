const express = require("express")
const router = express.Router()
const controllerDashboard = require('../controller/dashboard_controller')


router.get('/DashboardAPI',  controllerDashboard.getDashboard)


router.get('/getTaskStatus/:id', controllerDashboard.getTaskStatus)


router.patch('/TaskStatusOnSignUp/:id',  controllerDashboard.changeStatusToInprogress)


router.patch('/TaskStatusCompleted/:id', controllerDashboard.changeTaskStatusToCompletetd)


module.exports = router