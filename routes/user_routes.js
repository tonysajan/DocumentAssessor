const express = require("express")
const router = express.Router()
const controllerUser = require('../controller/user_controller')
const auth = require('../controller/auth');

router.get('/', controllerUser.getLoginPage)

router.get('/dashboard' , controllerUser.getDashboardPage)

router.get('/document' , controllerUser.getAssessmentPage)

router.get('/register' , controllerUser.getRegisterationPage)

router.post('/login', controllerUser.loginUser)

router.post('/register',  controllerUser.registerUser)

router.get('/form' , controllerUser.getFormPage)

router.get('/form2' , controllerUser.getFormPage2)

router.get('/logout',  controllerUser.logoutUser)


module.exports = router