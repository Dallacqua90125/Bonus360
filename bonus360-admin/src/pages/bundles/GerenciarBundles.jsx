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
  Button,
  Collapse,
  Grid,
  Divider,
  styled,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Add as AddIcon,
  ExpandMore,
  ExpandLess,
  LocalOffer as DiscountIcon,
  ShoppingBasket,
  ContentCopy,
  BarChart
} from '@mui/icons-material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
}));

const DetailItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
}));

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
    description: 'Kit completo para gamers iniciantes com os itens essenciais para uma experiência de jogo aprimorada.',
    featured: true,
    applicableTo: 'Categoria Gaming',
    exclusions: 'Não aplicável com outras promoções',
    quantityLimit: 2,
    salesCount: 42,
    totalRevenue: 12595.80,
    averageOrderValue: 299.90,
    conversionRate: '38%'
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
    description: 'Tudo que você precisa para montar seu escritório em casa com conforto e produtividade.',
    featured: false,
    applicableTo: 'Categoria Home Office',
    exclusions: 'Não aplicável em produtos já em promoção',
    quantityLimit: null,
    salesCount: 28,
    totalRevenue: 25172.00,
    averageOrderValue: 899.00,
    conversionRate: '62%'
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
    description: 'Produtos essenciais para cuidar da sua pele durante o verão e garantir uma bronzeado perfeito.',
    featured: true,
    applicableTo: 'Categoria Beleza e Cuidados Pessoais',
    exclusions: 'Não aplicável em kits promocionais',
    quantityLimit: 3,
    salesCount: 86,
    totalRevenue: 12857.00,
    averageOrderValue: 149.50,
    conversionRate: '74%'
  },
];

function GerenciarBundles() {
  const [bundles, setBundles] = useState(initialBundles);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
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
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00'); // Ajusta para evitar problemas de fuso
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusChip = (status) => {
    const color = status === 'ativo' ? 'success' : 'error';
    const label = status === 'ativo' ? 'Ativo' : 'Inativo';
    return <Chip label={label} color={color} size="small" />;
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

  const handleEdit = (id, e) => {
    e.stopPropagation();
    console.log("Editar Bundle:", id);
    // Lógica de edição simulada
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    console.log("Excluir Bundle:", id);
    // Lógica de exclusão simulada
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciar Bundles
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/bundles/criar"
          sx={{ borderRadius: '8px' }}
          startIcon={<AddIcon />}
        >
          Novo Bundle
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nome do bundle ou produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de bundles">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="25%"><Typography fontWeight="bold">Nome do Bundle</Typography></TableCell>
              <TableCell width="20%"><Typography fontWeight="bold">Produtos</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Preço</Typography></TableCell>
              <TableCell width="10%"><Typography fontWeight="bold">Desconto</Typography></TableCell>
              <TableCell width="10%"><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell width="10%"><Typography fontWeight="bold">Período</Typography></TableCell>
              <TableCell width="10%" align="center"><Typography fontWeight="bold">Ações</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBundles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhum bundle encontrado com os termos da busca.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredBundles.map((bundle) => {
                // Garantir que os valores são números
                const price = typeof bundle.price === 'number' ? bundle.price : 0;
                const discount = typeof bundle.discount === 'number' ? bundle.discount : 0;
                const discountedPrice = calculateDiscountedPrice(price, discount);
                const savings = calculateSavings(price, discount);
                const discountColor = getDiscountChipColor(discount);
                
                return (
                  <React.Fragment key={bundle.id}>
                    <StyledTableRow onClick={() => handleRowClick(bundle.id)}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {expandedRow === bundle.id ? 
                            <ExpandLess color="primary" sx={{ mr: 1 }} /> : 
                            <ExpandMore color="action" sx={{ mr: 1 }} />
                          }
                          <Typography variant="body2" fontWeight="medium">
                            {bundle.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {bundle.products.length > 1 
                            ? `${bundle.products[0]} +${bundle.products.length - 1}` 
                            : bundle.products[0]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                            {formatCurrency(price)}
                          </Typography>
                          <Typography variant="body2" color="primary" fontWeight="medium">
                            {formatCurrency(discountedPrice)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          icon={<DiscountIcon fontSize="small" />}
                          label={formatDiscount(discount)} 
                          color={discountColor} 
                          size="small"
                          sx={{ fontWeight: 'medium' }}
                        />
                      </TableCell>
                      <TableCell>{getStatusChip(bundle.status)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(bundle.startDate)}
                          {bundle.endDate ? ` - ${formatDate(bundle.endDate)}` : ''}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary" onClick={(e) => handleEdit(bundle.id, e)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={(e) => handleDelete(bundle.id, e)}
                          disabled={bundle.status === 'ativo'}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>

                    <TableRow>
                      <TableCell colSpan={7} style={{ padding: 0, border: 0 }}>
                        <Collapse in={expandedRow === bundle.id} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                  Detalhes do Bundle
                                </Typography>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Descrição</Typography>
                                  <Typography variant="body2">{bundle.description}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Produtos Incluídos</Typography>
                                  <List dense disablePadding>
                                    {bundle.products.map((product, index) => (
                                      <ListItem key={index} disableGutters sx={{ p: 0 }}>
                                        <ListItemText primary={`- ${product}`} sx={{ m: 0 }} primaryTypographyProps={{ variant: 'body2' }} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </DetailItem>
                                {bundle.featured && (
                                  <DetailItem>
                                    <Typography variant="caption" color="text.secondary">Destaque</Typography>
                                    <Typography variant="body2">
                                      <Chip size="small" label="Em destaque" color="primary" sx={{ mt: 0.5 }} />
                                    </Typography>
                                  </DetailItem>
                                )}
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                  Condições
                                </Typography>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Aplicável em</Typography>
                                  <Typography variant="body2">{bundle.applicableTo}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Exclusões</Typography>
                                  <Typography variant="body2">{bundle.exclusions || '-'}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Limite por Cliente</Typography>
                                  <Typography variant="body2">
                                    {bundle.quantityLimit ? `${bundle.quantityLimit} unidades` : 'Sem limite'}
                                  </Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Economia</Typography>
                                  <Typography variant="body2" fontWeight="medium" color="success.main">
                                    {formatCurrency(savings)} ({discount}%)
                                  </Typography>
                                </DetailItem>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                  Estatísticas
                                </Typography>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Total de Vendas</Typography>
                                  <Typography variant="body2" fontWeight="medium">{bundle.salesCount} unidades</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Receita Gerada</Typography>
                                  <Typography variant="body2" fontWeight="medium">{formatCurrency(bundle.totalRevenue)}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Ticket Médio</Typography>
                                  <Typography variant="body2" fontWeight="medium">{formatCurrency(bundle.averageOrderValue)}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Taxa de Conversão</Typography>
                                  <Typography variant="body2" fontWeight="medium">{bundle.conversionRate}</Typography>
                                </DetailItem>
                              </Grid>

                              <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                  <Button 
                                    startIcon={<ShoppingBasket />} 
                                    sx={{ mr: 1 }}
                                    onClick={(e) => { 
                                      e.stopPropagation();
                                      console.log("Ver na loja:", bundle.id);
                                    }}
                                  >
                                    Ver na Loja
                                  </Button>
                                  <Button 
                                    startIcon={<BarChart />}
                                    variant="outlined" 
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Ver estatísticas:", bundle.id);
                                    }}
                                  >
                                    Ver Relatório
                                  </Button>
                                  <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(bundle.id, e);
                                    }}
                                  >
                                    Editar Bundle
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GerenciarBundles; 