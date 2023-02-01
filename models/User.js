
let dataSource=require("../datasource");

var user_collection= dataSource.collection("users");

module.exports={

    add:async function(req){
        let result={};
        try{
            // console.log("dataSource",dataSource)
            // create index for unique username
            await user_collection.createIndex({
             "username":1   
            },{unique:true})

            result.resultData=await user_collection.insertOne(req);
            return result;
        }catch(err){
           
            result.err=err;
            return result;
        }
    },

    find:async function(req){
        let result={};
        try{
            result.resultData = await user_collection.findOne({"username":req.username});
            return result;

        }catch(err){
            result.err=err;
            return result;
        }
    },

    findToken: async function(){
        let result={};
        try{
            result.resultData= await user_collection.findOne({"token":{$exists:true}});
            return result;
        }catch(err){
            result.err=err;
            return result;
        }
    },

    updateToken:async function(username,token){
        let result={}
       try{
            result.resultData=await user_collection.updateOne({"username":username},{$set:{"token":token}});
            return result;
       }catch(err){
        result.err=err;
        return result;
       } 
    },
    removeToken: async function(username){
        let result={};
        try{
            result.resultData=await user_collection.updateOne({"username":username},{$unset:{"token":""}})
            return result;
        }catch(err){
            result.err=err;
            return result;
        }
    }

}