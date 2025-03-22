import http from "node:http";

const server = http.createServer((req, res) => {
  return res.end("Hello World 2");
});

server.listen(3333);
