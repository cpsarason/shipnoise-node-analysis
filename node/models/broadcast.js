const Joi = require('joi');
const mongoose = require('mongoose');

// AIS Data looks like the following
// This is from simple import to MongoDB -- need to update to have
// numerical values be numeric instead of strings
// TODO: Updata mongodb (cpsarason 2018-10-08)

AIS_example = {
    "_id":"5bae89c3774a302798646ec9",
    "MMSI":"366709770",
    "BaseDateTime":"2017-01-01T00:00:09",
    "LAT":"47.60197",
    "LON":"-122.34008",
    "SOG":"0.0",
    "COG":"52.5",
    "Heading":"80.0",
    "VesselName":"",
    "IMO":"",
    "CallSign":"",
    "VesselType":"",
    "Status":"under way using engine",
    "Length":"",
    "Width":"",
    "Draft":"5.2",
    "Cargo":""
}


const Broadcast = mongoose.model('Broadcast', new mongoose.Schema({
    MMSI: {
        type: String,
        required: true,
    },
    BaseDateTime: String,
    LAT: String,
    LON: String,
    SOG: String,
    COG: String,
    Heading: String,
    VesselName: String,
    IMO: String,
    CallSign: String,
    Length: String,
    Width: String,
    Draft: String,
    Cargo: String,
}));

function validateBroadcast(broadcast){
    const schema = {
        MMSI: Joi.string().min(9).max(9).required(),
        BaseDateTime: Joi.string(),
        LAT: Joi.string(),
        LON: Joi.string(),
        SOG: Joi.string(),
        COG: Joi.string(),
        Heading: Joi.string(),
        VesselName: Joi.string(),
        IMO: Joi.string(),
        CallSign: Joi.string(),
        Length: Joi.string(),
        Width: Joi.string(),
        Draft: Joi.string(),
        Cargo: Joi.string(),
    }

    return Joi.validate(broadcast, schema);
}

exports.Broadcast = Broadcast;
exports.validate = validateBroadcast;