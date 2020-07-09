const { model, Schema } = require('mongoose')

const clinicSchema = new Schema({
    clinicName: String,
    clinicAddr: String,
    city: String,
    phone: Number,
    type: String,
    website: String,
    img_path: String,
    wheelchairAccess: String,
    rating: Number,
    department: Array,
    diseases: Array,
})

module.exports = model('Clinics', clinicSchema)
