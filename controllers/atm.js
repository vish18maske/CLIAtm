let atmProvider = require("../models/Atm");
let userProvider= require("../models/User")


module.exports={

    deposit:async function(reqdeposit){ 
        try{
            let findUserLogin= await userProvider.findToken(); 
            if(findUserLogin.resultData){
                    let reqData={};
                    reqData.amount=reqdeposit.amount;
                    reqData.username=findUserLogin.resultData.username;
                    reqData.phistory=`Deposited Amount ${reqData.amount} on the date ${new Date().toLocaleString()}`
                    await atmProvider.deposit(reqData);
                    let transactionData=await atmProvider.findTransaction(findUserLogin.resultData.username);
                    console.log(`${transactionData.resultData.paymenthistory[transactionData.resultData.paymenthistory.length-1]}`);
                    console.log(`Your Balance is ${transactionData.resultData.balance}`)
                    
                                
            }else{
                console.log("Please login and deposit amount")
            }
            process.exit();
        }catch(err){
            console.log("error while deposit money",err);
            process.exit();
        }
    },
    withdraw:async function(reqwithdraw){
        try{
            let findUserLogin = await userProvider.findToken()
            if(findUserLogin.resultData){
                let reqData={}
                reqData.amount=reqwithdraw.amount
                reqData.username=findUserLogin.resultData.username;
                reqData.phistory=`Withdraw Amount ${reqData.amount} on the date ${new Date().toLocaleString()}`;
                let transactionData =await atmProvider.findTransaction(findUserLogin.resultData.username);
                if(transactionData.resultData && transactionData.resultData.balance > 0 ){

                    if(transactionData.resultData.balance >= reqwithdraw.amount){
                        await atmProvider.withdraw(reqData);
                        let afterWtransactionData =await atmProvider.findTransaction(findUserLogin.resultData.username);
                        console.log(`${afterWtransactionData.resultData.paymenthistory[afterWtransactionData.resultData.paymenthistory.length-1]}`)
                        console.log(`Your balance is ${afterWtransactionData.resultData.balance}`);
                    }else{
                        console.log("Your balance is insufficient to withraw amount");
                    }

                }else{
                    console.log("Your balance is zero")
                }
               

            }else{
                console.log("Please Login and withdraw amount")
            }
            process.exit();
        }catch(err){
            console.log("error while withdraw amount",err);
            process.exit();
        }

    },

    transfer:async function(reqtransfer){
        try{
            let findUserLogin =await userProvider.findToken();
            if(findUserLogin.resultData){
                let reqData={}
                reqData.amount=reqtransfer.amount;
                reqData.payeename=reqtransfer.payeename;
                reqData.username=reqtransfer.username;
                reqData.phistory=`Transferd Amount ${reqtransfer.amount} to ${reqtransfer.payeename} on the date ${new Date().toLocaleString()}`;
                var deepCopied= {...reqData};
                deepCopied.username=reqData.payeename;
                deepCopied.phistory=`Got Amount ${reqtransfer.amount} From ${reqtransfer.username} on the date ${new Date().toLocaleString()}`
                let checkpayeeExists = await userProvider.find(deepCopied);
                let transactionData =await atmProvider.findTransaction(findUserLogin.resultData.username);
                if(checkpayeeExists.resultData){

                        if(transactionData.resultData && transactionData.resultData.balance > 0){
                            
                            if(transactionData.resultData.balance >= reqtransfer.amount){

                                await atmProvider.withdraw(reqData);
                                await atmProvider.deposit(deepCopied)

                                let aftertfTransactionData= await atmProvider.findTransaction(findUserLogin.resultData.username);
                                console.log(`${aftertfTransactionData.resultData.paymenthistory[aftertfTransactionData.resultData.paymenthistory.length - 1]}`);
                                console.log(`Your balance is ${aftertfTransactionData.resultData.balance}`);

                            }else{
                                console.log("Your balance is insufficient to transfer amount")
                            }
                        }else{
                            console.log("Your balance is zero")
                        }
                }else{
                    console.log("Payee not exist into system")
                }



            }else{
                console.log("Please Login and transfer amount")
            }
            process.exit();
        }catch(err){
            console.log("error while transfer money",err);
            process.exit();
        }

    }



}