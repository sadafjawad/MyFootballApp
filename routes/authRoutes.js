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

        // Check if username already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Check if email already exists
        let existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', username });

    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ error: 'Server error' });
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
        const payload = { user: { username } };
        jwt.sign(
            payload,
            'watermelon',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, username });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Store the selected team
router.post('/store-team', async (req, res) => {
    try {
        const { username, teamName } = req.body;

        if (!username || !teamName) {
            return res.status(400).json({ error: 'Username and team are required' });
        }

        // Find user by username and update their team
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { team: teamName } },
            {new: true}
        );

        // console.log(user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Team stored successfully', user });
    } catch (err) {
        console.error('Error storing team:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Retrieve the stored team for a user
router.get('/get-team/:username', async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ team: user.team || null });
    } catch (err) {
        console.error('Error retrieving team:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;


