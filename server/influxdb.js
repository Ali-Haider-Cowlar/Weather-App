const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token = process.env.INFLUXDB_TOKEN;
const url = process.env.INFLUXDB_HOST || "https://us-east-1-1.aws.cloud2.influxdata.com";
const org = process.env.INFLUXDB_PORT || "Cowlar";
const bucket = process.env.INFLUXDB_DB || "weather";
const port = process.env.INFLUXDB_PORT || 443;

class Influx {
  constructor() {
    this.influx = new InfluxDB({ url, token, org, port });
    this.writeApi = this.influx.getWriteApi(org, bucket, "ns");
  }

  getWriteApi() {
    return this.writeApi;
  }
}

const influx = new Influx();
module.exports.influx = influx;
