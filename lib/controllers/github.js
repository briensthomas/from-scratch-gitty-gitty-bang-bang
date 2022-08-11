const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { GithubUser } = require('../models/GithubUser');
const authenticate = require('../middleware/authenticate');
const { 
  exchangeCodeForToken, 
  getGithubProfile 
} = require('../services/github');


const ONE_DAY_IN_MS = 1000 * 24 * 60 * 60;

module.exports = Router()
  .get('/login', async (req, res) => {
    // Starts the GitHub OAuth Flow by redirecting to the GitHub url
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);

      const githubProfile = await getGithubProfile(token);
      // console.log('githubProfile', githubProfile);
      let user = await GithubUser.findByUsername(githubProfile.login);
      
      if (!user) {
        user = await GithubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
      }
      // console.log('user', user);
      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      // console.log('payload', payload);
      // res.json(githubProfile); //don't uncomment or it breaks everything afterwards

      res.cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      })
        .redirect('/api/v1/github/dashboard');
    } catch(err) {
      next(err);
    }
  })

  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })
  
  .delete('/', async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  })
;

