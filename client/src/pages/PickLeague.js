import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PickLeague = () => {

  //prem, bundesliga, la liga, serie a, ligue 1
  const leagues = [39, 78, 140, 135, 61];

  const navigate = useNavigate();

  const handleButtonClick = (league) => {
    navigate('/pickteam', { state: { league } });
  };

  return (
  <div
    style={{
      backgroundColor: '#215fad',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >

    <Box
      sx={{
        backgroundColor: 'black',
        border: '2px solid black',
        borderRadius: '16px',
        p: 8,
        textAlign: 'center',
        width: '600px'
      }}
    >
      <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1em' }}>
        Choose your league
      </h1>
      <div
        className="leagues-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {leagues.map((league, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleButtonClick(league)}
            sx={{
              m: 2,
              backgroundColor: 'lightgray',
              borderRadius: '32px',
              border: '2px solid white',
              padding: '20px 40px',
              fontSize: '1.2rem',
              color: 'black',
              '&:hover': {
                backgroundColor: 'yellow',
                color: 'red'
              }
            }}
          >
            <img
              src={`https://media.api-sports.io/football/leagues/${league}.png`}
              alt={`League ${league}`}
              style={{ width: '80px', height: '80px' }}
            />
          </Button>
        ))}
      </div>
    </Box>
  </div>
);

};

export default PickLeague;
