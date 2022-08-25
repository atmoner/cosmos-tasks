# Cosmos-tasks

> __Warning__  
This environment is in beta!  
Use only development wallets (wallet created with only a bit of coin)  
If you have any ideas, improvements or security issues, please [open a discussion here](https://github.com/atmoner/cosmos-tasks/discussions/new)

![image](https://user-images.githubusercontent.com/1071490/185205069-fdb43529-b297-43c8-841e-1051e7bf89e3.png)

Cosmos-task is an interface to facilitate the use of pm2 (Process manager) that we have adapted for the :atom_symbol: cosmos ecosystem.  
Pm2 allows you to launch nodejs scripts in daemon, which means that each module (or script) will run in the background to perform actions every X time.  

It is therefore possible to automate any actions on your own wallet from your machine!

## Table of Contents

*   [Requirements](#requirements "Requirements")
*   [Installation](#installation "Installation")
*   [Blockchain support](#blockchain-support "Blockchain support")
*   [List modules](#list-modules "List modules")
*   [Create module](#create-module "Create module")
*   [Todo](#todo "Todo")

## Requirements

* NodeJs 
```
sudo apt install nodejs npm
```
* Yarn
```
npm install --global yarn
```
* Pm2 in global mode
```
yarn global add pm2
```

## Installation

Download our repo
```
git clone https://github.com/atmoner/cosmos-tasks.git
```

Go in folder
```
cd cosmos-tasks/ 
```
Install all libs
```
yarn install
```

During installation, a basic account is created.

User: `cosmonaut`  
Pass: `cosmonaut`

You can modify your identifiers in the file: `auth.config.js`

And start UI
```
yarn dev
```

You can access the management interface on your local address on port 3000  
http://localhost:3000/

## Blockchain support

1. Atom
2. BitCanna
3. Stargaze
4. Akash
5. Osmosis

If you are the owner of a blockchain and want to be added, contact me

➡️ On twitter: [@atmon3r](https://twitter.com/atmon3r)  
➡️ On telegram: [@atmon3r](https://t.me/atmon3r) 

## List modules

 
<img src="https://user-images.githubusercontent.com/1071490/186449483-351e8567-5e89-4478-8ef6-3128dc464aad.png" width="500" height="350" />


| Module name | Statut | Need wallet | script
| -------- | -------- | -------- | -------- |
| Timer     |  ✅     | ❌      | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/timer) |
| Get-price     |  ✅     | ❌      | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/get-price) |
| Simple-send    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/simple-send) |
| Withdraw-rewards    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/withdraw-rewards) |
| Validator-commisions    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/validator-commisions) |
| Reinvest-delegations     |  ❌     |  ✅     |  |


## Create module

(Soon)

## Todo

- [x] Create login system [View commit](https://github.com/atmoner/cosmos-tasks/commit/9b545c46a89723f6e7179b651cf00a2c2411dff7)
- [ ] Add notification system
- [ ] Create update checker
- [ ] Add more modules
 


## Disclaimer responsibility
COSMOS-TASK DECLINES RESPONSIBILITY FOR YOUR WALLETS.  
INDEED, THE PROGRAM SAVES YOUR WALLETS ON YOUR OWN MACHINE (SERVER OR PC) AND HAS NO ACCESS AT ANY TIME TO YOUR SAVED DATA. 

YOU ARE RESPONSIBLE FOR THE SECURITY OF YOUR WALLETS.  

WE INVITE YOU TO ONLY USE THE MODULES PRESENT ON THIS GITHUB AND NEVER TO INSTALL AN EXTERNAL SCRIPT.
