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
  List, // Para exibir produtos
  ListItem, // Para exibir produtos
  ListItemText // Para exibir produtos
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

// Dados Hardcoded para Bundles
const initialBundles = [
  {
    id: 'BND001',
    name: 'Kit Gamer Iniciante',
    products: ['Mouse Gamer RGB', 'Teclado Mecânico', 'Mousepad Grande'],
    price: 299.90,
    status: 'ativo',
    startDate: '2024-01-01',
    endDate: null, // Sem data de fim
  },
  {
    id: 'BND002',
    name: 'Combo Home Office Essencial',
    products: ['Monitor 24" Full HD', 'Suporte para Notebook', 'Webcam HD'],
    price: 899.00,
    status: 'ativo',
    startDate: '2024-03-15',
    endDate: '2024-12-31',
  },
  {
    id: 'BND003',
    name: 'Pacote Verão Beleza',
    products: ['Protetor Solar FPS 50', 'Hidratante Pós-Sol', 'Óleo Bronzeador'],
    price: 149.50,
    status: 'inativo',
    startDate: '2023-11-01',
    endDate: '2024-03-01',
  },
];

function GerenciarBundles() {
  const [bundles, setBundles] = useState(initialBundles);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBundles = bundles.filter(bundle =>
    bundle.name.toLowerCase().includes(searchTerm) ||
    bundle.products.some(p => p.toLowerCase().includes(searchTerm))
  );

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00'); // Ajusta para evitar problemas de fuso
        return date.toLocaleDateString('pt-BR');
    };

  const getStatusChip = (status) => {
    return status === 'ativo'
      ? <Chip label="Ativo" color="success" size="small" />
      : <Chip label="Inativo" color="error" size="small" />;
  };

  const handleEdit = (id) => {
    console.log("Editar Bundle:", id);
    // Lógica de edição simulada
  };

  const handleToggleStatus = (id) => {
    console.log("Alternar Status Bundle:", id);
    setBundles(prevBundles =>
      prevBundles.map(bundle =>
        bundle.id === id
          ? { ...bundle, status: bundle.status === 'ativo' ? 'inativo' : 'ativo' }
          : bundle
      )
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Bundles
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nome do bundle ou produto..."
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
        <Table sx={{ minWidth: 650 }} aria-label="tabela de bundles">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Bundle</TableCell>
              <TableCell>Produtos Incluídos</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data Início</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBundles.length > 0 ? (
              filteredBundles.map((bundle) => (
                <TableRow
                  key={bundle.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {bundle.name}
                  </TableCell>
                  <TableCell>
                    <List dense disablePadding>
                      {bundle.products.map((product, index) => (
                        <ListItem key={index} disableGutters sx={{ p: 0 }}>
                          <ListItemText primary={`- ${product}`} sx={{ m: 0 }} />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>{formatCurrency(bundle.price)}</TableCell>
                  <TableCell>{getStatusChip(bundle.status)}</TableCell>
                  <TableCell>{formatDate(bundle.startDate)}</TableCell>
                  <TableCell>{formatDate(bundle.endDate)}</TableCell>
                  <TableCell align="center">
                     <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(bundle.id)} size="small" disabled>
                        <EditIcon fontSize="small" />
                      </IconButton>
                     </Tooltip>
                     <Tooltip title={bundle.status === 'ativo' ? "Desativar" : "Ativar"}>
                      <IconButton onClick={() => handleToggleStatus(bundle.id)} size="small" color={bundle.status === 'ativo' ? 'error' : 'success'}>
                         {bundle.status === 'ativo' ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                      </IconButton>
                     </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum bundle encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GerenciarBundles; 