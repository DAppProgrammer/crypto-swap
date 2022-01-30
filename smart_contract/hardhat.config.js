require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/-T5dg-en08fCxb3PqWITQgKJKlKD6THL",
      accounts: [
        "e2bdc0b591fae4c69c604c54cc769987bbc76f8a64dc4aef84a2851a5b815c2c"
      ]
    }
  }
};
