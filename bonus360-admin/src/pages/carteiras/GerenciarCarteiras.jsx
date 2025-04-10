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
  IconButton,
  Tooltip,
  Link // Para link de email
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícone para ver detalhes/histórico
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Dados Hardcoded para Carteiras
const initialWallets = [
  {
    id: 'WALLET001',
    customerEmail: 'cliente1@email.com',
    balance: 150.75,
    lastUpdated: '2024-04-18T10:30:00Z',
  },
  {
    id: 'WALLET002',
    customerEmail: 'cliente_vip@email.com',
    balance: 580.00,
    lastUpdated: '2024-04-20T15:00:00Z',
  },
  {
    id: 'WALLET003',
    customerEmail: 'novo_cliente@email.com',
    balance: 25.00,
    lastUpdated: '2024-04-21T09:15:00Z',
  },
   {
    id: 'WALLET004',
    customerEmail: 'cliente2@email.com',
    balance: 0.00,
    lastUpdated: '2024-03-10T11:00:00Z',
  },
];

function GerenciarCarteiras() {
  const [wallets, setWallets] = useState(initialWallets);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredWallets = wallets.filter(wallet =>
    wallet.customerEmail.toLowerCase().includes(searchTerm)
  );

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const handleViewDetails = (id) => {
    console.log("Visualizar detalhes/histórico da carteira:", id);
    // Navegar para página de detalhes/histórico ou abrir modal (simulado)
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Carteiras Digitais
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por email do cliente..."
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
        <Table sx={{ minWidth: 650 }} aria-label="tabela de carteiras digitais">
          <TableHead>
            <TableRow>
              <TableCell>Cliente (Email)</TableCell>
              <TableCell align="right">Saldo Atual</TableCell>
              <TableCell>Última Atualização</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWallets.length > 0 ? (
              filteredWallets.map((wallet) => (
                <TableRow
                  key={wallet.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <AccountBalanceWalletIcon sx={{ mr: 1, color: 'action.active' }} fontSize="small" />
                       <Link href={`mailto:${wallet.customerEmail}`}>{wallet.customerEmail}</Link>
                     </Box>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(wallet.balance)}</TableCell>
                  <TableCell>{formatDate(wallet.lastUpdated)}</TableCell>
                  <TableCell align="center">
                     <Tooltip title="Ver Histórico">
                      <IconButton onClick={() => handleViewDetails(wallet.id)} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                     </Tooltip>
                     {/* Outras ações podem ser adicionadas aqui (ex: adicionar/remover fundos manualmente) */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhuma carteira encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GerenciarCarteiras; 