class Engine {
    constructor() {
        this.status = 'inactive';
    }

    activate() {
        this.status = 'active';
    }
}

class Car {
    constructor() {
        this.engine = new Engine();
    }

    start() {
        this.engine.activate();

        console.log(`status mesin: ${this.engine.status}`);
    }
}

const car = new Car();
car.start(); // status mesin: active
