let validator=require("../models/index.js")
let userProvider=require("../models/User");
let atmProvider =require("../models/Atm");
var jwt = require('jsonwebtoken');
var secret = 'ABcdEfGhIJKLmNOpqrestuvwxyZ secret secret 12356';

module.exports={

    add: async function(req){
        
        try{
           
            let reqData=req
           
            let validateData=await validator.validate(reqData,"addUserSchema");
          
            if(validateData){
                let addUser=await userProvider.add(reqData);
                // console.log("addUser",addUser);
                if(addUser.err){
                    console.log("username already present please add diffrent username")
                }else{
                    console.log("User added into system");
                }
              
                process.exit();
              
            }
          
        }catch(err){
            console.log("error while add user",err)
            process.exit();
           
        }

    },

    login:async function(req){
        try{
            let checkUserExit=await userProvider.find(req)
           
            if(checkUserExit.resultData){
                let transactionData=await atmProvider.findTransaction(checkUserExit.resultData.username);
                if(!checkUserExit.resultData.token){
                    let findUserLogin= await userProvider.findToken(); 
                    
                    if(findUserLogin.resultData){
                        console.log(`${findUserLogin.resultData.username} already login`);
                    }else{
                        let profile={"username":checkUserExit.resultData.username}
                        
                        let token= jwt.sign({
                            profile
                          }, secret, { expiresIn: '1hr' });
                      
                        if(token){
                            
                            await userProvider.updateToken(checkUserExit.resultData.username,token);
        
                        }
                        console.log(`Welcome ${checkUserExit.resultData.username}`);
                        if(transactionData.resultData){
                    
                            console.log(`Your Balance is ${transactionData.resultData.balance}`)
                        }else{
                            console.log(`Your Balance is 0`)
                        } 
                        
                    }

                   
                    process.exit();
                   
                }else{
                    
                    let profile={"username":checkUserExit.resultData.username}
                    let token= jwt.sign({
                        profile
                      }, secret, { expiresIn: '1hr' });
                  
                    if(token){
                        
                        await userProvider.updateToken(checkUserExit.resultData.username,token);
    
                    }
                 
                }

                console.log(`Welcome ${checkUserExit.resultData.username}`);
                if(transactionData.resultData){
                    console.log(`Your Balance is ${transactionData.resultData.balance}`)
                }else{
                    console.log(`Your Balance is 0`)
                }
               
                
                process.exit();
            }else{
                console.log("User Does Not exit")
                process.exit();
            }

        }catch(err){

        }
    },

    logout:async function(req){
      
        try{
            let checkUserExit =await userProvider.find(req);
            if(checkUserExit.resultData && checkUserExit.resultData.token){
                let logoutUser=await userProvider.removeToken(checkUserExit.resultData.username);
             
               console.log(`!Goodbye ${req.username}`)
               process.exit();
            }else{
                let findUserLogin= await userProvider.findToken(); 
                if(!findUserLogin.resultData){
                    console.log(`No user logged in to the system`);
                }else{
                    console.log(`${findUserLogin.resultData.username} already login`)
                }
               
                process.exit();
                
            }
        }catch(err){
            console.log("error while logout user",err);
            process.exit();
            
        }
    }






}