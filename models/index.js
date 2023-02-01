let Joi=require("joi");

let UserSchema=require("./schema/user");
let transactionSchema=require("./schema/atm");

let Schema={
    addUserSchema:UserSchema.addUserSchema,
    transactionSchema:transactionSchema.addtransactionschema

}

let validate= async function(data,schema){
    try{
        let validate={}
        validate.value=await Joi.assert(data,Schema[schema]);
       
        return validate;
    }catch(err){
        throw err;
    }
}

exports.validate=validate;