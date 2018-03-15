var con = require('./db.js');

con.connect(function(err) {
  if (err) throw err;
  console.log("MYSQL Connected!");
  // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  var options = {
    fromBlock: "latest"-1,
    toBlock: "latest",
    // address: "0xf1f64f6b8e17dd68c1db10b0eed3d2541a6c09ab"
    topics: [web3.sha3("Transfer(address,address,uint256)")]
  };

  var filter = web3.eth.filter(options);

  filter.get(function(error, result) {
    if (!error) {
      console.log(result);
    }
  });

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
