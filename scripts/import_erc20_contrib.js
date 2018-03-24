var con = require('./db.js');

var to_block = web3.eth.getBlock("latest").number - 1;
var from_block = to_block - 50;

console.log("latest block is "+to_block);


module.exports = function() {
  con.connect(function (err) {
    if (err) {
      console.log('error connecting');
    }

    var options = {
      fromBlock: from_block,
      toBlock: to_block,
      // address: "0xf1f64f6b8e17dd68c1db10b0eed3d2541a6c09ab"
      topics: [web3.sha3("Transfer(address,address,uint256)")]
    };

    var filter = web3.eth.filter(options);

    filter.get(function (error, result) {
      if (!error) {
        result.forEach( (e) => {
          let contract_address = e.address;
          let blocknumber = e.blockNumber;
          let txhash = e.transactionHash;
          let topics = e.topics;
          let address_from = '';
          let address_to = '';

          // value based on the token decimals
          let val = (parseInt(e.data) / Math.pow(10,18)).toFixed(4);

          if (topics[1]) {
            address_from = '0x'+topics[1].substring(26);
          }
          if (topics[2]) {
            address_to = '0x'+topics[2].substring(26);
          }
          // dont bother recording if no to and from address
          if (address_from && address_to) {
            let sql = "INSERT INTO erc20_contrib (contract_address, address_from, address_to, val, txhash, blocknumber) VALUES ('"+contract_address+"','"+address_from+"','"+address_to+"','"+val+"','"+txhash+"','"+blocknumber+"')";
            con.query(sql, function (db_err, db_res) {
              console.log(sql);
            });
          }
        });
      }
    });

  });
}
