const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    propertyType: { type: String, required: true },
    city:{type:String,required:true},
    location: { type: String, required: true },
    rent: { type: Number, required: true },
    size: { type: String, required: true },
    area: { type: Number, required: true },
    face: { type: String, required: true },
    buildingType: { type: String, required: true },
    floor: { type: Number },
    yearsOfConstruction: { type: Number },
    advance: { type: Number, required: true },
    photos: [String],
    innerFacilities: String,
    nearbyFacilities: String,
});

module.exports = mongoose.model('Property', propertySchema);
