const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuth = require('../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ id, username });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ id, username });

    const newAuthentication = new NewAuth({ accessToken, refreshToken });

    await this._authenticationRepository.addToken(refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
