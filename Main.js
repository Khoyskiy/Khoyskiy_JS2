const http = require('http');

const server = http.createServer((req, res) => {
    const authHeader = req.headers.authorization;
    if (
        authHeader &&
        authHeader ===
            'Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM'
    ) {
        res.writeHead(200);
        res.end('Authorized');
    } else {
        res.writeHead(401);
        res.end('Not authorized');
    }
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
