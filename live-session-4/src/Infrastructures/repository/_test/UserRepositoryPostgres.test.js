const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

const setup = async () => {
  await UsersTableTestHelper.addUser({
    id: 'user-321',
    username: 'dicoding',
    password: 'secret_password',
  }); // memasukan user baru dengan username dicoding
};

const clean = async () => {
  await UsersTableTestHelper.cleanTable();
};

describe('UserRepositoryPostgres', () => {
  // afterEach(clean);

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    beforeAll(setup);
    afterAll(clean);

    it('should throw InvariantError when username not available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('new-username')).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    beforeAll(setup);
    afterAll(clean);

    it('should persist register user and return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'dcdg1',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const expectedValue = new RegisteredUser({
        id: 'user-123',
        username: 'dcdg1',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      expect(registeredUser).toStrictEqual(expectedValue);

      // Assert
      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });
  });

  describe('getPasswordByUsername', () => {
    beforeAll(setup);
    afterAll(clean);

    it('should throw InvariantError when user not found', () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(userRepositoryPostgres.getPasswordByUsername('unknown'))
        .rejects
        .toThrowError(InvariantError);
    });

    it('should return username password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername('dicoding');
      expect(password).toBe('secret_password');
    });
  });

  describe('getIdByUsername', () => {
    beforeAll(setup);
    afterAll(clean);

    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.getIdByUsername('unknown'))
        .rejects
        .toThrowError(InvariantError);
    });

    it('should return user id correctly', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername('dicoding');

      // Assert
      expect(userId).toEqual('user-321');
    });
  });
});
