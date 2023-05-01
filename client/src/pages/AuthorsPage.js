import React, { useState, useEffect } from 'react';

const config = require("../config.json");

const AuthorsPage = () => {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [mostSearchedAuthor, setMostSearchedAuthor] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/popularAuthors`)
      .then(response => response.json())
      .then(data => setPopularAuthors(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>Popular Authors</h1>
        <table style={{ maxWidth: '90%', margin: '0 auto', border: '1px solid #ccc', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Author</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Number of Books</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Number of Ratings</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {popularAuthors.map(author => (
              <tr key={author.Author}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{author.Author}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{author.num_books}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{author.num_rating}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{author.avg_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorsPage;
