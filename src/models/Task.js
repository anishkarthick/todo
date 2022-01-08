const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, { timestamps: true })
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task

