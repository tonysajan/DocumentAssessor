const Task = require("../model/task")
const Document = require("../model/document")
const Assessment = require("../model/assessment")



const getDocumentsById = async (req, res) => {
  try{
  const {id: taskId } = req.params
    
  const docs = await Document.find({ task_id : taskId});

  if(!docs)
   return res.status(404).json({msg: `No task with id: ${taskId}`})
  
  res.status(200).json(docs);
  }
  catch (e) {
      res.status(500).json(e);
    }
}


const changeDocumentStatusToCompletetd = async (req, res) => {
  try{
  const {id: docId } = req.params
    
  if(Assessment.find({assess_id : docId}))
    {
  const doc = await Document.findOneAndUpdate({ assess_id : docId}, {status : "Completed"} );
  if(!doc)
    return res.status(404).json({error: `No document with id: ${docId}`})
  const result = await Document.findOne({ assess_id : docId});

  res.status(200).json({status: result.status});
  }
}catch (e) {
      res.status(500).json(e);
    }
}


module.exports = {getDocumentsById, changeDocumentStatusToCompletetd}