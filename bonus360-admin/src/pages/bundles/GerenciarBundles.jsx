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
import DiscountIcon from '@mui/icons-material/LocalOffer';

// Dados Hardcoded para Bundles com desconto adicionado
const initialBundles = [
  {
    id: 'BND001',
    name: 'Kit Gamer Iniciante',
    products: ['Mouse Gamer RGB', 'Teclado Mecânico', 'Mousepad Grande'],
    price: 299.90,
    discount: 15, // 15% de desconto
    status: 'ativo',
    startDate: '2024-01-01',
    endDate: null, // Sem data de fim
  },
  {
    id: 'BND002',
    name: 'Combo Home Office Essencial',
    products: ['Monitor 24" Full HD', 'Suporte para Notebook', 'Webcam HD'],
    price: 899.00,
    discount: 10, // 10% de desconto
    status: 'ativo',
    startDate: '2024-03-15',
    endDate: '2024-12-31',
  },
  {
    id: 'BND003',
    name: 'Pacote Verão Beleza',
    products: ['Protetor Solar FPS 50', 'Hidratante Pós-Sol', 'Óleo Bronzeador'],
    price: 149.50,
    discount: 25, // 25% de desconto
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
    // Verificação para garantir que o valor é um número válido
    if (typeof value !== 'number' || isNaN(value)) {
      return 'R$ 0,00';
    }
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

  // Calcular preço com desconto
  const calculateDiscountedPrice = (price, discount) => {
    // Verificação para garantir que os valores são números válidos
    if (typeof price !== 'number' || typeof discount !== 'number' || 
        isNaN(price) || isNaN(discount)) {
      return 0;
    }
    return price - (price * discount / 100);
  };

  // Obter a cor do chip de desconto com base no valor
  const getDiscountChipColor = (discount) => {
    if (discount >= 20) return 'error'; // Vermelho para descontos grandes (≥20%)
    if (discount >= 10) return 'primary'; // Azul para descontos médios (10-19%)
    return 'success'; // Verde para descontos pequenos (<10%)
  };

  // Formatar o percentual de desconto
  const formatDiscount = (discount) => {
    // Verificação para garantir que o desconto é um número válido
    if (typeof discount !== 'number' || isNaN(discount)) {
      return '0%';
    }
    return `${discount}%`;
  };

  // Calcular a economia em valor monetário
  const calculateSavings = (price, discount) => {
    if (typeof price !== 'number' || typeof discount !== 'number' || 
        isNaN(price) || isNaN(discount)) {
      return 0;
    }
    return (price * discount / 100);
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
              <TableCell>Desconto</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data Início</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBundles.length > 0 ? (
              filteredBundles.map((bundle) => {
                // Garantir que os valores são números
                const price = typeof bundle.price === 'number' ? bundle.price : 0;
                const discount = typeof bundle.discount === 'number' ? bundle.discount : 0;
                const discountedPrice = calculateDiscountedPrice(price, discount);
                const savings = calculateSavings(price, discount);
                const discountColor = getDiscountChipColor(discount);
                
                return (
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
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                          {formatCurrency(price)}
                        </Typography>
                        <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                          {formatCurrency(discountedPrice)}
                        </Typography>
                        {discount > 0 && (
                          <Typography variant="caption" color="success.main">
                            Economia: {formatCurrency(savings)}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={<DiscountIcon />}
                        label={formatDiscount(discount)} 
                        color={discountColor} 
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>{getStatusChip(bundle.status)}</TableCell>
                    <TableCell>{formatDate(bundle.startDate)}</TableCell>
                    <TableCell>{formatDate(bundle.endDate)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEdit(bundle.id)} size="small">
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
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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