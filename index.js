var convert = require('color-convert');
var makePwm = require("adafruit-pca9685");
var Service, Characteristic;

var pwm = makePwm();
pwm.setFreq(200)

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-pwmhat', 'PWM-Devices', pwmDevice);
}

function pwmDevice(log, config) {

  this.log = log;
  this.name = config['name'];
  this.pwmRchannel = config['pwmRchannel'];
  this.pwmGchannel = config['pwmGchannel'];
  this.pwmBchannel = config['pwmBchannel'];

  this.Brightness = 0;
  this.On = 0;
  this.Saturation = 0;
  this.Hue = 0;

  this.log("++ Initialized '" + this.name + "'");



  this.service = new Service.Lightbulb(this.name);

  this.infoService = new Service.AccessoryInformation();
  this.infoService
    .setCharacteristic(Characteristic.Manufacturer, 'Gunnar Bjorkman')
    .setCharacteristic(Characteristic.Model, 'RPi RGB Controller')
    .setCharacteristic(Characteristic.SerialNumber, 'Version 0.0.1');
}

pwmDevice.prototype.setColor = function() {



this.log(this.Hue + "; " + this.Brightness + ": " + this.Saturation)

  var color = convert.hsv.rgb(this.Hue, this.Saturation, this.Brightness);

this.log(color[0]);

  if (!this.On) {
    color[0] = 0;
    color[1] = 0;
    color[2] = 0;
    pwm.setPwm(this.pwmRchannel, 0, 1);
    pwm.setPwm(this.pwmGchannel, 0, 1);
    pwm.setPwm(this.pwmBchannel, 0, 1);
  }


  color[0] = ((color[0] + 1) * 16) - 1;
  color[1] = ((color[1] + 1) * 16) - 1;
  color[2] = ((color[2] + 1) * 16) - 1;

  pwm.setPwm(this.pwmRchannel, 0, color[0]);
  pwm.setPwm(this.pwmGchannel, 0, color[1]);
  pwm.setPwm(this.pwmBchannel, 0, color[2]);

  this.log("set color to", color[0], color[1], color[2]);
};

pwmDevice.prototype.getServices = function() {
  var lightbulbService = new Service.Lightbulb(this.name);
  var bulb = this;

  lightbulbService
    .getCharacteristic(Characteristic.On)
    .on('get', function(callback) {
      callback(null, bulb.On);
    })
    .on('set', function(value, callback) {
      bulb.On = value;
      bulb.log("power to " + value);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Brightness)
    .on('get', function(callback) {
      callback(null, bulb.Brightness);
    })
    .on('set', function(value, callback) {
      bulb.Brightness = value;
      bulb.log("brightness to " + value);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Hue)
    .on('get', function(callback) {
      callback(null, bulb.Hue);
    })
    .on('set', function(value, callback) {
      bulb.Hue = value;
      bulb.log("hue to " + value);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Saturation)
    .on('get', function(callback) {
      callback(null, bulb.Saturation);
    })
    .on('set', function(value, callback) {
      bulb.Saturation = value;
      bulb.log("saturation to " + value);
      bulb.setColor();
      callback();
    });

  return [lightbulbService];
};
