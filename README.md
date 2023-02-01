
# Atm Node CLI

 Command Line Interface (CLI) to simulate an interaction of an ATM with a retail bank.

## Description

It is Command Line Interface user can interract with application by command shell.This application helps handle basic banking activity which everyone connect with daily basis.Activities are Deposit,withdraw and transfer amount in to bank.

First user need to register into system after register is done user should login to the system and use the feautures of application .

## Getting Started

### Dependencies


* Nodejs V14.17.3
* Monodb V5.0.2
* Robo 3T
* Windows 10
* Node Dependencies joi,Commander , inquirer ,jsonwebtoken check package.json for more info

### Installing

* Clone the project on local
* Run npm install command in root folder

### Executing program

* Create new user

```
atm add or add a
input name,username,password
```

* Login user

```
atm login username or atm l username
input username
```
* Logout user

```
atm logout username or atm lg amount
input username
```
* Deposit Amount

```
atm deposit amount or atm w amount
input amount (should be number)
```
* Withdraw Amount

```
atm withdraw amount or atm w amount
input amount (should be number)
```
* Transfer Amount

```
atm transfer username payeename amount or atm t username payeename amount
input username payeename amount
```



## Authors

Contributors names and contact info

Vishal maske 
vish18maske@gmail.com
9168551118

## Version History

* 0.1
    * Initial Release

