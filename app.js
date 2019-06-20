"use strict";

// [START express_ipfs]
const express = require("express");
const IPFS = require("ipfs");

const app = express();

const node = new IPFS();

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Test Page, Please Ignore")
    .end();
});

// Pin to IPFS - change to POST
app.get(
  "/upload",
  asyncMiddleware(async (req, res, next) => {
    const runningInstance = await startNode();
  })
);

const startNode = async () => {
  node.on("ready", () => {
    console.log("Node is running...");
  });
};

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END express_ipfs]
