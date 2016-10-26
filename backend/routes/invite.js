const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const axios = require('axios');

router.get('/', (req, res) => {
  const INVITE_REDIR = req.query.redirect_uri || config.backend.INVITE_REDIR;
  res.redirect(
`https://discordapp.com/oauth2/authorize?
client_id=${config.backend.CLIENT_ID}
&permissions=${config.backend.PERMISSIONS}
&redirect_uri=${encodeURIComponent(INVITE_REDIR)}
&scope=bot
&response_type=code
${req.query.state ? `&state=${req.query.state}` : ''}`.replace(/\n|%0A/g, '')
  );
});

router.get('/callback', async (req, res) => {
  try {
    const guild = await axios.get(`https://discordapp.com/api/guilds/${req.query.guild_id}`, {
      headers: {'Authorization': `Bot ${config.discord[config.env]}`}
    });
    res.render('invite', {guild: guild.data});
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
