# Sandblock

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-blue)](https://docs.openzeppelin.com/contracts)
[![NPM Package](https://img.shields.io/npm/v/@openzeppelin/contracts.svg)](https://www.npmjs.org/package/@openzeppelin/contracts)
[![Coverage Status](https://codecov.io/gh/OpenZeppelin/openzeppelin-contracts/graph/badge.svg)](https://codecov.io/gh/OpenZeppelin/openzeppelin-contracts)

**A Blockchain development sandbox.**

## Overview

The project features 2 sub projects:
* sandblock/contracts (for the development of smart-contracts)
* sandblock/webapp (for the development of the user interface)

Both projects have their own dependecies, expressed in their own package.json file.

### Initial setup

```console
$ cd ./snadblock/contracts
$ npm install   # install contracts npm dependecies
$ cd ../sandblock/webapp
$ npm install   # install webapp npm dependecies
```
