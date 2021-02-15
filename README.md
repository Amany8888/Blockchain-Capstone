# Udacity Blockchain Capstone project "Decentralized Real Estate Marketplace"

The Objective of this capstone is to build a decentralized Real-Estate listing service that helping to prevent title issues that could be mitigated by blockchain technology.

these real estate properties are represented by the ERC721 tokens.

Before you mint a token, you need to verify you own the property. we implemented zkSnarks using ZoKrates, a toolbox for zkSNARKs on Ethereum, to create a verification system which can prove you have title to the property without revealing that specific information on the property.

the tokens will be listed and ready for the exchange on the OpenSea, a decentralized marketplace that is used for selling for crypto assets such as CryptoKitties and other digital assets that are powered off Ethereum. On OpenSea, you can buy or sell any of these items through a smart contract, meaning that no central authority ever holds custody of your items.

## Versions

      truffle: Truffle v5.1.65
      Solidity v0.5.2


## Contracts

### SolnSquareVerifier.sol

<b>Note</b>: SolnSquareVerifier inherits all other contracts except SquareVerifier.sol

### SquareVerifier.sol

<b>Note</b>: contract generated automatically by Zokrates,
              implements Succinct Zero-knowledge proofs (zkSnarks)


## Contracts Abi's Can be found on:
             eth-contracts/build/contracts

---

## Quick Start Deploying to Ganache and Testing

1. cd into project repro & install modules

        cd Blockchain-Capstone

        npm install
        
2. Compile Contracts

        truffle compile

3. Start ganache (CLI or GUI)

            ganache-cli

4. Mirgrate locally

              truffle migrate --reset --network development 
 

#### Testing contracts

Testing ERC721

File: TestERC721Mintable.js

Test minting functionality of tokens and transfer of tokens.

    truffle test ./test/TestERC721Mintable.js

Test zkSnarks

File: TestSquareVerifier.js

Verifies zkSnarks is successfully implemented.

    truffle test ./test/TestSquareVerifier.js

Testing ERC721 token with zkSnarks

File: TestSolnSquareVerifier.js

Test minting with zkSnarks.

    truffle test ./test/TestSolnSquareVerifier.js

---

## Quick Start Deploying to Rinkeby

1. Make a new project with Infura

    Infura: https://infura.io

2. You need to setup the truffle-config.js, with your wallet mnemonic and infura 
   account before deploy to the rinkeby network

3. to deploy to rinkeby network
              truffle migrate --reset --network rinkeby


## Contract addresses on rinkeby test network
        Deploying 'SquareVerifier'
                --------------------------
                > transaction hash:       0x4b1722d2d25c48dfa3d9e5fa0629c03050fec87ba4c638b4dc86fed6977bc30f
                > Blocks: 1            Seconds: 12
                > contract address:    0x76e509A4Ec29DEB8abe52525DF10a61b345E7F82
                > block number:        8071177
                > block timestamp:     1613296284
                > account:             0x57B6618CF3a9E299289CaD55e58aDD42677CF5E7

        Deploying 'SolnSquareVerifier'
                ------------------------------
                > transaction hash:    0x0380c236f9264425ca9aaba603b50dadbd6409fdf1dccd6f66fed161a6a07eee
                > Blocks: 1            Seconds: 8
                > contract address:    0x9823Ef64AF5CBe16802a19b44133ae69d789F196
                > block number:        8071178
                > block timestamp:     1613296299
                > account:             0x57B6618CF3a9E299289CaD55e58aDD42677CF5E7

## Finding ER721 token on ether-scan

  https://rinkeby.etherscan.io/address/0x9823Ef64AF5CBe16802a19b44133ae69d789F196
  

## Minting tokens using myetherwallet

  https://www.myetherwallet.com/interface/interact-with-contract

## Minted Token ID = 1 TXs:
            Tx hash:
                   0xc83277fd385c3109760e81af7c4cda405191322baf970795e036e44e61cb2863
            token ID = 1   
            To address: 0x57b6618cf3a9e299289cad55e58add42677cf5e7
## Original minter:
        https://testnets.opensea.io/accounts/0x57b6618cf3a9e299289cad55e58add42677cf5e7
            

## Finding tokens on rinkeby OpenSea

           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/1
           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/2 
           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/3
           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/4
           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/5
           https://testnets.opensea.io/assets/0x9823Ef64AF5CBe16802a19b44133ae69d789F196/6

## buyer address
            https://testnets.opensea.io/accounts/0x881ad8fd340b01d7be4c0506df0ff19438435eca

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)