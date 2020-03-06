const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates the Mongoose Model from a Schema, which carries the functions and programming to operate with the mongoose environment.
    // required and unique parameters help keep the user unique
const celebritySchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true  
        },
    occupation: { 
        type: String, 
        enum: ['Actor', 'Singer', 'Comedian ', 'unknown']
        },
    catchPhrase: {
        type: String,
    }

});

const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;