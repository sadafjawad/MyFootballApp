import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PickTeam = () => {
  const [teamData, setTeamsData] = useState([]);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const league = state?.league;
  const navigate = useNavigate();

  //prem, bundesliga, la liga, serie a, ligue 1
  const leagues = new Map([
    [39, 'PL'],
    [78, 'BL1'],
    [140, 'PD'],
    [135, 'SA'],
    [61, 'FL1']
  ]);
  
  //console.log(leagues.get(league));

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`http://localhost:5000/teams?league=${leagues.get(league)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        //console.log(data);
        setTeamsData(data || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTeams();
  }, [league]); // Dependency on league ensures fetch is called once when league changes

  const handleTeamClick = (team) => {
    // Navigate to team details or another page
    // Example:
    // navigate('/teamdetails', { state: { team } });
    console.log('Selected team:', team);
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
          width: '800px'
        }}
      >
        <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1em' }}>
          Pick your team
        </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            justifyItems: 'center'
          }}
        >
          {teamData.map((team, index) => (
            <Button
                key={index}
                variant="outlined"
                onClick={() => handleTeamClick(team)}
                sx={{
                backgroundColor: 'lightgray',
                borderRadius: '32px',
                border: '2px solid white',
                padding: '20px',
                fontSize: '1rem',
                color: 'black',
                width: '120px',
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                    backgroundColor: 'yellow',
                    color: 'red'
                    }
                }}
            >
                <img
                src={team.crest}
                alt={team.name}
                style={{ width: '80px', height: '80px' }}
                />
            </Button>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default PickTeam;