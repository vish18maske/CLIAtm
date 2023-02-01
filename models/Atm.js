const dataSource = require("../datasource");

var transaction_collection= dataSource.collection("transaction");

module.exports={

    deposit:async function(req){
        let result={}
        try{
            // console.log("req",req)
            result.resultData=await transaction_collection.updateOne({"username":req.username},{$inc:{balance:Number(req.amount)},$push:{paymenthistory:req.phistory}},{upsert:true})
            return result;
        }catch(err){  
            // console.log("err",err);  
            result.err=err;
            return result;
        }
    },

    withdraw:async function(req){
        let result={}
        try{
            result.resultData= await transaction_collection.updateOne({"username":req.username},{$inc:{balance:-Number(req.amount)},$push:{paymenthistory:req.phistory}},{upsert:true})
            return result;
        }catch(err){
            result.err=err;
            return result;
        }
    },

    findTransaction:async function(username){
        let result={};
        try{
            result.resultData= await transaction_collection.findOne({"username":username});
            return result;
        }catch(err){
            result.err=err;
            return result;
        }
    }
}