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
    

  it('#GET /posts, authenticated users can view a list of posts', async () => {
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    // console.log('Redirect', redirectRes);
    const res = await agent.get('/api/v1/posts');
    console.log('res.body', res.body);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      title: expect.any(String),
      description: expect.any(String)
    });
  });

  it('#POST /posts, auth users should be able to submit a new post', async () => {
    const newPost = {
      title: 'Party at Julius\' Place!',
      description: 'We\'re hosting a party while Julius is in portland, hope to see you there!'
    };
    const res = await agent(app).post('/api/v1/posts').send(newPost);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      ...newPost
    });

  });

});
