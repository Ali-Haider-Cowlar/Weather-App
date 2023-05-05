/* eslint-disable no-undef */
const { InfluxDB } = require("@influxdata/influxdb-client");

const token =
  "RLbGs3OBxS6_VF9MQIc2u58P1rDke30W-FLWMSj0a1esPW7Rc3aTSqZ5ROyPmiOzIHwK6tnJcqVzIhFEa1tLEA==";
const url = "http://influxdb2.docker:8086";
const org = "Cowlar";
const bucket = "weather";

class Influx {
  constructor() {
    this.influx = new InfluxDB({ url, token });
  }

  getWriteApi() {
    this.writeApi = this.influx.getWriteApi(org, bucket, "ns");
    return this.writeApi;
  }

  async setPoint(point) {
    const writeApi = this.getWriteApi();
    writeApi.writePoint(point);

    try {
      await writeApi.close();
      console.log('New point has been added: ', point);
      return true;
    } catch (e) {
      console.error(e);
      console.log("\nFinished ERROR");
    }
  }
}

const influx = new Influx();
module.exports.influx = influx;
