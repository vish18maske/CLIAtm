#! /usr/bin/env node 

const program=require("commander");
const userCtrl= require("./controllers/user");
const atmCtrl = require("./controllers/atm");
const {prompt}= require("inquirer");

let userQuetions=[
    {
        "type":"input",
        "name":"name",
        "message":"Enter Name"
    },
    {
        "type":"input",
        "name":"username",
        "message":"Enter Username"
    },
    {
        "type":"input",
        "name":"password",
        "message":"Enter Password"
    }

];

let dQuetion=[
    {
        "type":"input",
        "name":"amount",
        "message":"Enter Deposit Amount"
    }
];
let wQuetion=[
    {
        "type":"input",
        "name":"amount",
        "message":"Enter Withdraw Amount"
    }
];

let tQuestions=[
    {
        "type":"input",
        "name":"username",
        "message":"Enter Your UserName"
    },
    {
        "type":"input",
        "name":"payeename",
        "message":"Enter Your PayeeName"
    },
    {
        "type":"input",
        "name":"amount",
        "message":"Enter Transfer Amount"
    },
]
program
    .version('1.0.0')
    .description("ATM CLi")


// program
//     .command("add <name> <username> <password>")
//     .alias('a')
//     .description("Add a user")
//     .action((name,username,password)=>{
//         let reqData={
//             name,
//             username,
//             password
//         }
//         userCtrl.add(reqData)
//     })

program
    .command("add")
    .alias("a")
    .description("Add a user")
    .action(()=>{
        prompt(userQuetions).then(answers=>userCtrl.add(answers))
    })

program
    .command("login <username>")
    .alias("l")
    .description("Login a user")
    .action((username)=>{
        let reqData={
            username
        }
        userCtrl.login(reqData);
    })
program
    .command("logout <username>")
    .alias("lg")
    .description("Logout a user")
    .action((username)=>{
        let reqData={
            username
        }
        userCtrl.logout(reqData);
    })
// program
//     .command("deposit <amount>")
//     .alias("d")
//     .description("Deposit amount")
//     .action((amount)=>{
//         let reqData={
//             amount
//         }
//         atmCtrl.deposit(reqData);

//     })

program
    .command("deposit")
    .alias("d")
    .description("Deposit amount")
    .action(()=>{
        prompt(dQuetion).then(answers=>atmCtrl.deposit(answers))
    })

// program
//     .command("withdraw <amount>")
//     .alias("w")
//     .description("Withdraw amount")
//     .action((amount)=>{
//         let reqData={
//             amount
//         }
//         atmCtrl.withdraw(reqData);
//     })

program 
    .command("withdraw")
    .alias("w")
    .description("Withdraw amount")
    .action(()=>{

        prompt(wQuetion).then(answers=>atmCtrl.withdraw(answers));
    })

// program
//     .command("transfer <username> <payeename> <amount>")
//     .alias("t")
//     .description("transfer amount")
//     .action((username,payeename,amount)=>{

//         let reqData={
//             username,
//             payeename,
//             amount
//         }
//         atmCtrl.transfer(reqData);
//     })


program
    .command("transfer")
    .alias("t")
    .description("Transfer amount")
    .action(()=>{
        prompt(tQuestions).then(answers=>atmCtrl.transfer(answers));
      })




program.parse(process.argv)