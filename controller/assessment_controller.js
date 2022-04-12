const Assessment = require("../model/assessment")

const submitAssessment = async (req, res) => {
    const {id: assessId } = req.params
    const { answer1, answer2, answer3, answer4, answer5} = req.body

    if(answer1)
    try{
        const result = await Assessment.create({assess_id : assessId, 
            answer1, answer2, answer3, answer4, answer5})
        res.status(200).json(result)
        console.log('Assessment form submitted successfully: ', result)
    }catch(error){
            res.status(500).json(error.message)
    }
}


const getAssessmentData = async (req, res) => {
    const {id: assessId } = req.params
    const result = await Assessment.findOne({ assess_id : assessId} );
    try{
    if(!result)
     return res.status(404).json({error: `No assessment with id: ${assessId}`})
    
    res.status(200).json({data: result});
    }
    catch (e) {
        res.status(500).json(e);
      }
}
module.exports = {submitAssessment, getAssessmentData}