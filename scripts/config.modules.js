export default [
  {
    name: 'Timer',
    desc: '<h3>Simple module timer</h3> This is a basic example to create your own script!',
    script: './scripts/timer/app.js',
    type: 'prod',
    auth: false,
    useChain: 'all',
    notice: '',
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
    useChain: 'all',
    notice: '',
    variable: {
    },
  },
  {
    name: 'Simple-send',
    desc: '<h3>Simple send</h3> This module allows you to send simple tx to any address with any amount',
    script: './scripts/simple-send/app.js',
    type: 'prod',
    auth: true,
    useChain: 'all',
    notice: '',
    variable: {
      0: 'sendTo',
      1: 'amount'
    },
  },
  {
    name: 'Withdraw-rewards',
    desc: '<h3>Withdraw rewards</h3> This module allows you to reward your delegation and delegate <br />the amount to a validator of your choice',
    script: './scripts/withdraw-rewards/app.js',
    type: 'prod',
    auth: true,
    useChain: 'all',
    notice: '',
    variable: {
      0: 'FromValidator'
    },
  },
  {
    name: 'Validator-commisions',
    desc: '<h3>Validator commisions</h3> This module allows you to recover your validator commissions, if you are not a validator, the script will not work',
    script: './scripts/validator-commisions/app.js',
    type: 'dev',
    auth: true,
    useChain: ['BitCanna', 'Osmosis', 'Cosmoshub', 'Akash', 'Stargaze'],
    notice: 'You must be a validator to run this script, otherwise it won\'t work!',
    variable: {
    },
  }/*,
  {
    name: 'Reinvest-delegations',
    desc: '<h3>Reinvest delegations</h3> This module allows you to reinvest the rewards of each delegation to the validator',
    script: './scripts/reinvest-delegations/app.js',
    type: 'dev',
    auth: true,
    notice: '',
    variable: {
    },
  }*/
]

