let Joi=require("joi");

const addUserSchema=Joi.object().keys({
    name:Joi.string(),
    username:Joi.string(),
    password:Joi.string(),
    token:Joi.alternatives(Joi.string(),null)
})

module.exports={

    "addUserSchema":addUserSchema
}