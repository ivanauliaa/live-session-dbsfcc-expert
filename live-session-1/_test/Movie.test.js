const Movie = require('../Movie');

describe('Movie', () => {
    describe('getSummary function', () => {
        it('should return a correct Movie summary', () => {
            // Arrange
            const payload = {
                id: 1,
                name: 'Secret Wars',
                year: 2026,
            };

            const expectedValue = {
                id: 1,
                title: 'Secret Wars (2026)',
            };

            const movie = new Movie(payload);

            // Action
            const result = movie.getSummary();

            // Assert
            expect(result).toStrictEqual(expectedValue);
        });

        describe('getSummary function with table Test', () => {
            // Arrange
            const tables = [
                {
                    title: 'should return id 1 and title Secret Wars (2026)',
                    payload: { id: 1, name: 'Secret Wars', year: 2026 },
                    expectedValue: { id: 1, title: 'Secret Wars (2026)' },
                },
                {
                    title: 'should return id 2 and title The Avengers (2012)',
                    payload: { id: 2, name: 'The Avengers', year: 2012 },
                    expectedValue: { id: 2, title: 'The Avengers (2012)' },
                },
                {
                    title: 'should return error on empty id, name, year',
                    payload: {},
                    isThrowingError: true,
                    expectedValue: new Error('id, name, and year shouldn\'t be empty'),
                },
            ];
    
            tables.forEach((table) => {
                it(table.title, () => {
                    const movie = new Movie(table.payload);
    
                    // Action & Assert if table.isThrowingError is true
                    if (table.isThrowingError) {
                        expect(movie.getSummary).toThrow(Error);
                        return;
                    }

                    // Action
                    const result = movie.getSummary();
    
                    // Assert
                    expect(result).toStrictEqual(table.expectedValue);
                });
            });
        });
    });
});
