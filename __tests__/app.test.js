const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /posts, authenticated users can view a list of posts', async () => {
    const res = await request(app).get('/api/v1/posts');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toBe({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      created_at: expect.any(String)
    });
  });

  afterAll(() => {
    pool.end();
  });

  it('#GET should login and redirect users to .../dashboard', async () => {
    const res = await request.agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    // console.log('res', res.req.path);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'fake_github_user',
      email: 'test@example.com',
      avatar: expect.any(String),
    });
  });
});
