var con = require('./db.js');

// 15 secs block time average == 240 blocks/hr == 5760 blocks/day
// var to_block = web3.eth.getBlock("latest").number - 1;
// var from_block = to_block-1;

const args = process.argv;

if (!args[5]) {
  console.log("truffle exec scripts/import_erc20_contract.js from_block to_block");
}

// var from_block = 1599207;
var from_block = args[4];
var to_block = args[5];

console.log("truffle exec scripts/import_erc20_contract.js "+from_block+" "+to_block);

// 5311232

var human_standard_token_abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "NAME",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "SYMBOL",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "DECIMALS",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [
      {
        "name": "_initialAmount",
        "type": "uint256"
      },
      {
        "name": "_tokenName",
        "type": "string"
      },
      {
        "name": "_decimalUnits",
        "type": "uint8"
      },
      {
        "name": "_tokenSymbol",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      },
      {
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  }
];

module.exports = function() {

  var options = {
    fromBlock: from_block,
    toBlock: to_block,
    // address: "0xf1f64f6b8e17dd68c1db10b0eed3d2541a6c09ab"
    topics: [web3.sha3("Transfer(address,address,uint256)")]
  };

  var filter = web3.eth.filter(options);

  filter.get(function (error, results) {
    if (!error) {
      for (let e of results) {
        let contract_address = e.address;
        let block_number = e.blockNumber;
        let topics = e.topics;
        let address_from = '';
        let address_to = '';
        let name = symbol = decimals = total_supply = '';

        // value based on the token decimals
        let val = (parseInt(e.data) / Math.pow(10, 18)).toFixed(4);

        if (topics[1]) {
          address_from = '0x' + topics[1].substring(26);
        }
        if (topics[2]) {
          address_to = '0x' + topics[2].substring(26);
        }
        // dont bother recording if no to and from address
        if (address_from && address_to) {

          let contract = web3.eth.contract(human_standard_token_abi).at(contract_address);

          try {
            name = contract.name();
          }
          catch (ex) {
            try {
              name = contract.NAME();
            }
            catch (e) {
              name = 'UNKNOWN';
            }
          }

          try {
            symbol = contract.symbol();
          }
          catch (ex) {
            try {
              symbol = contract.SYMBOL();
            }
            catch (e) {
              symbol = 'UNKNOWN';
            }
          }

          try {
            decimals = contract.decimals().toNumber();
          }
          catch (ex) {
            try {
              decimals = contract.DECIMALS().toNumber();
            }
            catch (e) {
              decimals = 0;
            }
          }

          total_supply = (contract.totalSupply().toNumber() / Math.pow(10, decimals)).toFixed(4);

          let sql = "INSERT INTO erc20_contract (contract_address, name, symbol, decimals, total_supply, block_number) VALUES ('" + contract_address + "','" + name + "','" + symbol + "','" + decimals + "','" + total_supply + "','" + block_number + "')";
          try {
            con.query(sql);
          }
          catch(err) {

          }
          console.log(sql);

          // con.query(sql, function (error, results, fields) {
          //   // if (error) throw error;
          //   console.log(sql);
          // });

        }
      }
      console.log("All done");
      process.exit();
    }
  });
}

