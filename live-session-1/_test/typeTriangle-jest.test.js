const typeTriangle = require('../typeTriangle');

describe('sebuah fungsi typeTriangle', () => {
    it('harus mengembalikan Segitiga sama sisi ketika semua nilai sisi sama', () => {
        expect(typeTriangle(3, 3, 3)).toStrictEqual('Segitiga sama sisi');
    });

    it('harus mengembalikan Segitiga sama kaki ketika ada sisi yang sama', () => {
        expect(typeTriangle(3, 4, 3)).toStrictEqual('Segitiga sama kaki');
    });

    it('harus mengembalikan Segitiga sembarang ketika semua nilai sisi beda', () => {
        expect(typeTriangle(3, 4, 5)).toStrictEqual('Segitiga sembarang');
    });
});
