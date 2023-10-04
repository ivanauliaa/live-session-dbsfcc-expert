const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('should throw error directly use it', () => {
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class');
  });
});
