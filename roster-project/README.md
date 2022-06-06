# Roster project manages course and a course roster. Good learning project

This is a good project to use as a starting point for your AssemblyScript project.

## Simple

This repository includes a complete project structure for AssemblyScript contracts targeting the NEAR platform.

The example here is very basic.  It's a simple contract demonstrating the following concepts:
- a simple contract that manages lists of students for a course and manages the courses themselves. 

There is 1 AssemblyScript contract in this project, each in their own folder:

 **simple** in the `src/simple` folder
 
Prerequisites: NEAR Mainnet and testnet accounts, Node.js, NEAR Cli, and the user must log into the NEAR CLI before running this contract application.
Once the prerequistes are complete, but before the Smart Contract application is run, set the environmental variables below, and log into NEAR:

export NODE_OPTIONS=--openssl-legacy-provider,
export NEAR_ENV=testnet,
near login

This video explains the prerequisites: https://drive.google.com/file/d/1_VXy5KbcSeNZka6dEkYLXbagJSsPKnxm/view?usp=sharing

## Usage

### Getting started

(see below for video recordings of each of the following steps)

1. clone this repo to a local folder

From the top level directory, i.e. roster-project
2. run  ./scripts/1.dev-deploy.sh
3. run  ./scripts/2.use-contract.sh
4. run  ./scripts/3.cleanup.sh

### 

** 1.dev-deploy.sh **

This video demonstrates how to deploy the contract: https://drive.google.com/file/d/15kRCFU5eUMSBetgFfaFajlrgu-s0liDE/view?usp=sharing 

** 2.use-contract.sh **

This video shows contract methods being called.

This video demonstrates how to run the contract functions. https://drive.google.com/file/d/1i8PU4vPlbLRcnEFq-7vq23Og0ewdymAE/view?usp=sharing

** 3.cleanup.sh **

This video demonstrates how to run the clean up scripts. https://drive.google.com/file/d/1l6q2EKWPDFk3cbuHI7MqVr1uoVHHAEu-/view?usp=sharing


## The file system


├── README.md                          # this file
├── as-pect.config.js                  # configuration for as-pect (AssemblyScript unit testing)
├── asconfig.json                      # configuration for AssemblyScript compiler (supports multiple contracts)
├── package.json                       # NodeJS project manifest
├── scripts
│   ├── 1.dev-deploy.sh                # helper: build and deploy contracts
│   ├── 2.use-contract.sh              # helper: call methods on ContractPromise
│   ├── 3.cleanup.sh                   # helper: delete build and deploy artifacts
│   └── README.md                      # documentation for helper scripts
├── src
│   ├── as_types.d.ts                  # AssemblyScript headers for type hints
│   ├── simple                         # Contract 1: "Simple example"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for contract 1
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for contract 1
│   │       └── course.ts              # class declaration for contract 1. The class is instantiated in contract 1  
│   ├── tsconfig.json                  # Typescript configuration
│   └── utils.ts                       # common contract utility functions
└── yarn.lock                          # project manifest version lock


You may clone this repo to get started OR create everything from scratch.

Please note that, in order to create the AssemblyScript and tests folder structure, you may use the command `asp --init` which will create the following folders and files:

```
./assembly/
./assembly/tests/
./assembly/tests/example.spec.ts
./assembly/tests/as-pect.d.ts
```
