/******************************************************************/
// Overloading console.log and console.error to write output
// to debug.log file
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log' , {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

console.error = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
/******************************************************************/
const csv = require('csvtojson')
const Web3 = require('web3')
const ethRPC = 'https://mainnet.infura.io/v3/' + {/* Enter API key for Infura */}
const binance = "https://bsc-dataseed1.binance.org/"
const polygon = "https://rpc-mainnet.maticvigil.com/v1/" + {/* Enter API key for Polygon Matic RPC */}

let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    }
  ];

const main = async () => {
    const web3 = new Web3(binance)
    let ethContractAddress = "0x3883f5e181fccaf8410fa61e12b59bad963fb645" // Theta Token
    let bscContractAddress = "0x7083609fce4d1d8dc0c979aab8c869ea2c873402" // Polkadot Token
    let polygonContractAddress = "0xb33eaad8d922b1083446dc23f610c2567fb5180f" // Uniswap

    let contractAddress = bscContractAddress;
    const filePath = 'polkadot-token-2000-users.csv'
    
    let contract = new web3.eth.Contract(minABI, contractAddress);
    var jsonArray = await csv().fromFile(filePath) // CSV to JSON object
    var batch = new web3.BatchRequest();

    console.log('Adding Addresses into batches');
    jsonArray.forEach((obj) => {
        batch.add(contract.methods.balanceOf(obj["HolderAddress"]).call.request({}, (err, result) => {
          if (err) {
            console.error(err + '\n')
          } else {
            const format = web3.utils.fromWei(result)
            console.log(format)
          }
        }))
    })

    console.log('Batch Created.  Proceeding to execute the batch');
    batch.execute();
}
main()