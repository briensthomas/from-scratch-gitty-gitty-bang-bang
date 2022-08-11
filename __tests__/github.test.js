const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

const agent = request.agent(app);

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  
  afterAll(() => {
    pool.end();
  });
  
  it('#GET should login and redirect users to .../dashboard', async () => {
    const res = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    // console.log('res', res.req.path);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'test@example.com',
      avatar: expect.any(String),
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });

  it('#DELETE should delete a users cookies', async () => {
    // await agent
    //   .get('/api/v1/github/callback?code=42')
    //   .redirects(1);

    const res = await agent.delete('/api/v1/github');
    console.log('res.body', res.body);
    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!'
    });
  });




});
