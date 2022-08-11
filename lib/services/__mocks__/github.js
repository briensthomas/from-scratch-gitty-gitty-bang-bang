/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    id: '1',
    login: 'fake_github_user',
    email: 'test@example.com',
    avatar_url: 'https://www.placecage.com/gif/300/300'
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
