const fs = require('fs');
const http = require('http')
const express = require('express');
var fileUpload = require('express-fileupload');
const InsertData = require('./InsertData');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.post("/insertData", InsertData.insertdata)
app.post("/getData", InsertData.getData)

server = http.createServer(app)
server.listen({ port: 8080}, () =>
    console.log(
        'Server ready' 
    )
);

