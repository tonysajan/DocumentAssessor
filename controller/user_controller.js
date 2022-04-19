const user = require("../model/user")
const bcrypt = require('bcryptjs')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken') 
const emailvalidator = require("email-validator")
const passwordValidator = require('password-validator')


const getLoginPage = (req, res)=> {
    res.render('login')
  }

const getDashboardPage =  (req, res) => {
    res.render('index.html')
  }

const getRegisterationPage =  (req, res) => {
    res.render('registration.html')
  }

  const getAssessmentPage =  (req, res) => {
    res.render('document.html')
  }

  const getFormPage =  (req, res) => {
    res.render('form.html')
  }

  const getFormPage2 =  (req, res) => {
    res.render('form2.html')
  }

const loginUser = async (req, res) => {
    const {username , password } = req.body
    const jwtExpirySeconds = 3600
    
    const db_user = await user.findOne({username}).lean()

    if (!db_user) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

    if(await bcrypt.compare(password, db_user.password)){

        const jwt_token = jwt.sign(
            {
                id : db_user._id,
                username : db_user.username
            }, process.env.JWT_SECRET,{ expiresIn: 3600 }
        )  
         res.cookie("token", jwt_token, { maxAge: jwtExpirySeconds * 1000 }) 
         res.json({ status: 'ok', data: jwt_token })
         
    }
    
    //res.json({ status: 'error', error: 'Invalid username or password' })
}

const registerUser = async (req, res) => {
    const { username, password : plainTextPassword} = req.body

    if(!emailvalidator.validate(req.body.username)){
        return res.json({ status: 'error', error: 'Invalid username' })
    } 

	const password_schema = new passwordValidator();

    password_schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()             

	if (!password_schema.validate(plainTextPassword)) {
        return res.json({
			status: 'error',
			error: 'Password must contain minimum 8 characters, an uppercase letter and atleast 1 digit'
		})
	}

    const new_password = await bcrypt.hash(plainTextPassword, 10)

    try{
        const new_User = await user.create({
            username :req.body.username,
            password : new_password
        })
        res.json({ status : 'ok', user : new_User })
       
    }catch(error){
        if (error.code === 11000) {
			// duplicate key
            return res.json({ status: 'error', error: 'Email id already exists' })
		}
		throw error
	}
    
}


const logoutUser = (req, res) => {
  try{
    const token = req.cookies.token
    if(!token)
      return res.json({ status: 'error', error:  "user not logged in"})
    res.clearCookie('token');
     res.status(200).json({status: "ok"});
    }
  catch(err){
    return res.json({ status: 'error', error: err })
  }
}


  module.exports = {getLoginPage, getRegisterationPage, getDashboardPage, 
    loginUser, registerUser,getAssessmentPage,getFormPage,getFormPage2, logoutUser}
