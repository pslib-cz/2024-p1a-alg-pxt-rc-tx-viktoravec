let ready: boolean = false
let backSensor: boolean = false

radio.on()
radio.setFrequencyBand(50)
radio.setGroup(128)

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "start") {
        ready = true
        }

        if (ready) {
            let parts = receivedString.split(",")
            if (parts.length == 2) {
                let naklonX = parseFloat(parts[0])
                let naklonY = parseFloat(parts[1])

                naklonX = Math.constrain(naklonX, -1023, 1023)
                naklonY = Math.constrain(naklonY, -1023, 1023)
                let speed = Math.map(naklonX, -1023, 1023, -255, 255)
                let turn = Math.map(naklonY, -1023, 1023, -255, 255)
               
                let leftMotorSpeed = speed - turn
                let rightMotorSpeed = speed + turn

                leftMotorSpeed = Math.constrain(leftMotorSpeed, -255, 255)
                rightMotorSpeed = Math.constrain(rightMotorSpeed, -255, 255)

if(Math.abs(naklonX) > 20 && Math.abs(naklonY) > 20){
                PCAmotor.MotorRun(PCAmotor.Motors.M1, leftMotorSpeed)
                PCAmotor.MotorRun(PCAmotor.Motors.M4, rightMotorSpeed)
} else {
    PCAmotor.MotorStopAll()
        }
    }
}
        
if(receivedString =="back"){
backSensor = !backSensor

if(backSensor){
            PCAmotor.Servo(PCAmotor.Servos.S1, 150);
            basic.pause(500);
            PCAmotor.Servo(PCAmotor.Servos.S1, 200);
            basic.pause(500);
            PCAmotor.Servo(PCAmotor.Servos.S1, 100);
            basic.pause(500);
            PCAmotor.Servo(PCAmotor.Servos.S1, 150);
        }
    }
})

basic.forever(function(){
    if(backSensor){
        let distance = Sensors.ping(DigitalPin.P2, DigitalPin.P1, null)

        if (distance < 40 && distance > 30) {
            music.playTone(400, 250);
            basic.pause(700);
            } else if (distance <= 30 && distance > 20) {
                music.playTone(400, 250);
                basic.pause(400);
                } else if (distance <= 20 && distance > 10) {
                    music.playTone(400, 250);
                    basic.pause(100);
                    } else if (distance < 10) {
                        music.playTone(400, 1000);
                        }
    }
})

radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber == 6057) {

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
        basic.pause(200)
        basic.clearScreen()
    }
})