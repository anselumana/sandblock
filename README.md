# Sandblock

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)

**A Blockchain development sandbox.**

## Overview

The project features 2 sub projects:

* ``sandblock/contracts`` (for the development of smart-contracts)

* ``sandblock/webapp`` (for the development of the user interface)

Both projects have their own dependecies, found in their own **package.json** file.

### Initial setup
```
$ npm install
```
You must run this command in both of the aforementioned directories.

## How to run

To run the project, you will need to follow these steps:
* Spin up a local Blockchain
* Compile and Migrate smart-contracts to the Blockchain
* Start the web app

### Spinning up a local Blockchain
Open a terminal and ``cd`` into  ``./sandblock/contracts``, then run the following command.
```
$ npx ganache-cli --deterministic --networkId 112358 --db ganachedb.tmp
```
This will start a local Blockchain instance listening on ``localhost`` at port ``8545``.
Leave it running in the background.
For more info on ganache-cli check the https://github.com/trufflesuite/ganache-cli repository.

### Compiling and Migrating smart-contracts
Once the Blockchain is up and running, you'll need to compile you contracts and migrate (deploy) them to the Blockchain.
Open a new terminal and run the following two commands:
```
$ npx truffle compile
$ npx truffle migrate --network dev
```
That's it, your contracts are now deployed and ready to be called from the web app.
For more info on the Truffle framework follow https://www.trufflesuite.com/docs/truffle/overview

### Starting the web app
The web app is a simple ``React`` app that uses ``web3.js`` to interact with the Blockchain and smart-contracts.
You'll need **MetaMask** to work with the app, you can download and install it at https://metamask.io

First of all, copy the contracts' build Artifacts from ``sandblock-contracts/build/contracts`` to ``sandblock-webapp/src/smart-contract-artifacts`` (this is needed for ``web3.js`` to load each contract's ABI, and thus allow interaction).
Now start the app by running:
```
$ npm start
```
And that's it, have fun!

##### P.S. Keep in ming that (for now) you'll have to manually copy paste the contracts' artifacts each time you migrate them, or the web app won't be able to locate and interact with them.
