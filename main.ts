let maxFrequency: number = 83
let minFrequency: number = 1
let ready: boolean = false

radio.on();
radio.setGroup(minFrequency);

input.onButtonPressed(Button.AB, function () {
    music.playTone(300, 500);
    basic.showNumber(3);
    basic.pause(300);
    music.playTone(300, 500);
    basic.showNumber(2);
    basic.pause(300);
    music.playTone(300, 500);
    basic.showNumber(1);
    basic.pause(300);

    basic.showIcon(IconNames.Target);
    music.playTone(600, 700);
    basic.clearScreen();

    radio.sendString("start");
    ready = true;
})

radio.onReceivedString(function (recivedString: string) {
    if (recivedString === "start") {
        ready = true
    }
})

basic.forever(function () {
    if (ready) {
        for (let i = minFrequency; i <= maxFrequency; i++) {
            radio.setGroup(i);
            console.logValue("Frequency = ", i);
            basic.pause(2000)
        }

        for (let i = maxFrequency; i >= minFrequency; i--) {
            radio.setGroup(i);
            console.logValue("Frequency = ", i);
            basic.pause(2000);
        }
    }
})


