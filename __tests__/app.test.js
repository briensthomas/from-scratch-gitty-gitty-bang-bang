const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('#GET should login and redirect users to .../dashboard', async () => {
    const res = await request.agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'test@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number)
    });
  });


  afterAll(() => {
    pool.end();
  });
});
