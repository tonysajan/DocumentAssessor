const mongoose = require('mongoose')

const Assessment = new mongoose.Schema(
	{
		assess_id: {type: Number, required: true},
        answer1: {type: String, required: true},
		answer2: {type: String, required: true},
        answer3: {type: String, required: true},
		answer4: {type: String, required: true},
        answer5: {type: String, required: true}

	},
    { collection: 'assess_forms' }
)



const model = mongoose.model('assess_forms', Assessment)

module.exports = model