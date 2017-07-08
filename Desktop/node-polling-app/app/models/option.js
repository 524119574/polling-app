var mongoose = require('mongoose');

var optionSchema = mongoose.Schema({
	optionName: String,
	optionCount: {
		type: Number,
		default: 0,
		min: 0
	}
});

module.exports = mongoose.model('Option', optionSchema);