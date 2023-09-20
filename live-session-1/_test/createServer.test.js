const createServer = require('../createServer');
 
describe('A HTTP Server', () => {
  describe('when GET /division', () => {
    it('should respond with a status code of 200 and the payload value is division result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 2;

      const server = createServer();
 
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });
 
      // Assert
      const { value } = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);

      const expectedValue = 12;
      expect(value).toEqual(expectedValue);
      expect(typeof(value)).toEqual('number');
    });
  });
});