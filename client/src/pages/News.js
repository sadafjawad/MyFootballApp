import React, { useState, useEffect } from 'react';

const News = () => {
  const [videos, setVideos] = useState([]);
  const [fetchVideos, setFetchVideos] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchVideos) {
      fetch('http://localhost:5000/api/auth/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch news');
          }
        })
        .then(data => {
          setVideos(data);
        })
        .catch(error => {
          setError(error.message);
          console.error(error);
        });
    }
  }, [fetchVideos]);

  const handleFetchVideos = () => {
    setFetchVideos(true);
  };

  return (
    <div>
      <h1>News App</h1>
      <button onClick={handleFetchVideos}>Fetch Videos</button>
      {error && <div className="error">Error: {error}</div>}
      <div className="video-container">
        {videos.map(video => (
          <div key={video.id.videoId} className="video">
            <h2>{video.snippet.title}</h2>
            <iframe 
              src={`https://www.youtube.com/embed/${video.id.videoId}`} 
              style={{ border: 'none' }} 
              allowFullScreen
            ></iframe>

          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
