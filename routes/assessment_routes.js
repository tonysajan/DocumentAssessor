const express = require("express")
const router = express.Router()
const controllerAssessment = require('../controller/assessment_controller')


router.get('/assessment-form/:id',  controllerAssessment.getAssessmentData)


router.post('/assessment-form/:id', controllerAssessment.submitAssessment)




module.exports = router