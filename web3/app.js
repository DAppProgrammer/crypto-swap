const Web3 = require("web3");
const { toWei } = require("web3-utils");
const web3 = new Web3("HTTP://127.0.0.1:7545");

const account1 = "0x5EA268de7aB382EF01E96b3bDbe3C45B4Fc085E3";
const account2 = "0x089550Fb58125d3866F35366dea34dfE348A0023";

let contract = new web3.eth.Contract(
  [
    {
      inputs: [],
      name: "retrieve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256"
        }
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  "0xf5590384fCAe240A1322E05fFA479716C0DB07fd"
);

console.log(contract.methods);


(async () => {
  const val1 = await contract.methods.retrieve().call();
  console.log("waited val1", val1);
  await contract.methods.store(100).send({ from: account1 });
  const val2 = await contract.methods.retrieve().call();
  console.log("waited val2", val2);
})();

// web3.eth.getBalance(account1, (err, res) => {
//   const balance = web3.utils.fromWei(res, "ether");

//   web3.eth.sendTransaction(
//     { from: account1, to: account2, value: toWei("0.5", "ether") },
//     (err, tx) => {
//       console.log("transaction:", tx);
//       web3.eth.getBalance(account1, (err, res) => {
//         const balance = web3.utils.fromWei(res, "ether");
//         console.log("Account1 balance (after transaction", balance);
//       });
//     }
//   );
//   console.log("Account1 balance (before transaction", balance);
// });
