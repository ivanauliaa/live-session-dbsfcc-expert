const assert = require('assert');
const typeTriangle = require('../typeTriangle');

try {
    assert.equal(typeTriangle(3, 3, 3), 'Segitiga sama sisi');
    assert.equal(typeTriangle(3, 4, 3), 'Segitiga sama kaki');
    assert.equal(typeTriangle(3, 4, 5), 'Segitiga sembarang');

    console.log('Semua test passed');
} catch (error) {
    console.error(error);
}
