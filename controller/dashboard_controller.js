const User = require("../model/user")
const Task = require("../model/task")
const jwt = require("jsonwebtoken");
const Document = require("../model/document")

 
//async function to view user dashboard 

 const getDashboard = async (req, res) => {
  try {
    const token = req.cookies.token
       if(!token){
          return res.status(401).json("No token found");
       }
    var payload
    //verify token using jwt 
    payload = jwt.verify(token, process.env.JWT_SECRET)
    const username = payload.username
    
    const user = await Task.find({ username }).lean();
    
    res.status(200).json(user);

      }catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json("Invalid token");
    }
    return res.status(400).json(e);
  }
     
  }


  //async function to update the task status to completed
  
  const changeTaskStatusToCompletetd = async (req, res) => {
  
    try{
      const {id: taskId } = req.params
      
      //get the count of documents with status "New" 
      const count = await Document.find({task_id : taskId}).countDocuments({status : "New"}).exec();
      
      //if any document is pending then task is not complete
      if(count>0){
          return res.status(200).json({status: "Task not completed"});
      }
      //otherwise find and update the task status to completed
      const task = await Task.findOneAndUpdate({task_id : taskId}, {status : "Completed"});
      if(!task)
          return res.status(404).json({error: `No task with id: ${taskId}`})
      res.status(200).json({status: "ok"});
    }
    catch(err){
      res.status(500).json(e);
    }     
  
  }
  


  //async function to update the task status to inprogress

  const changeStatusToInprogress = async (req, res) => {
    try{
    const {id: taskId } = req.params
    
     //get the task by task id
    const user = await Task.findOne({ 
      task_id : taskId 
      
       });
   
    if(user.status == 'New'){
      //find and update the task status to inprogress
      const task = await Task.findOneAndUpdate({ task_id : taskId}, {status : "Inprogress"} );
      if(!task)
        return res.status(404).json({error: `No task with id: ${taskId}`})
    }
    const result = await Task.findOne({ task_id : taskId});
    res.status(200).json({status: result.status});
    }
    catch (e) {
        res.status(500).json(e);
      }
}



//async function to get the task status 

const getTaskStatus = async (req, res) => {
  try{
  const {id: taskId } = req.params
  
  //get the task by task id
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