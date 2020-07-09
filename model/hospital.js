const { model, Schema } = require('mongoose')

const hospitalSchema = new Schema({
    hospName: String,
    hospAddr: String,
    city: String,
    phone: Number,
    type: String,
    img_path: String,
    website: String,
    wheelchairAccess: String,
    rating: Number,
    department: Array,
    diseases: Array,
})

module.exports = model('Hospital', hospitalSchema)
