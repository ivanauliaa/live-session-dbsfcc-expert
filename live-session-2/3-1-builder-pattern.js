class Handphone {
    constructor(processor, ram, speaker, screen) {
        this.processor = processor;
        this.ram = ram;
        this.speaker = speaker;
        this.screen = screen;
    }
}

class HandphoneBuilder {
    constructor(processor, ram) {
        this.processor = processor; // wajib ada
        this.ram = ram; // wajib ada

        this.speaker = 'Dolby Atmos'; // default
        this.screen = 'IPS'; // default
    }

    setSpeaker(speaker) {
        this.speaker = speaker;
        return this;
    }

    setScreen(screen) {
        this.screen = screen;
        return this;
    }

    build() {
        return new Handphone(this.processor, this.ram, this.speaker, this.screen);
    }
}

// const myPhone = new HandphoneBuilder('Octa-core', '8GB')
//     .build();

const myPhone = new HandphoneBuilder('Octa-core', '8GB')
    .setScreen('Amoled')
    .build();

console.log(myPhone);
