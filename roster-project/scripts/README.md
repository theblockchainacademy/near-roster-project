## Setting up your terminal

The scripts in this folder are designed to help you demonstrate the behavior of the contract(s) in this project.

It uses the following setup:

- Commands

  1.dev-deploy.sh                # helper: build and deploy contracts
  2.use-contract.sh              # helper: call methods on ContractPromise
  3.cleanup.sh                   # helper: delete build and deploy artifacts
  


*This window is used to render the contract account storage

  export CONTRACT=               # depends on deployment

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  
---

## OS Support

### Linux

- The `watch` command is supported natively on Linux
- To learn more about any of these shell commands take a look at [explainshell.com](https://explainshell.com)

### MacOS

- Consider `brew info visionmedia-watch` (or `brew install watch`)

### Windows

- Use Ubuntu for Windows
