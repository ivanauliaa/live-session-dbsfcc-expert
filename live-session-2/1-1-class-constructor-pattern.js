const xenia = {
    manufacture: 'daihatsu',
    model: 'xenia',
    year: 2020,
    color: 'black',
    engineStatus: 'inactive',
    startEngine() {
        this.engineStatus = 'active';
        console.log(`${this.model} ${this.color} is starting`);
    },
};

const avanza = {
    manufacture: 'toyota',
    model: 'avanza',
    year: 2019,
    color: 'white',
    engineStatus: 'inactive',
    startEngine() {
        this.engineStatus = 'active';
        console.log(`${this.model} ${this.color} is starting`);
    },
};

const crv = {
    manufacture: 'honda',
    model: 'crv',
    year: 2020,
    color: 'gray',
    engineStatus: 'inactive',
    startEngine() {
        this.engineStatus = 'active';
        console.log(`${this.model} ${this.color} is starting`);
    },
};

xenia.startEngine(); // "xenia black is starting"
avanza.startEngine(); // "avanza white is starting"
crv.startEngine(); 
