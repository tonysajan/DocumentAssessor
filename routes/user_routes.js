const express = require("express")
const router = express.Router()
const controllerUser = require('../controller/user_controller')

//=======================
//     GET  R O U T E S  To 
//=======================

router.get('/', controllerUser.getLoginPage)

router.get('/dashboard' , controllerUser.getDashboardPage)

router.get('/document' , controllerUser.getAssessmentPage)

router.get('/register' , controllerUser.getRegisterationPage)

router.get('/form' , controllerUser.getFormPage)

router.get('/form2' , controllerUser.getFormPage2)

router.get('/logout',  controllerUser.logoutUser)


//=======================
//     POST  R O U T E S
//=======================

router.post('/login', controllerUser.loginUser)

router.post('/register',  controllerUser.registerUser)


module.exports = router