/**
 * installing dependacies
 */
const express = require("express");

const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

/**
 * configuring the additional server configuration
 */
app.use(express.static(path.join(__dirname, "./client")));
const httpServer = http.createServer(app);
const httpsOptions = {
  key: fs.readFileSync("./certificates/68307955_localhost.key"),
  cert: fs.readFileSync("./certificates/68307955_localhost.cert")
};
const httpsServer = https.createServer(httpsOptions, app);

/**
 * routers start from here
 */
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/client/index.html"));
});

/**
 * listening on HTTP and HTTPS port bellow
 */
const httpPort = process.env.PORT || 80;
httpServer.listen(httpPort, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on localhost:${httpPort}`);
});

const httpsPort = process.env.PORT || 443;
httpsServer.listen(httpsPort, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on localhost:${httpsPort}`);
});
