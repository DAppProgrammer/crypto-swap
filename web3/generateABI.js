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
const abi = output.contracts["storage.sol"]["Storage"].abi;
const byteCode = output.contracts["storage.sol"]["Storage"].evm.bytecode.object;

/* DEPLOY THE CONTRACT */
(async () => {
  const accounts = await web3.eth.getAccounts();
  const account1 = accounts[0];
  const contract = new web3.eth.Contract(abi);

  contract
    .deploy({ data: byteCode })
    .send({ from: account1, gas: 500000 })
    .on("receipt", (receipt) => {
      console.log("Contract address: ", receipt.contractAddress);
    })
    .then((storageContract) => {
      storageContract.methods.retrieve().call((err, data) => {
        console.log("initial val: ", data);
      });
    });
})();
