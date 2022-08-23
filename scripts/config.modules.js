export default [
  {
    name: 'Timer',
    desc: '<h3>Simple module timer</h3> This is a basic example to create your own script!',
    script: './scripts/timer/app.js',
    type: 'prod',
    auth: false,
    variable: {
      0: 'Cosmos_var1',
      1: 'Cosmos_var2'
    },
  },
  {
    name: 'Get-price',
    desc: '<h3>Get price module</h3> This module simply retrieve the price of a coin.<br /> It is useful to understand how the modules work',
    script: './scripts/get-price/app.js',
    type: 'prod',
    auth: false,
    variable: {
    },
  },
  {
    name: 'Simple-send',
    desc: '<h3>Simple-send</h3> This module allows you to reward your delegation and delegate <br />the amount to a validator of your choice',
    script: './scripts/simple-send/app.js',
    type: 'prod',
    auth: true,
    variable: {
      0: 'sendTo',
      1: 'amount'
    },
  },
  {
    name: 'Withdraw-rewards',
    desc: '<h3>Withdraw-rewards</h3> This module allows you to reward your delegation and delegate <br />the amount to a validator of your choice',
    script: './scripts/withdraw-rewards/app.js',
    type: 'prod',
    auth: true,
    variable: {
      0: 'FromValidator'
    },
  }
]

