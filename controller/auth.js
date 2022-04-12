const jwt = require("jsonwebtoken");


  const verifyToken = (req, res) => { 
    const token = req.cookies.token
      console.log('token : ', token)
       if(!token){
          return res.status(401).json("No token found"      }
    var payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json("You are not authenticated!");
    } 
    return res.status(400).json("Invalid token");
  }
  console.log(payload.username)
  res.status(200).json(payload.username)
}
  
  module.exports = {verifyToken}