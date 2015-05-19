var http = require("http"),
    querystring = require('querystring'),
    utils = require('util'),
    mongojs = require("mongojs"),
    url = require('url'),
    fs = require('fs');

var databaseUrl = "mongoData"; // "username:password@example.com/mydb"
var collections = ["zips"];
var db = mongojs.connect(databaseUrl, collections);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('MongoDB connected');
});


var server = http.createServer(requestHandler);

function dataSearch(cityName, res) {
    res.pathname = cityName;
    res.writeHead(200, "OK", {'Content-Type': 'application/json', 'Location': cityName});
    var cityName = cityName.toUpperCase();

    var found = db.zips.find({"city": cityName}, function (err, records) {
        if (err) {
            console.log("There was an error executing the database query.");
            res.write('There is an error occured')
            res.end();
            return;
        }

        var html = '<h2>Citys of zip</h2>',
            i = records.length;

        while (i--) {
            html += '<p><b>Name:</b> '
                + records[i].city;
        }
        if (records.length <= 0) {
            res.write('<p> There is no Entry for ' + cityName + '</p>')
            res.end();
            return;
        }


        var string = JSON.stringify(records);
        //var data = JSON.parse(string);

        res.write(string);

        res.end();
        //JSON.stringify(records); //return data as JSON
    });
}

function requestHandler(req, res) {
    var city = "";
    var zips = "";
    if(req.url.length > 6 && req.url.substring(0,6) == "/zips/"){
        zips = req.url.substring(0,6);
        city = req.url.substring(6);
    }
    console.log(zips+city);
    switch (req.url) {
        case '/':
            // show the user a simple form
            fs.readFile('./index.html', function (err, html) {
                if (err) {
                    res.write('There is an error occured');
                }
                console.log("[200] " + req.method + " to " + req.url);
                res.writeHead(200, "OK", {'Content-Type': 'text/html'});
                res.write(html);
                res.end();
            });

            break;

        case zips+city:
            if (req.method == 'GET'){

                dataSearch(city, res);

            } else if (req.method == 'POST' ) {
                var fullBody = '';

                req.on('data', function (chunk) {
                    fullBody += chunk.toString();
                });

                req.on('end', function () {
                    var decodedBody = querystring.parse(fullBody);
                    city = decodedBody.city;
                    dataSearch(city, res);
                });

            } else {
                console.log("[405] " + req.method + " to " + req.url);
                res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
                res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
            }

            break;
        default:
            res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
            res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
            console.log("[404] " + req.method + " to " + req.url);

    }

}

server.listen(1234);
console.log("Server ist Running");