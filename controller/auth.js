const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next) => { 
  try {
    const token = req.cookies.token
      
       if(!token){
          return res.status(401).json("No token found");
       }
    var payload
    payload = jwt.verify(token, process.env.JWT_SECRET)
    const username = payload.username
    const user = await Task.findOne({ username }).lean();
    req.body = user;
    next();

      }catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json("Invalid token");
    }
    return res.status(400).json(e);
  }
}
  
  module.exports = {verifyToken}