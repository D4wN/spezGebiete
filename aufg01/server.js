var http = require('http');
// var io = require('socket.io');
var fs = require("fs");
var mime = require('mime');

var logfile = [];

// Aufgabe 1.2 |--------------------------------------------------------------------------------------------------------
/*
 * wird in der URL ein Dateiname angegeben, so soll der Inhalt dieser Datei aus einem Verzeichnis zum Client transportiert werden.
 * */
var streamingFile = function (req, res, callback) {
    process.nextTick(
        function () {
            var url = String(req.url).substring(1);
            var filePath = "./" + url;

            if (!fs.existsSync(filePath)) {
                var status = 404;
                res.writeHead(status, {'Content-Type': 'text/plain'});
                res.end('Cant find the file: ' + filePath + ' \n');
                callback("Method: GET Status:" + status + " URL: " + filePath + " FROM: " + req.connection.remoteAddress);
            }

            var mimetype = mime.lookup(filePath);
            var status = 200;
            res.writeHead(status, {'Content-Type': mimetype});
            var stream = fs.createReadStream(filePath);
            stream.pipe(res);

            callback("Method: GET Status:" + status + " URL: " + filePath + " FROM: " + req.connection.remoteAddress);
        });
};

// Aufgabe 1.1 |--------------------------------------------------------------------------------------------------------
/*
 * ...
 * so wird die aktuelle Uhrzeit ermittelt und es wird ein JSON-Dokument erzeugt,
 * das die Sekunde, Minute, Stunde der aktuellen Zeit enthält.
 * */
var currenttime = function (req,res, callback) {
    process.nextTick(
        function () {
            console.log("Should Currenttime ");

            var date = new Date();
            var current_hour = date.getHours();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
            res.end();

            callback("Method: GET Status:" + 200 + " URL: /currenttime" + " FROM: " + req.connection.remoteAddress );
        },0);
};

var writeLog = function (logMsg) {
    logfile.push(logMsg);
};

var switchAction = function (req, res) {
    // Filter url
    var url = String(req.url).substring(1);

    if (url == "currenttime") {
        currenttime(req, res, writeLog);
    } else if (url == "log") {
        // TODO: Client am log anmelden
    } else {
        streamingFile(req, res, writeLog );
    }
};

http.createServer(switchAction).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');