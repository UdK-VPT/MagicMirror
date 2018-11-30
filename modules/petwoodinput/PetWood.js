var SerialPort = require('serialport');
var emitter = require('events').EventEmitter;
var util = require('util');

function PetWood(serPort, reInit) {
    var me = this;
    var p = new SerialPort(serPort, {baudRate: 115200, dataBits: 8, stopBit:1, parity: 'none'});
    this.port = p;

    // handle incoming bytes
    p.on('data', function (b) { 
        for(var i=0; i < b.length; i++) {
            var v = b.readUInt8(i);
            //console.log('>>> ', v);
            if (v < 128) {
                me.emit('sliderMoved', v);
            } else {
                v -=128;
                switch (v) {
                    case 0:  me.emit('initialized'); break;
                    case 10: me.emit('sliderEntered'); break;
                    case 11: me.emit('sliderReleased'); break;
                    case 12: me.emit('sliderSwipe', 1); break;
                    case 13: me.emit('sliderSwipe', -1); break;
                    case 20:
                    case 21: me.emit('buttonPressed', v-20); break;
                    case 30:
                    case 31: me.emit('buttonReleased', v-30); break;
                    default: me.emit('unknownCommandReceived');
                }
            }
        }
    });

    // send one command byte to the device
    this.sendCommand = function(c) {
        // console.log('<<< ', c);
        me.port.write(Buffer.from([c]));
    }

     // reinitialize (optionally restart) PetWood device
    this.reInit = function(restart) {
        me.sendCommand(128+restart*10);
    }

    // set button [0,1] to off(0), on(1), or auto (any other value)
    this.setButtonLed = function(btn, v) {
        var tmp = 128+btn;
        switch (v) {
            case 1: tmp += 20; break;
            case 0: tmp += 30; break;
            default: tmp += 40;
        }
        me.sendCommand(tmp);
    }

    // reinitialize device on initialization?
    if (reInit)
        me.reInit(false);

    return this;
}
util.inherits(PetWood, emitter);

module.exports = PetWood;
