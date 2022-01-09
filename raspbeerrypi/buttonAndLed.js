const Gpio = require('onoff').Gpio;

let LED = new Gpio(4, 'out');
let button = new Gpio(17, 'in', 'both');

button.watch(function (err, value) {
    if (err) {
        throw err;
    }
    LED.writeSync(value);
});

function unexportOnClose() {
    LED.writeSync(0);
    LED.unexport();
    button.unexport();
}

process.on('SIGNIT', unexportOnClose);
