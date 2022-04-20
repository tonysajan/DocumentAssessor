const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const UserRouter = require('./routes/user_routes')
const DashboardRouter = require('./routes/dashboard_routes')
const DocumentRouter = require('./routes/document_routes')
const AssessmentRouter = require('./routes/assessment_routes')

require('dotenv').config()
const cookieParser = require('cookie-parser')

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.log(err);
  });

const app = express()

// set path for static files
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client')))

//use the router exported from user, dashboard, document, assessment
app.use(UserRouter)
app.use(DashboardRouter)
app.use(DocumentRouter)
app.use(AssessmentRouter)


//start the server
app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)

} )

