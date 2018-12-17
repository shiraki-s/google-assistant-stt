var fs = require('fs');
var express = require("express");
var multer = require('multer');
var app = express();
var upload = multer({ dest: 'uploads/' })

const execSync = require('child_process').execSync;
app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/stt', upload.single('fileData'), function (req, res, next) {
    execSync('ffmpeg -i uploads/' + req.file.filename + ' -loglevel quiet -ar 16000 -ac 1 ' + req.file.filename + '.wav');
    execSync('python -m pushtalk --device-id ' + process.env.DEVICE_ID + ' --device-model-id ' + process.env.MODEL_ID + ' -i ' + req.file.filename + '.wav --lang ja_JP');

    fs.readFile('result.txt', 'utf8', (error, data) => {
        if (error) {
            res.send('error');
            return;
        }
        res.send(data);
        execSync('rm uploads/' + req.file.filename);
        execSync('rm ' + req.file.filename + '.wav');
        execSync('rm result.txt');
    });
});

var server = app.listen(process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
    console.log(process.env.DEVICE_ID);
    console.log(process.env.MODEL_ID);
});