const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    tittle: {
        type: String,
        Required: 'The field tittle is required.'
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['To do it', 'In progress', 'Finished']
        }],
        default: ['To do it']
    }
});

module.exports = mongoose.model('Task', taskSchema);