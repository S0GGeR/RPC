const http = require('http');
const fs = require('fs');
const path = require('path');
var array = [10,5,4,12,32,123,42];
const server = http.createServer((req,res)=> {
    let filePath = path.join(__dirname, req.url === '/' ? 'graph.html' : req.url);
    const ext = path.extname(filePath);
    let ContentType = 'text/html';
    switch (ext){
        case '.css':
            ContentType = 'text/css';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.html':
            ContentType = 'text/html';
            break;
        default:
            ContentType = '';
    }
    if(!ext){
        filePath += '.html'
    }
    if  (req.method === 'POST' && req.url === '/server.js') {
        let body = '';
        req.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            let post = JSON.parse(body);
            if(post['method'] === 'getvalue') {
                if(typeof (post['params'][0]) === 'number') {
                    let value = array[post['params']];
                    res.writeHead(200, 'Everything is ok!', {
                        'Content-Type': 'application/json'
                    });
                    let response = JSON.stringify({"jsonrpc": "2.0", "result": [value], "id": 1});
                    res.end(response);

                }
            else {
                    res.writeHead(200, 'Everything is ok!', {
                        'Content-Type': 'application/json'
                    });
                    let response = JSON.stringify({"jsonrpc": "2.0", "error": "Invalid input","result": [], "id": 1});
                    res.end(response);

                }
            }
            if(post['method'] === 'getlength') {
                let length = array.length;
                res.writeHead(200, 'Everything is ok!', {
                    'Content-Type': 'application/json'
                });
                let response = JSON.stringify({"jsonrpc": "2.0", "result": [length], "id": 2});
                res.end(response);
            }
            if(post['method'] === 'putvalue') {
                let PUT = JSON.parse(body);
                if (typeof (PUT['params'][1]) == 'number' && typeof (PUT['params'][0]) === 'number') {
                    array[PUT['params'][1]] = PUT['params'][0];
                    res.writeHead(200, 'Everything is ok!', {
                        'Content-Type': 'application/json'
                    });
                    let response = JSON.stringify({"jsonrpc": "2.0", "result": [], "id": 3});
                    res.end(response);
                }
                else {
                    res.writeHead(200, 'Everything is ok!', {
                        'Content-Type': 'application/json'
                    });
                    let response = JSON.stringify({"jsonrpc": "2.0", "error": "Invalid input","result": [], "id": 3});
                    res.end(response);

                }
            }



        });


    }
    else {
        fs.readFile(filePath, (err, data) => {
            if (err) {

            } else {
                res.writeHead(200, {
                    'Content-Type': ContentType
                });
            }
            res.end(data);

        });
    }
});
server.listen(8030, () => {
    console.log('Server has been started ....')
});


