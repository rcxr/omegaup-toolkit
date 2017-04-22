"use strict";

const nconf = module.exports = require("nconf");
const path = require("path");

nconf
  .argv()
  .env([
    "DATA_BACKEND",
    "GCLOUD_PROJECT",
    "INSTANCE_CONNECTION_NAME",
    "MONGO_URL",
    "MONGO_COLLECTION",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "NODE_ENV",
    "PORT"
  ])
  .file({ file: path.join(__dirname, "config.json") })
  .defaults({
    DATA_BACKEND: "datastore",
    GCLOUD_PROJECT: "cryptic-hawk-164803",
    PORT: 8080
  });

checkConfig("GCLOUD_PROJECT");

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
