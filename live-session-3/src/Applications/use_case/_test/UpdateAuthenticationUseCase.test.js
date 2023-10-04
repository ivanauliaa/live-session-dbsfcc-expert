const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const UpdateAuthenticationUseCase = require('../UpdateAuthenticationUseCase');

describe('UpdateAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    const useCasePayload = {};
    const updateAuthenticationUseCase = new UpdateAuthenticationUseCase({});

    await expect(updateAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrowError('UPDATE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresh token is not string', async () => {
    const useCasePayload = {
      refreshToken: 123,
    };
    const updateAuthenticationUseCase = new UpdateAuthenticationUseCase({});

    await expect(updateAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrowError('UPDATE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating update authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refreshToken',
    };

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('accessToken'));

    const updateAuthenticationUseCase = new UpdateAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    const accessToken = await updateAuthenticationUseCase.execute(useCasePayload);

    expect(accessToken).toEqual('accessToken');
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });
  });
});
