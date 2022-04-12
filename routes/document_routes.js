const express = require("express")
const router = express.Router()
const documentDashboard = require('../controller/document_controller')

router.get('/document/:id', documentDashboard.getDocumentsById)

router.patch('/documentStatusCompleted/:id', documentDashboard.changeDocumentStatusToCompletetd)



module.exports = router