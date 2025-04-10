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
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block'; // Ícone para desativar/bloquear

// Dados Hardcoded
const initialGiftCards = [
  {
    id: 'GC001',
    code: 'WINTERGIFT25',
    initialValue: 50.00,
    currentValue: 25.50,
    status: 'ativo',
    customerEmail: 'cliente1@email.com',
    expiryDate: '2024-12-31',
  },
  {
    id: 'GC002',
    code: 'SUMMERFUN100',
    initialValue: 100.00,
    currentValue: 100.00,
    status: 'ativo',
    customerEmail: null, // Pode ser vendido sem cliente associado inicialmente
    expiryDate: '2025-06-30',
  },
  {
    id: 'GC003',
    code: 'SPECIAL10OFF',
    initialValue: 10.00,
    currentValue: 0.00,
    status: 'usado',
    customerEmail: 'cliente2@email.com',
    expiryDate: '2024-08-15',
  },
   {
    id: 'GC004',
    code: 'BIRTHDAYTREAT',
    initialValue: 20.00,
    currentValue: 20.00,
    status: 'inativo', // Exemplo de inativo/bloqueado
    customerEmail: 'cliente3@email.com',
    expiryDate: '2024-11-11',
  },
];

function ConsultarGiftCards() {
  const [giftCards, setGiftCards] = useState(initialGiftCards);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Lógica simples de filtro (pode ser aprimorada)
  const filteredGiftCards = giftCards.filter(card =>
    card.code.toLowerCase().includes(searchTerm) ||
    (card.customerEmail && card.customerEmail.toLowerCase().includes(searchTerm)) ||
    card.status.includes(searchTerm)
  );

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'ativo':
        return <Chip label="Ativo" color="success" size="small" />;
      case 'usado':
        return <Chip label="Usado" color="default" size="small" />;
      case 'inativo':
        return <Chip label="Inativo" color="error" size="small" />;
      case 'expirado':
        return <Chip label="Expirado" color="warning" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleEdit = (id) => {
    console.log("Editar Gift Card:", id);
    // Lógica de edição (abrir modal, navegar para outra página, etc.)
    // Como não há API, pode ser apenas um log ou desabilitado
  };

  const handleToggleStatus = (id) => {
    console.log("Alternar Status Gift Card:", id);
    // Lógica para ativar/desativar (apenas simulação no estado local)
    setGiftCards(prevCards =>
      prevCards.map(card =>
        card.id === id
          ? { ...card, status: card.status === 'ativo' ? 'inativo' : 'ativo' }
          : card
      )
    );
  };


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Consultar/Atualizar Gift Cards
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por código, email do cliente ou status..."
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
        <Table sx={{ minWidth: 650 }} aria-label="tabela de gift cards">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Valor Inicial</TableCell>
              <TableCell>Valor Atual</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cliente (Email)</TableCell>
              <TableCell>Data de Expiração</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGiftCards.length > 0 ? (
              filteredGiftCards.map((card) => (
                <TableRow
                  key={card.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {card.code}
                  </TableCell>
                  <TableCell>{formatCurrency(card.initialValue)}</TableCell>
                  <TableCell>{formatCurrency(card.currentValue)}</TableCell>
                  <TableCell>{getStatusChip(card.status)}</TableCell>
                  <TableCell>{card.customerEmail || 'N/A'}</TableCell>
                  <TableCell>{new Date(card.expiryDate).toLocaleDateString('pt-BR')}</TableCell>
                   <TableCell align="center">
                     <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(card.id)} size="small" disabled>
                        <EditIcon fontSize="small" />
                      </IconButton>
                     </Tooltip>
                     <Tooltip title={card.status === 'ativo' ? "Desativar" : "Ativar"}>
                      <IconButton onClick={() => handleToggleStatus(card.id)} size="small" color={card.status === 'ativo' ? 'error' : 'success'}>
                         {card.status === 'ativo' ? <BlockIcon fontSize="small" /> : <EditIcon fontSize="small" /> /* Usar CheckCircleOutline para ativar? */}
                      </IconButton>
                     </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum gift card encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ConsultarGiftCards; 