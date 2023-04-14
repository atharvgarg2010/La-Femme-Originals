// requirements
var mysql = require('mysql');
const express = require('express')
var cookieParser = require('cookie-parser')
var LocalStorage = require('node-localstorage').LocalStorage,
  // variables
  store = new LocalStorage('./scratch');
const app = express()
const port = 3000
a = []
resultt = []
productss = []
var under999pro = []
var under499pro = []
const orderbyid = []
var orderss = []


const crypto = require("crypto");


// Express Setup
app.set('view engine', 'ejs');
app.use('/assets', express.static('assetxs'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// Mysql setup
var con = mysql.createConnection({
  host: "di.c04skukvkgsx.eu-west-2.rds.amazonaws.com",
  user: "admin",
  password: "coding123-",
  database: "femme",
});
// Mysql connection check
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// About 
function getservices() {
  con.query("select * from about", function (err, result) {
    if (err) throw err;
    // console.log(result);
    a = result
  })
  console.log("Bhat");
}

con.query("select * from home", function (err, result) {
  if (err) throw err;
  // console.log(result);
  resultt = result
  // console.log(resultt);
})
function getproducts() {
  con.query("select * from products", function (err, result) {
    if (err) throw err;
    // console.log(result);
    productss = result
    console.log(productss);
    productss.forEach(pro => {
      console.log(pro['proprice']);
    });
  })
}
function getunder999products() {
  con.query("SELECT * FROM femme.products where proprice > 500 and proprice<1000;", function (err, result) {
    if (err) throw err;
    console.log(result, "A");
    under999pro = result
  })
}
function getunder499products() {
  con.query("SELECT * FROM femme.products where proprice < 500;", function (err, result) {
    if (err) throw err;
    console.log(result, "A");
    under499pro = result
  })
}
app.get('/', (req, res) => {
  getunder999products()
  getproducts()
  getservices()
  getunder499products()
  // console.log(a);
  // res.send("D")
  res.render("home", { title: resultt[0]['htitle'], subtitle: resultt[0]['hdesc'], Scontent: a, products: productss })
})
app.get('/checkout', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(a);
  // res.send("D")
  res.render('checkout')
})
app.get('/About', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  res.cookie("name", "value")
  console.log('Cookies: ', req.cookies)
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("About", { Scontent: a })
})

app.get('/Products', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("Products", { products: productss })
})
app.get('/under999', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  console.log(under999pro, "SSSSSSSSSSSSSss");
  res.render("under999", { products: under999pro })
})
app.get('/under499', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  console.log(under499pro, "SSSSSSSSSSSSSss");
  res.render("under999", { products: under499pro })
})
var resulttt = []
var resulttt = []


app.get('/Products/:id', async function (req, res) {
  getunder999products()
  getservices()
  getunder499products()
  const data = await someAsyncFunction(req.params['id']);
  res.render("Product", { product: data })

})
const cart = new Array
app.post('/thanku', async (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  console.log(req.body);
  store.setItem("cart", req.body)
  cart[0] = req.body
  console.log(cart[0]);
  res.render("cart", { products: req.body })

})
app.post('/getorderbyid', async (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  con.query(`SELECT * FROM orders where orderid = '${req.body['orderid']}';`, function (err, result) {
    if (err) throw err;
    console.log(result, "Aaaaaaaaaaaaaaa");
    orderss = result
  })
  res.send("done")

})
app.get('/ordersssa', async (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  console.log(orderss, "aaaaaaagggggggggggggg");
  res.render("getorderss", {orderdet : orderss})

})
function deletepro(id) {
  con.query(`DELETE FROM products WHERE proid = '${id['id']}';`, function (err, result) {
    if (err) throw err;
    console.log(result, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  })
}
app.post('/deletepro', async (req, res) => {
  getproducts()
  getservices()
  getunder499products()
  getunder999products()
  deletepro(req.body)
  console.log(req.body, "AAAAAAAaaaaaaaaaaaaaathrvg");
  res.send("done")

})
const addproduct_to_sql = (prodet) => {
  proname = prodet['proname']
  prodesc = prodet['prodesc']
  proprice = prodet['proprice']
  proimg = prodet['proimg']
  console.log(proname);
  console.log(prodesc);
  console.log(proprice);
  console.log(proimg);
  const id = crypto.randomBytes(3).toString("hex");

  console.log(id);
  con.query(`INSERT INTO products(proname, prodesc, proprice, proimg, proid) VALUES ('${proname}', '${prodesc}', '${proprice}', '${proimg}', '${id}')`, function (err, result) {
    if (err) throw err;
    // console.log(result);
  })
}
addser_to_sql = (prodet) => {
  proname = prodet['sname']
  prodesc = prodet['sdesc']
  proimg = prodet['simg']
  console.log(proname);
  console.log(prodesc);
  console.log(proimg);

  con.query(`INSERT INTO about(Stitle, Sdesc, Simg) VALUES ('${proname}', '${prodesc}', '${proimg}')`, function (err, result) {
    if (err) throw err;
    // console.log(result);
  })
}
app.get('/cart', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("cart", { products: cart })
})
app.get('/AddProduct', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("addproduct")
})
app.get('/Addservice', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("addservice")
})
app.get('/getorderssss', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  console.log(orderbyid, "aaaaaaaaaaaaaaaaaaa");
  // res.send("D")
  res.render("getorderss", {orderdet : orderbyid[0]})
})
app.post('/addpro', (req, res) => {
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  addproduct_to_sql(req.body)
  getservices()
  getunder499products()
  getunder999products()
  res.send("done")
})
app.post('/addser', (req, res) => {
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  addser_to_sql(req.body)
  getservices()
  getunder999products()
  getunder499products()

  res.send("done")
})

app.post('/orders', (req, res) => {
  // console.log(resultt[0]['htitle']);
  // res.send("D")zs
  getservices()
  getunder999products()
  getunder499products()
  const propro = req.body['products']
  console.log(typeof propro, "Aggggggggg");
  propropro = JSON.stringify(propro)
  const propropro1 = {'id':"D"}
  console.log(propropro1);
  sql = 'INSERT INTO orders(products,orderid) VALUES ?'
  const values = [
    [propro, req.body['orderID']]
  ]
  con.query(sql,[values], function (err, result) {
    if (err) throw err;
    // console.log(result);
  })
  res.send("done")
})
app.get('/check', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("Check", { emailid: "lafemmeoriginals@gmail.com", password: "Atharvgarg" })
})
app.get('/getorderss', (req, res) => {
  getproducts()
  getservices()
  getunder999products()
  getunder499products()
  // console.log(resultt[0]['htitle']);
  // res.send("D")
  res.render("GetOrder")
})

let productwithid = (id) => {
  con.query(`select * from products where proid = '${id}'`, function (err, result) {
    if (err) throw err;
    resulttt = result
    return result
  });
}
async function someAsyncFunction(id) {
  return new Promise((resolve) => {
    productwithid(id)
    setTimeout(() => {
      resolve(resulttt);
    }, 1000);
  });
}
app.get('*', (req, res) => {

  res.render("404")
})