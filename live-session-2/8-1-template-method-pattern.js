class Datastore {
    constructor() {
        if (this.constructor.name === 'Datastore') {
            throw new Error('datastore is abstract and need to be implemented');
        }
    }

    connect() {
        throw new Error('method not implemented');
    }

    query(query) {
        throw new Error('method not implemented');
    }

    disconnect() {
        throw new Error('method not implemented');
    }

    process(query) {
        this.connect();
        const result = this.query(query);
        this.disconnect();
        return result;
    }
}

class MySQLDatastore extends Datastore {
    connect() {
        console.log('mysql connect step');
    }

    query(query) {
        console.log(`mysql execute query: ${query}`);
        return ['some data'];
    }

    disconnect() {
        console.log('mysql disconnect step');
    }
}

class PostgreSQLDatastore extends Datastore {
    connect() {
        console.log('postgresql connect step');
    }

    query(query) {
        console.log(`postgresql execute query: ${query}`);
        return ['some data'];
    }

    disconnect() {
        console.log('postgresql disconnect step');
    }
}

const mySQLDatastore = new MySQLDatastore();
const postgreSQLDatastore = new PostgreSQLDatastore();

mySQLDatastore.process('SELECT * FROM users');
postgreSQLDatastore.process('SELECT * FROM users');
