const Device = require("./base");
const mixins = require("./mixins");
const Shelly1 = require("./shsw-1");

class Shelly1Temp extends Shelly1 {
  constructor(id) {
    super("SHSW-1T", id);

    this._defineProperty("temperature", 0, 55, Number);

    mixins.relay(this, 0, 112);
  }

  _getHttpSettings() {
    return {
      sensors: {
        temperature_threshold: 1,
        temperature_unit: "C",
      },
      relays: [this._getRelay0HttpSettings()],
      ext_sensors: {
        temperature_unit: "C",
      },
      ext_temperature: {
        0: {
          overtemp_threshold_tC: 25.6,
          overtemp_threshold_tF: 78.1,
          undertemp_threshold_tC: 18.4,
          undertemp_threshold_tF: 65.1,
          overtemp_act: "disabled",
          undertemp_act: "disabled",
          offset_tC: 0,
          offset_tF: 0,
        },
      },
    };
  }

  _getHttpStatus() {
    return {
      relays: [this._getRelay0HttpStatus()],
      tmp: {
        value: this.temperature,
        units: "C",
        tC: this.temperature,
        tF: (this.temperature * 9) / 5 + 32,
        is_valid: true,
      },
      ext_sensors: {
        temperature_unit: "C",
      },
      ext_temperature: {
        0: {
          hwID: 0,
          tC: this.temperature,
          tF: (this.temperature * 9) / 5 + 32,
        },
      },
    };
  }
}

module.exports = Shelly1Temp;
