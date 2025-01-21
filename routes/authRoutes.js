const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const apiKey = "";
// news endpoint
router.get('/api/auth/news', async (req, res) => {
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=`;
    const searchQuery = 'football+latest+transfer+news';
    const videoType = 'video';
    const videoDefinition = 'high';

    const fullUrl = `${youtubeApiUrl}${searchQuery}&type=${videoType}&videoDefinition=${videoDefinition}&key=${apiKey}`;
    fetch(fullUrl)
    .then(response => response.json())
    .then(data => {
        // Process the search results
        console.log(data); 
        const videos = data.items; // Use 'data' instead of 'response'
        // Do something with the data, like displaying the results on a webpage
        res.json(videos);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube videos' });
    });
});

router.get('/teams', async (req, res) => {
    try {
      const league = req.query.league;
  
      // Validate the league parameter
      if (!league) {
        return res.status(400).json({ error: 'Invalid or missing league parameter' });
      }
      
      console.log('Fetching teams for league:', league);

      // Construct the API URL dynamically based on the league
      const apiUrl = `https://api.football-data.org/v4/competitions/${league}/teams?season=2024`;
  
      const response = await fetch(apiUrl, {
        headers: { 'X-Auth-Token': '' }
      });
  
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data from API' });
      }
  
      const data = await response.json();
  
      // Log the number of teams fetched (optional)
      console.log('Number of teams:', data.count);
  
      // Set CORS header
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  
      // Send the teams data
      res.json(data.teams);
    } catch (err) {
      console.error('Error fetching teams:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Registration endpoint
router.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login endpoint
router.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User Does not exist' });
        }
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            'watermelon',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
