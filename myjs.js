 if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     }

     web3.eth.defaultAccount = web3.eth.accounts[0];
     var contract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
 var contractInst = contract.at('0x3806ae22C6c5C28aef008ba197a064871cFC9B59');
 var n = new Ipfs({ repo: 'ipfs-' + Math.random() });
    n.once('ready', () => {
      console.log('Online status: ', n.isOnline() ? 'online' : 'offline');
    });

var _hash;
 $("#push").click(function(){
  n.files.add(new n.types.Buffer($("#string").val()), (err, filesAdded) => {
      if (err) {
        return console.error('Error - ipfs files add', err, res)
      }

      filesAdded.forEach((file) => 
        _hash= file.hash);
 });
  $("#hash").text(_hash);
  contractInst.sendHash(_hash,(err,res)=>{
  if(err)
    console.log(err);
  else
  console.log(res);
  $("#tran").text(_hash);
});
  });



 $("#get").click(function(){
  contractInst.getHash((err,res)=>{
  if(err)
    console.log(err);
  else
    n.files.cat(_hash, function (err, data) {
      if (err) {
        return console.error('Error - ipfs files cat', err, res)
      }

      console.log(data.toString());
      $("#da").text(data.toString());
    });
 });
});

 
