class Car {
    constructor(manufacture, model, year, color) {
        this.manufacture = manufacture;
        this.model = model;
        this.year = year;
        this.color = color;
        this.engineStatus = 'inactive';
    }

    startEngine() {
        this.engineStatus = 'active';
        console.log(`${this.model} ${this.color} is starting`);
    }
}

const xenia = new Car('daihatsu', 'xenia', 2020, 'black');
const avanza = new Car('toyota', 'avanza', 2019, 'white');
const crv = new Car('honda', 'crv', 2020, 'gray');

xenia.startEngine(); // "xenia black is starting"
avanza.startEngine(); // "avanza white is starting"
crv.startEngine();
