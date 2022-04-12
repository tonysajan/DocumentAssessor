const User = require("../model/user")
const Task = require("../model/task")
const jwt = require("jsonwebtoken");
const Document = require("../model/document")

 

 const getDashboard = async (req, res) => {
  try {
    const token = req.cookies.token
      //console.log('token : ', token)
       if(!token){
          return res.status(401).json("No token found");
       }
    var payload
    payload = jwt.verify(token, process.env.JWT_SECRET)
    const username = payload.username
    console.log("username: ", payload.username)
    const user = await Task.find({ username }).lean();
    
    res.status(200).json(user);

      }catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json("Invalid token");
    }
    return res.status(400).json(e);
  }
     
  }

  
  const changeTaskStatusToCompletetd = async (req, res) => {
  
    try{
      const {id: taskId } = req.params
    
      const count = await Document.find({task_id : taskId}).countDocuments({status : "new"}).exec();
      
      if(count>0){
          return res.status(200).json({status: "Task not completed"});
      }
      const task = await Task.findOneAndUpdate({task_id : taskId}, {status : "completed"});
      if(!task)
          return res.status(404).json({error: `No task with id: ${taskId}`})
      res.status(200).json({status: "ok"});
    }
    catch(err){
      res.status(500).json(e);
    }     
  
  }
  

  const changeStatusToInprogress = async (req, res) => {
    try{
    const {id: taskId } = req.params
      console.log(taskId)
      
    const task = await Task.findOneAndUpdate({ task_id : taskId}, {status : "inprogress"} );

    if(!task)
     return res.status(404).json({error: `No task with id: ${taskId}`})
    
    res.status(200).json({status: "inprogress"});
    }
    catch (e) {
        res.status(500).json(e);
      }
}


const getTaskStatus = async (req, res) => {
  try{
  const {id: taskId } = req.params
    
  const task = await Task.findOne({ task_id : taskId} );

  if(!task)
   return res.status(404).json({error: `No task with id: ${taskId}`})
  
  res.status(200).json({status: task.status});
  }
  catch (e) {
      res.status(500).json(e);
    }
}
  

  module.exports = { getDashboard, getTaskStatus, changeTaskStatusToCompletetd, changeStatusToInprogress}