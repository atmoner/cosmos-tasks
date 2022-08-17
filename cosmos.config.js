export default [
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
    coingeckoId: 'bitcanna'
  },
  {
    chainId: 'chihuahua-1',
    name: 'Chihuahua',
    desc: 'Chihuahua is the first interoperable meme coin with a POS blockchain, making it one of the most utilized chains in the Cosmos ecosystem',
    apiURL: 'https://api.chihuahua.wtf',
    rpcURL: 'https://rpc.chihuahua.wtf',
    coinLookup: {
      viewDenom: 'HUAHUA',
      chainDenom: 'uhuahua',
      addressPrefix: 'chihuahua',
      icon: `https://avatars.githubusercontent.com/u/94940349?v=4`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'chihuahua-token'
  },
  /*{
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
    coingeckoId: 'cosmos'
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
    coingeckoId: 'akash-network'
  }, */

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
    coingeckoId: 'osmosis'
  },
  {
    chainId: 'iov-mainnet-ibc',
    name: 'Starname',
    desc: 'Starname is a crypto name service and the best way to claim your part of the blockchain.',
    apiURL: 'https://lcd-iov.keplr.app',
    rpcURL: 'https://rpc-iov.keplr.app',
    coinLookup: {
      viewDenom: 'IOV',
      chainDenom: 'uiov',
      addressPrefix: 'star',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/iov.svg`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'starname'
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
    coingeckoId: 'stargaze'
  },
  {
    chainId: 'bitsong-2b',
    name: 'BitSong',
    desc: 'A Blockchain Ecosystem to Empower the Music Industry. Artists, fans, distributors and labels.',
    apiURL: 'https://lcd-bitsong.itastakers.com',
    rpcURL: 'https://rpc-bitsong.itastakers.com',
    coinLookup: {
      viewDenom: 'BTSG',
      chainDenom: 'ubtsg',
      addressPrefix: 'bitsong',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/btsg.svg`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'bitsong'
  },
  {
    chainId: 'juno-1',
    name: 'Juno',
    desc: 'Juno is a decentralized effort to provide a sister hub to the Cosmos Hub.',
    apiURL: 'https://lcd-juno.itastakers.com',
    rpcURL: 'https://rpc-juno.itastakers.com',
    coinLookup: {
      viewDenom: 'JUNO',
      chainDenom: 'ujuno',
      addressPrefix: 'juno',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/juno.svg`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'juno-network'
  },
  {
    chainId: 'comdex-1',
    name: 'Comdex',
    desc: 'Comdex is a decentralized synthetics protocol in the Cosmos Ecosystem.',
    apiURL: 'https://rest.comdex.one',
    rpcURL: 'https://rpc.comdex.one',
    coinLookup: {
      viewDenom: 'CMDX',
      chainDenom: 'ucmdx',
      addressPrefix: 'comdex',
      icon: `https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/cmdx.png`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'comdex'
  },
  {
    chainId: 'omniflixhub-1',
    name: 'OmniFlix',
    desc: 'OmniFlix is a p2p network for creators and sovereign communities',
    apiURL: 'https://rest.omniFlix.network',
    rpcURL: 'https://rpc.omniFlix.network',
    coinLookup: {
      viewDenom: 'FLIX',
      chainDenom: 'uflix',
      addressPrefix: 'omniflix',
      icon: 'https://raw.githubusercontent.com/OmniFlix/docs/main/media/OmniFlix_Icon_v4.svg',
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'NA'
  },
  {
    chainId: 'cerberus-chain-1',
    name: 'Cerberus',
    desc: 'Cerberus the first ever three-headed meme-coin in the Cosmos ecosystem',
    apiURL: 'https://api.cerberus.zone:1317/',
    rpcURL: 'https://rpc.cerberus.zone:26657/',
    coinLookup: {
      viewDenom: 'CRBRUS',
      chainDenom: 'ucrbrus',
      addressPrefix: 'cerberus',
      icon: 'https://cerberus-chain.s3.us-east-2.amazonaws.com/transparent_logo_no_text.png',
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'cerberus-2'
  },
  {
    chainId: 'crescent-1',
    name: 'Crescent',
    desc: 'Innovating DeFi investment through advancements in inter-blockchain technology',
    apiURL: 'https://mainnet.crescent.network:1317',
    rpcURL: 'https://mainnet.crescent.network:26657',
    coinLookup: {
      viewDenom: 'CRE',
      chainDenom: 'ucre',
      addressPrefix: 'cre',
      icon: 'https://crescent.network/static/media/crescent_logo.c16ebd6e40d82c2ba862decaf3037a97.svg',
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'crescent-network'
  },
  {
    chainId: 'teritori-testnet-v2',
    name: 'Teritori testnet ',
    apiURL: 'https://lcd-teritori.ustak.eu',
    rpcURL: 'https://rpc-teritori.ustak.eu',
    coinLookup: {
      viewDenom: 'TORI',
      chainDenom: 'utori',
      addressPrefix: 'tori',
      icon: `https://avatars.githubusercontent.com/u/108656591`,
    },
    fee: {
      amount: '5000',
      gas: '200000',
    },
    coingeckoId: 'akash-network'
  },
]
