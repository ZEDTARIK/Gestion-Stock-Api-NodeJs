const { json } = require('express');
const express = require('express');
const app = express();
//const mongoose = require('mongoose');
const authRegister = require('./routes/auth');
const product = require('./routes/product');

//MidllWare
app.use(express.json());
app.use('/api/user', authRegister);
app.use('/api/products', product);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`App working in Port :  http://localhost:/${port}`))