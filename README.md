# Cosmos-tasks

> __Warning__  
This environment is in beta!  
Use only development wallets (wallet created with only a bit of coin)  
If you have any ideas, improvements or security issues, please [open a discussion here](https://github.com/atmoner/cosmos-tasks/discussions/new)

![image](https://user-images.githubusercontent.com/1071490/185205069-fdb43529-b297-43c8-841e-1051e7bf89e3.png)


## Table of Contents

*   [Requirements](#requirements "Requirements")
*   [Installation](#installation "Installation")
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
And start UI
```
yarn dev
```

You can access the management interface on your local address on port 3000  
http://localhost:3000/

## List modules
| Module name | Statut | Need wallet | script
| -------- | -------- | -------- | -------- |
| timer     |  ✅     | ❌      | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/timer) |
| get-price     |  ✅     | ❌      | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/get-price) |
| simple-send    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/simple-send) |
| withdraw-rewards    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/withdraw-rewards) |
| validator-commisions    |  ✅     |  ✅     | [View](https://github.com/atmoner/cosmos-tasks/tree/main/scripts/validator-commisions) |
| auto-reinvest     |  ❌     |  ✅     |  |
| burn-nft (stargaze)     |  ❌     |  ✅     |  |

## Create module

(Soon)

## Todo

- [ ] Create login system
- [ ] Add notification system
- [ ] Add more modules
 


## Disclaimer responsibility
COSMOS-TASK DECLINES RESPONSIBILITY FOR YOUR WALLETS. INDEED, THE PROGRAM SAVES YOUR WALLETS ON YOUR OWN MACHINE (SERVER OR PC) AND HAS NO ACCESS AT ANY TIME TO YOUR SAVED DATA.  
YOU ARE RESPONSIBLE FOR THE SECURITY OF YOUR WALLETS.  
WE INVITE YOU TO ONLY USE THE MODULES PRESENT ON THIS GITHUB AND NEVER TO INSTALL AN EXTERNAL SCRIPT.
