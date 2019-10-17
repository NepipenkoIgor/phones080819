console.log('Start script');

const http = require('http');
const staticServer = require('node-static');
const server = new staticServer.Server(`${__dirname}/`,
    {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    }
);
http.createServer((req, res) => {
    console.log(req.headers)
    server.serve(req, res)
}).listen(3000);

