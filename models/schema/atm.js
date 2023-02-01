let Joi= require('joi');

const addtransactionschema=Joi.object().keys({
    "username":Joi.string(),
    "balance":Joi.number(),
    "paymenthistory":Joi.array()
    
});

module.exports={
    
    "addtransactionschema":addtransactionschema
}

