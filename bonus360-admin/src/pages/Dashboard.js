import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', campanhas: 4, cupons: 150, giftCards: 30 },
  { name: 'Fev', campanhas: 6, cupons: 200, giftCards: 45 },
  { name: 'Mar', campanhas: 8, cupons: 300, giftCards: 60 },
];

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Visão Geral
            </Typography>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campanhas" fill="#8884d8" />
              <Bar dataKey="cupons" fill="#82ca9d" />
              <Bar dataKey="giftCards" fill="#ffc658" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard; 