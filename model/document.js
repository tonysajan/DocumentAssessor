const mongoose = require('mongoose')

const Document = new mongoose.Schema(
	{
		assess_id: {type: Number, required: true},
		task_id: {type: Number, required: true},
		name: {type: String, required: true},
		pdf_link: {type: String, required: true},
		status: {type: String, required: true}

	},
    { collection: 'document_list' }
)



const model = mongoose.model('document_list', Document)

module.exports = model