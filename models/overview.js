const mongoose = require('mongoose');


const bankDataSchema = new mongoose.Schema({
        name : {
            type: String, 
        },
        totalValue: {
            type: Number
        },
        bankType: {
            //
            type: String
        }
    }
})