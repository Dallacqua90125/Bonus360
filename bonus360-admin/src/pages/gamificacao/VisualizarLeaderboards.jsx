import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Troféu

// Dados Hardcoded para Leaderboard
const initialLeaderboard = [
  {
    rank: 1,
    customerEmail: 'cliente_vip@email.com',
    points: 5800,
    badges: ['Comprador Frequente', 'Indicador Top'],
  },
  {
    rank: 2,
    customerEmail: 'cliente1@email.com',
    points: 4250,
    badges: ['Comprador Frequente'],
  },
  {
    rank: 3,
    customerEmail: 'indicador3@email.com',
    points: 3100,
    badges: ['Indicador Top'],
  },
  {
    rank: 4,
    customerEmail: 'novo_cliente@email.com',
    points: 1500,
    badges: [],
  },
   {
    rank: 5,
    customerEmail: 'cliente2@email.com',
    points: 800,
    badges: [],
  },
];

function VisualizarLeaderboards() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboard);

  const getRankColor = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return '#cd7f32'; // Bronze
    return 'inherit';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leaderboard de Clientes
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="leaderboard">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Pontos</TableCell>
              <TableCell>Badges Conquistados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((row) => (
              <TableRow
                key={row.rank}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {row.rank <= 3 && <EmojiEventsIcon sx={{ color: getRankColor(row.rank), mr: 0.5 }} />}
                    <Typography variant="h6" sx={{ color: getRankColor(row.rank) }}>
                        {row.rank}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.light' }}>
                           {row.customerEmail.charAt(0).toUpperCase()}
                       </Avatar>
                       {row.customerEmail}
                   </Box>
                </TableCell>
                <TableCell align="right">{row.points.toLocaleString('pt-BR')}</TableCell>
                <TableCell>
                  {row.badges.length > 0 ? (
                    row.badges.map((badge, index) => (
                      <Chip
                        key={index}
                        icon={<EmojiEventsIcon fontSize="small"/>}
                        label={badge}
                        size="small"
                        variant="outlined"
                        color="warning"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default VisualizarLeaderboards; 