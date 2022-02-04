const solc = require("solc");
const fs = require("fs");

const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
// console.log(web3);

const fileContent = fs.readFileSync("storage.sol").toString();
// console.log("fileContent:", fileContent);

var input = {
  language: "Solidity",
  sources: {
    "storage.sol": {
      content: fileContent
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log('ABI: ',output.contracts["storage.sol"]["Storage"].abi);
console.log('ByteCode: ',output.contracts["storage.sol"]["Storage"].evm.bytecode.object);
