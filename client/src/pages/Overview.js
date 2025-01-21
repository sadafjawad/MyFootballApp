import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const Overview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const team = state?.team;

  const handleNavClick = (path) => {
    navigate(path, { state: { team } });
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
          p: 4,
          textAlign: 'center',
          width: '600px'
        }}
      >
        {/* Nav buttons */}
        <div style={{ marginBottom: '1rem' }}>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleNavClick('/overview')}
          >
            Overview
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleNavClick('/matches')}
          >
            Matches
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleNavClick('/table')}
          >
            Table
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleNavClick('/players')}
          >
            Players
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleNavClick('/news')}
          >
            News
          </Button>
        </div>

        <h1 style={{ color: 'white', marginBottom: '1em' }}>Team Overview</h1>
        {team ? (
          <div style={{ color: 'white' }}>
            <img
              src={team.crest}
              alt={team.name}
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <h2 style={{ margin: '1em 0' }}>{team.name}</h2>
            {team.founded && <p>Founded: {team.founded}</p>}
            {team.venue && <p>Stadium: {team.venue}</p>}
            {team.address && <p>Address: {team.address}</p>}
            {team.website && (
              <p>
                Website:{' '}
                <a
                  href={team.website}
                  style={{ color: 'cyan' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  {team.website}
                </a>
              </p>
            )}
            {/* Display coach info if available */}
            {team.coach.name && (
              <p>Coach: {team.coach.name}</p>
            )}
            {/* Display competition if available */}
            {team.competition && (
              <p>Playing In: {team.competition}</p>
            )}
          </div>
        ) : (
          <p style={{ color: 'red' }}>No team selected</p>
        )}
      </Box>
    </div>
  );
};

export default Overview;