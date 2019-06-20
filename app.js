/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// [START ipfs_daemon]
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
// [END ipfs_daemon]
