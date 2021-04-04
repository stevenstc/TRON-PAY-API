const express = require('express')
const bodyParser = require("body-parser");

const CoinGecko = require('coingecko-api');
var TronWeb = require('tronweb');

const app = express();
const port = process.env.PORT || 3003;
const token = process.env.APP_MT;
const owner = process.env.APP_OWNER || "TB7RTxBPY4eMvKjceXj8SWjVnZCrWr4XvF";

const TRONGRID_API = process.env.APP_API || "https://api.shasta.trongrid.io";

let network = "shasta";

if (TRONGRID_API == "https://api.shasta.trongrid.io") {

  console.log("Esta api esta conectada en la red de pruebas para pasar a la red principal por favor establezaca la variable de entorno APP_API = https://api.trongrid.io en el archivo .env");

}else{
  network = "trongrid";
  console.log(TRONGRID_API);
}

const CoinGeckoClient = new CoinGecko();



TronWeb = new TronWeb(
  TRONGRID_API,
  TRONGRID_API,
  TRONGRID_API
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async(req,res) => {

    mongoose.connect(uri, options).then(
      () => { res.send("Conectado TRON-PAY-API Exitodamente!");},
      err => { res.send(err); }
    );


});

app.get('/consultar/saldo/:direccion', async(req,res) => {

    let cuenta = req.params.direccion;
    let respuesta = {};

    let saldo = await TronWeb.trx.getBalance(cuenta);
    saldo = saldo/1000000;

    let precio = await CoinGeckoClient.simple.price({
        ids: ['tron'],
        vs_currencies: ['usd']
    });

    precio = precio.data.tron.usd*saldo;

    precio = precio.toFixed(2);
    precio = parseFloat(precio);
    //console.log(precio.data.tron.usd);

    respuesta.status = "200";
    respuesta.network = network;
    respuesta.data = {

      time: Date.now(),
      address: cuenta,
      tron: saldo,
      usd: precio

    }
    res.send(respuesta);

});

app.post('/generar/wallet', async(req,res) => {

    let token2 = req.body.token;
    let respuesta = {};

    if ( token == token2 ) {

      let cuenta = await TronWeb.createAccount();


        respuesta.status = "200";
        respuesta.network = network;
        respuesta.data = {
            time: Date.now(),
            address: cuenta.address.base58,
            privateKey: cuenta.privateKey
          };

        res.send(respuesta);

    }else{
        respuesta.txt = "No autorizado";
        res.send(respuesta);
    }


});

app.post('/trasferir/owner', async(req,res) => {

    let token2 = req.body.token;
    let privateKey = req.body.privateKey;
    let respuesta = {};

    let tronCuenta = new TronWeb(
      TRONGRID_API,
      TRONGRID_API,
      TRONGRID_API,
      privateKey
    );

    let saldo = await tronCuenta.trx.getBalance();

    if ( token == token2 && saldo > 0 ) {


        let id = await tronCuenta.trx.sendTransaction(owner, saldo);

        id = id.transaction.txID;


        respuesta.status = "200";
        respuesta.network = network;
        respuesta.data = {
          time: Date.now(),
          tron: saldo/1000000,
          from: tronCuenta.address.base58,
          to: owner,
          id: id
        };

        res.send(respuesta);

    }else{
        respuesta.txt = "No autorizado";
        if (saldo = 0) {
          respuesta.txt = "No hay saldo para enviar";
        }
        res.send(respuesta);
    }


});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
