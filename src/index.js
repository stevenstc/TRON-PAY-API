const express = require('express')
const bodyParser = require("body-parser");

const CoinGecko = require('coingecko-api');
var TronWeb = require('tronweb');

const app = express();
const port = process.env.PORT || 3003;
const token = process.env.APP_MT;

const TRONGRID_API = process.env.APP_API || "https://api.shasta.trongrid.io";

const CoinGeckoClient = new CoinGecko();

console.log(TRONGRID_API);

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

    respuesta.data = {

      time: Date.now(),
      address: cuenta,
      tron: saldo,
      usd: precio

    }
    res.status(200).send(respuesta);

});

app.post('/generar/wallet', async(req,res) => {

    let cuenta = req.params.direccion;
    let sponsor = req.body.sponsor;
    let token2 = req.body.token;
    let respuesta = {};

    if ( token == token2 ) {


        respuesta.txt = "Usuario creado exitodamente";
        respuesta.usuario = users;

        res.send(respuesta);

    }else{
        respuesta.txt = "No autorizado";
        res.send(respuesta);
    }


});

app.post('/generar/wallet', async(req,res) => {

    let cuenta = req.params.direccion;
    let sponsor = req.body.sponsor;
    let token2 = req.body.token;
    let respuesta = {};

    if ( token == token2 ) {


        respuesta.txt = "Usuario creado exitodamente";
        respuesta.usuario = users;

        res.send(respuesta);

    }else{
        respuesta.txt = "No autorizado";
        res.send(respuesta);
    }


});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
