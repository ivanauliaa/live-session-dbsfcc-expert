const InvariantError = require('../../Commons/exceptions/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UserRepositoryMongoDb extends UserRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {

  }

  async addUser(registerUser) {

  }

  async getPasswordByUsername(username) {

  }

  async getIdByUsername(username) {
    
  }
}

module.exports = UserRepositoryMongoDb;
