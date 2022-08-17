# Cosmos-tasks

> __Warning__  
This environment is in beta!  
Use only development wallets (wallet created with only a bit of coin)  
If you have any ideas, improvements or security issues, please [open a discussion here](https://github.com/atmoner/cosmos-tasks/discussions/new)

![image](https://user-images.githubusercontent.com/1071490/185205069-fdb43529-b297-43c8-841e-1051e7bf89e3.png)


## Table of Contents

*   [Requirements](#requirements "Requirements")
*   [Installation](#installation "Installation")
*   [Create module](#create-module "Create module")

## Requirements

* NodeJs and yarn (or npm)
* Pm2 install in global mode

## Installation

First, you need [Pm2](https://pm2.keymetrics.io) in global mode: 
```
npm install pm2 -g
```

Download our repo:
```
git clone https://github.com/atmoner/cosmos-tasks.git
```

Go in and install all
```
cd cosmos-tasks/ 
yarn install
```

And start it:
```
yarn dev
```

You can access the management interface on your local address on port 3000  
http://localhost:3000/

## Create module
