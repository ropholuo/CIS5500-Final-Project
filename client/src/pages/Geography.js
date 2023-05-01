import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const config = require("../config.json");

const BookRatingByLocation = () => {
  const [title, setTitle] = useState('');
  const [bookData, setBookData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [ratingCountData, setRatingCountData] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (title && searched) {
      const fetchData = async () => {
        const response = await fetch(`http://${config.server_host}:${config.server_port}/avgRatingByLocation?title=${title}`);
        const data = await response.json();
        setBookData(data);

        const ageResponse = await fetch(`http://${config.server_host}:${config.server_port}/ageGroupByLocation?title=${title}`);
        const ageData = await ageResponse.json();
        setAgeData(ageData);

        const ratingCountResponse = await fetch(`http://${config.server_host}:${config.server_port}/getBookRatingsMap?title=${title}`);
        const ratingCountData = await ratingCountResponse.json();
        setRatingCountData(ratingCountData);
      };
      fetchData();
    }
  }, [title, searched]);

  useEffect(() => {
    setSearched(false);
  }, [title]);

const handleSearch = () => {
  if (title) {
    setSearched(true);
  }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Look up a book using ISBN!
        </Typography>
      </Box>
      <Box mt={2}>
        <TextField
          label="Enter Book ISBN"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>
      {title && searched && (
        <Box mt={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <Box style={{ width: '33%' }}>
            <BarChart
              width={400}
              height={300}
              data={bookData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg_rating" fill="#8884d8" />
            </BarChart>
          </Box>
          <Box style={{ width: '33%' }}>
            <LineChart
              width={400}
              height={300}
              data={ageData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="MIN(BR.Age)" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="MAX(BR.Age)" stroke="#82ca9d" />
            </LineChart>
          </Box>
        <Box style={{ width: '33%' }}>
        <BarChart
          width={400}
          height={300}
          data={ratingCountData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count_rating" fill="#FFA726" />
        </BarChart>
      </Box>
    </Box>
      )}
    </div>
  );
};

export default BookRatingByLocation;
