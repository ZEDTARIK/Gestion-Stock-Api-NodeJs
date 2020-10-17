const { json } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//MidllWare
app.use(express.json());

//
const port = process.env.port || 3000;
app.listen(port, () => console.log('Server Working'));