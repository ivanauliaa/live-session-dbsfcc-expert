class Engine {
    constructor() {
        this.status = 'inactive';
    }

    activate() {
        this.status = 'active';
    }
}

class Car {
    constructor(engine, engine2, engine3, engine4) {
        this.engine = engine;
    }

    start() {
        this.engine.activate();

        console.log(`status mesin: ${this.engine.status}`);
    }
}

const engine = new Engine();
const car = new Car(engine, engine, engine, engine);
car.start(); // status mesin: active
