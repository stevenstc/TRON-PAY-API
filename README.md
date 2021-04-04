# TRON-PAY-API
Una API sencilla para generar wallets de forma segura por medio de Express para recibir pagos


/generar/wallet
Metodo POST
header token

response
´´´´json
{
  status: "200"
  data:{
    time: 1617494748,
    address: "TBEhx2CjKcr62Zg4PnEm5FQMr2EVrUfXoM",
    key: "Adrdftgyhujikoadwybkhunm09876daw7t6hj899"
  }
}
´´´´

/trasferir/owner
Metodo POST
header token
data {
  key: "Adrdftgyhujikoadwybkhunm09876daw7t6hj899"
}

response
´´´´json
{
  status: "200"
  data:{
    time: 1617494748
    from: "TBEhx2CjKcr62Zg4PnEm5FQMr2EVrUfXoM",
    to: "TB7RTxBPY4eMvKjceXj8SWjVnZCrWr4XvF",
    key: "Adrdftgyhujikoadwybkhunm09876daw7t6hj899"
  }
}
´´´´


/consultar/saldo/:wallet a consultar
Metodo GET

response
´´´´json
{
  status: "200"
  data:{
    time: 1617494748,
    address: "TB7RTxBPY4eMvKjceXj8SWjVnZCrWr4XvF",
    tron: 2500,
    usd: 250
  }
}
´´´´
