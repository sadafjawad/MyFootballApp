import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [getTables, setTables] = useState(false);
  const [error, setError] = useState(null);

  //prem(39), bundesliga, la liga, serie a, ligue 1
  const leagues = [39, 78, 140, 135, 61];

  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", "");
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  
  // https://v3.football.api-sports.io/standings?league=2&season=2020

  // useEffect(() => {
  //   if (!getTables) {
  //     fetch("https://v3.football.api-sports.io/standings?league=2&season=2021", requestOptions)
  //     .then(response => response.text())
  //     .then(result => setTableData(result))
  //     .catch(error => setError(error));

  //   }
  // }, [getTables]);

  const displayTables = () => {
    setTables(true);
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

    {/* <button onClick={displayTables}>Display Tables</button> */}

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
      <div className="table-container" style={{ marginBottom: '2em', fontSize: '1.2rem', color: 'white' }}>
        {tableData}
      </div>
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

export default Table;
