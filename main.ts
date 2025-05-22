let ready: boolean = false
let parkSensor: boolean = false

radio.on();
radio.setFrequencyBand(50);
radio.setGroup(128);

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "start") {
        ready = true
        return;
        };

        if (ready) {
            let parts = receivedString.split(",")
            if (parts.length == 5) {
                let naklonX = parseFloat(parts[0]);
                let naklonY = parseFloat(parts[1]);
                let horn = parseFloat(parts[2]);
                let park = parseFloat(parts[3]);
                let headlight = parseFloat(parts[4]);

                naklonX = Math.constrain(naklonX, -1023, 1023);
                naklonY = Math.constrain(naklonY, -1023, 1023);
                let speed = Math.map(naklonX, -1023, 1023, -256, 256);
                let turn = Math.map(naklonY, -1023, 1023, -256, 256);
               
                let leftMotorSpeed = speed - turn
                let rightMotorSpeed = speed + turn

                leftMotorSpeed = Math.constrain(leftMotorSpeed, -256, 256);
                rightMotorSpeed = Math.constrain(rightMotorSpeed, -256, 256);

            if(Math.abs(naklonX) > 50 || Math.abs(naklonY) > 50){
                PCAmotor.MotorRun(PCAmotor.Motors.M1, leftMotorSpeed+10)
                PCAmotor.MotorRun(PCAmotor.Motors.M4, rightMotorSpeed+10)
} else {
    PCAmotor.MotorStopAll()
        };

        if (horn == 1) {
            basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
            music.playTone(500, 150)
            basic.pause(100)
            music.playTone(500, 650)
            basic.pause(100)
            basic.clearScreen()
        };

        if (park == 1) {
            parkSensor = !parkSensor

            if (parkSensor) {
                PCAmotor.Servo(PCAmotor.Servos.S1, 150);
                basic.pause(500);
                PCAmotor.Servo(PCAmotor.Servos.S1, 200);
                basic.pause(500);
                PCAmotor.Servo(PCAmotor.Servos.S1, 100);
                basic.pause(500);
                PCAmotor.Servo(PCAmotor.Servos.S1, 150);
            };
        };

        if(headlight == 1) {
            basic.showString("L");
            basic.pause(250);
            basic.clearScreen()
            //tady bude funkce na světla, Neopixel nefunguje
        };
    };
};
});

basic.forever(function(){
    if(parkSensor) {
        let distance = Sensors.ping(DigitalPin.P2, DigitalPin.P1, 500)
        basic.pause(30);

        if (distance <= 40 && distance > 35) {
            music.playTone(400, 250);
            basic.pause(800);
        } else if (distance <= 35 && distance > 30) {
            music.playTone(400, 250);
            basic.pause(500);
        } else if (distance <= 30 && distance > 25) {
            music.playTone(400, 250);
            basic.pause(400);
        } else if (distance <= 25 && distance > 20) {
            music.playTone(400, 250);
            basic.pause(300)
        } else if (distance <= 20 && distance > 15) {
            music.playTone(400, 250);
            basic.pause(200);
        } else if (distance <= 15 && distance > 7) {
            music.playTone(400, 250);
            basic.pause(100);
        }else if (distance <= 7) {
            music.playTone(400, 1000);
        };
    };
});


