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
  TextField,
  InputAdornment,
  Chip,
  Link // Para links de email
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';

// Dados Hardcoded para Indicações
const initialIndications = [
  {
    id: 'IND001',
    referrerEmail: 'indicador1@email.com',
    referredEmail: 'indicadoA@email.com',
    status: 'concluida', // Indicado fez a compra válida
    referralDate: '2024-04-01',
    rewardDate: '2024-04-05',
  },
  {
    id: 'IND002',
    referrerEmail: 'indicador2@email.com',
    referredEmail: 'indicadoB@email.com',
    status: 'pendente', // Indicado se cadastrou, aguardando compra
    referralDate: '2024-04-10',
    rewardDate: null,
  },
  {
    id: 'IND003',
    referrerEmail: 'indicador1@email.com',
    referredEmail: 'indicadoC@email.com',
    status: 'expirada', // Indicado não fez a compra no prazo
    referralDate: '2024-03-01',
    rewardDate: null,
  },
   {
    id: 'IND004',
    referrerEmail: 'indicador3@email.com',
    referredEmail: 'indicadoD@email.com',
    status: 'concluida',
    referralDate: '2024-04-15',
    rewardDate: '2024-04-18',
  },
];

function MonitorarIndicacoes() {
  const [indications, setIndications] = useState(initialIndications);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredIndications = indications.filter(ind =>
    ind.referrerEmail.toLowerCase().includes(searchTerm) ||
    ind.referredEmail.toLowerCase().includes(searchTerm) ||
    ind.status.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'concluida':
        return <Chip icon={<CheckCircleIcon />} label="Concluída" color="success" size="small" variant="outlined" />;
      case 'pendente':
        return <Chip icon={<HourglassEmptyIcon />} label="Pendente" color="warning" size="small" variant="outlined" />;
      case 'expirada':
        return <Chip icon={<CancelIcon />} label="Expirada" color="error" size="small" variant="outlined" />;
       case 'cancelada': // Exemplo
        return <Chip icon={<CancelIcon />} label="Cancelada" color="default" size="small" variant="outlined" />;
      default:
        return <Chip label={status} size="small" />; // Fallback
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monitorar Indicações
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por email ou status..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de indicações">
          <TableHead>
            <TableRow>
              <TableCell>Quem Indicou (Email)</TableCell>
              <TableCell>Indicado (Email)</TableCell>
              <TableCell>Data da Indicação</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data da Recompensa</TableCell>
              {/* Poderia ter coluna de Ações se necessário */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIndications.length > 0 ? (
              filteredIndications.map((ind) => (
                <TableRow
                  key={ind.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                     <Link href={`mailto:${ind.referrerEmail}`}>{ind.referrerEmail}</Link>
                  </TableCell>
                  <TableCell>
                      <Link href={`mailto:${ind.referredEmail}`}>{ind.referredEmail}</Link>
                  </TableCell>
                  <TableCell>{formatDate(ind.referralDate)}</TableCell>
                  <TableCell>{getStatusChip(ind.status)}</TableCell>
                  <TableCell>{formatDate(ind.rewardDate)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhuma indicação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MonitorarIndicacoes; 