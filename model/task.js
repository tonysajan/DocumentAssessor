const mongoose = require('mongoose')



const Task = new mongoose.Schema(
	{
		task_id: {type: Number, required: true},
		task_name: {type: String, required: true},
		description: {type: String, required: true},
		amount_of_resources: {type: Number, required: true},
		status: {type: String, required: true},
		username: {type: String, required: true},
		inst_pdf_link: {type: String, required: true},
		name: {type: String, required: true},
		

	},
    { collection: 'task_list' }
)



const model = mongoose.model('task_list', Task)

module.exports = model