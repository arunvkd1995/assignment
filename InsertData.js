var fs = require('fs');
const csvjson = require('csvjson');
const json2csv = require('json2csv').parse;
const readFile = require('fs').readFile;
const mongo = require("./connectMongo")
 
const insertdata = async (req, res) => {
    var mimetype = req.files.file.mimetype
    if (mimetype != 'text/csv') {
        var result = {
            status_msg: "FAILED",
        }
        return res.status(200).json(result);
    } else {
        let filePath = await uploadFile(req.files)
        await readCsvFile(filePath, MycallBack)
    }
    async function MycallBack(err, fileContent) {
        var result = {
            status_msg: "FAILED",
        }
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const jsonObj = csvjson.toObject(fileContent);
        const insertResponse = await mongo.insertData(jsonObj)

        if (insertResponse != false) {
            result.status_msg = "SUCCESS"
        }
        return res.status(200).json(result);

    }

}
async function uploadFile(fileData) {
    let filePath = './UploadedCsvFiles/'+ fileData.file.name;
    fileData = Buffer.from(fileData.file.data);
    await fs.writeFile(filePath, fileData, function (err, result) {
        if (err) console.log('error', err);
    });
    return filePath
}
async function readCsvFile(filePath, MycallBack) {
    var dataObj = [];
    var data = await readFile(filePath, 'utf-8', MycallBack);

}

const getData = async (req, res) => {
    var result = {
        status_msg: "FAILED",
    }
    var response = await mongo.mongoResponse()
    var fileName="testdata.csv"
    const csv = json2csv(response);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);

}

module.exports = {
    insertdata, getData
}