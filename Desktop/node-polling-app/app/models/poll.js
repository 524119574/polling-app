var mongoose = require('mongoose');
var option = require('./option');
var Schema = mongoose.Schema;
var user = require('./user');

var pollSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	question: {
		type: String,
		required: true 
	},
	choices: [{
		choiceName: {
			type: String,
			required: true
		},
		choiceId: {
		type: Number,
		required: true
		},
		choiceCount: {
			type: Number,
			min: 0,
			default: 0
		}
	}],
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Poll', pollSchema);