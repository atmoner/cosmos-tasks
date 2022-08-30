export default [
  {
    chainId: 'cosmoshub-4',
    name: 'Cosmoshub',
    desc: 'The Cosmos Hub is the first of thousands of interconnected blockchains that will eventually comprise the Cosmos Network.',
    apiURL: 'https://lcd-cosmoshub.blockapsis.com',
    rpcURL: 'https://cosmoshub.validator.network',
    coinLookup: {
      viewDenom: 'ATOM',
      chainDenom: 'uatom',
      addressPrefix: 'cosmos',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/atom.svg`,
    },
    coingeckoId: 'cosmos',
    mintscanId: 'cosmos',
    osmoIbc: {
      channel: 'channel-141'
    }
  },
  {
    chainId: 'bitcanna-1',
    name: 'BitCanna',
    desc: 'BitCanna Pay Instantaneous worldwide payments, effortlessly easy and private',
    apiURL: 'https://lcd.bitcanna.io',
    rpcURL: 'https://rpc.bitcanna.io',
    coinLookup: {
      viewDenom: 'BCNA',
      chainDenom: 'ubcna',
      addressPrefix: 'bcna',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/bcna.svg`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'bitcanna',
    mintscanId: 'bitcanna',
    osmoIbc: {
      channel: 'channel-1'
    }
  },
  {
    chainId: 'akashnet-2',
    name: 'Akash',
    desc: 'Akash Network is a Distributed Peer-to-Peer Marketplace for Cloud Compute',
    apiURL: 'https://rest-akash.ecostake.com',
    rpcURL: 'https://rpc.akash.forbole.com',
    coinLookup: {
      viewDenom: 'AKT',
      chainDenom: 'uakt',
      addressPrefix: 'akash',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/akt.svg`,
    },
    coingeckoId: 'akash-network',
    mintscanId: 'akash',
    osmoIbc: {
      channel: 'channel-9'
    }
  },
  {
    chainId: 'osmosis-1',
    name: 'Osmosis',
    desc: 'Osmosis is a decentralized peer-to-peer blockchain that people can use to create liquidity and trade IBC enabled tokens.',
    apiURL: 'https://lcd-osmosis.blockapsis.com',
    rpcURL: 'https://osmosis.validator.network',
    coinLookup: {
      viewDenom: 'OSMO',
      chainDenom: 'uosmo',
      addressPrefix: 'osmo',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/osmo.svg`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'osmosis',
    mintscanId: 'osmosis'
  },
  {
    chainId: 'stargaze-1',
    name: 'Stargaze',
    desc: 'Starname is the first interoperable Layer 1 for NFTs, NFT Launchpad, NFT Marketplace. Community-owned. Zero Gas',
    apiURL: 'https://api.stargaze.pupmos.network',
    rpcURL: 'https://rpc.stargaze-apis.com',
    coinLookup: {
      viewDenom: 'STARS',
      chainDenom: 'ustars',
      addressPrefix: 'stars',
      icon: `https://raw.githubusercontent.com/public-awesome/assets/main/images/stars.png`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'stargaze',
    mintscanId: 'stargaze',
    osmoIbc: {
      channel: 'channel-0'
    }
  }
]
