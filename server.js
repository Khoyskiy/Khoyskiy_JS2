const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let headers;
        const data = [];
        const readFile = fs.createReadStream('zaput.csv');
        readFile.pipe(split2()).pipe(
            through2.obj((chunk, enc, callback) => {
                if (!headers) {
                    headers = chunk.split(',');
                } else {
                    const column = chunk.split(',');
                    data.push(headers.reduce((obj, h, i) => ({ ...obj, [h]: column[i] }), {}));
                }
                callback();
            }),
        );

        readFile.on('end', () => {
            res.writeHead(200);
            res.end(JSON.stringify(data, false, 3));
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(5000, () => {
    console.log('Server started on port 5000');
});
