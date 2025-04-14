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
  Button,
  Collapse,
  Grid,
  Divider,
  styled,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Block as BlockIcon,
  AddCircle,
  ExpandMore,
  ExpandLess,
  ContentCopy,
  BarChart,
  CardGiftcard,
  RefreshOutlined,
} from '@mui/icons-material';

// Componentes estilizados
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& > *': {
    borderBottom: 'unset',
  },
}));

const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const CodeChip = styled(Box)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '16px',
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 'medium',
  fontSize: '0.875rem',
}));

// Dados mockados mais detalhados
const giftCardsDemo = [
  {
    id: 'GC001',
    nome: 'Cartão Presente Natal',
    codigo: 'WINTERGIFT25',
    valorInicial: 50.00,
    valorAtual: 25.50,
    status: 'Ativo',
    cliente: {
      email: 'cliente1@email.com',
      nome: 'João Silva',
      telefone: '(11) 98765-4321'
    },
    tipo: 'Pré-pago',
    formato: 'Digital',
    reutilizavel: true,
    dataAtivacao: '2023-12-20',
    dataExpiracao: '2024-12-31',
    historicoUso: [
      { data: '2024-02-15', valor: 24.50, pedido: '#ORD8745' },
    ],
    estatisticas: {
      totalUtilizado: 'R$ 24,50',
      saldoRestante: 'R$ 25,50',
      percentualUtilizado: '49%',
      diasRestantes: 142
    }
  },
  {
    id: 'GC002',
    nome: 'Vale Presente Verão',
    codigo: 'SUMMERFUN100',
    valorInicial: 100.00,
    valorAtual: 100.00,
    status: 'Ativo',
    cliente: null,
    tipo: 'Pré-pago',
    formato: 'Físico',
    reutilizavel: false,
    dataAtivacao: '2024-05-01',
    dataExpiracao: '2025-06-30',
    historicoUso: [],
    estatisticas: {
      totalUtilizado: 'R$ 0,00',
      saldoRestante: 'R$ 100,00',
      percentualUtilizado: '0%',
      diasRestantes: 324
    }
  },
  {
    id: 'GC003',
    nome: 'Brinde Especial',
    codigo: 'SPECIAL10OFF',
    valorInicial: 10.00,
    valorAtual: 0.00,
    status: 'Utilizado',
    cliente: {
      email: 'cliente2@email.com',
      nome: 'Maria Oliveira',
      telefone: '(21) 99876-5432'
    },
    tipo: 'Pré-pago',
    formato: 'Digital',
    reutilizavel: false,
    dataAtivacao: '2024-01-10',
    dataExpiracao: '2024-08-15',
    historicoUso: [
      { data: '2024-01-15', valor: 10.00, pedido: '#ORD7654' },
    ],
    estatisticas: {
      totalUtilizado: 'R$ 10,00',
      saldoRestante: 'R$ 0,00',
      percentualUtilizado: '100%',
      diasRestantes: 45
    }
  },
  {
    id: 'GC004',
    nome: 'Presente de Aniversário',
    codigo: 'BIRTHDAYTREAT',
    valorInicial: 20.00,
    valorAtual: 20.00,
    status: 'Inativo',
    cliente: {
      email: 'cliente3@email.com',
      nome: 'Pedro Santos',
      telefone: '(31) 97654-3210'
    },
    tipo: 'Customizável',
    formato: 'Digital',
    reutilizavel: true,
    dataAtivacao: '2024-06-01',
    dataExpiracao: '2024-11-11',
    historicoUso: [],
    estatisticas: {
      totalUtilizado: 'R$ 0,00',
      saldoRestante: 'R$ 20,00',
      percentualUtilizado: '0%',
      diasRestantes: 132
    }
  },
  {
    id: 'GC005',
    nome: 'Gift Card Premium',
    codigo: 'PREMIUM200',
    valorInicial: 200.00,
    valorAtual: 150.00,
    status: 'Ativo',
    cliente: {
      email: 'cliente4@email.com',
      nome: 'Ana Rodrigues',
      telefone: '(11) 95432-1098'
    },
    tipo: 'Pré-pago',
    formato: 'Digital',
    reutilizavel: true,
    dataAtivacao: '2024-03-15',
    dataExpiracao: '2025-03-15',
    historicoUso: [
      { data: '2024-04-05', valor: 50.00, pedido: '#ORD9876' },
    ],
    estatisticas: {
      totalUtilizado: 'R$ 50,00',
      saldoRestante: 'R$ 150,00',
      percentualUtilizado: '25%',
      diasRestantes: 267
    }
  },
];

function ConsultarGiftCards() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo': return 'success';
      case 'Inativo': return 'error';
      case 'Utilizado': return 'default';
      case 'Expirado': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const filteredGiftCards = giftCardsDemo.filter(card => 
    card.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.cliente && card.cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleGiftCardStatus = (id, event) => {
    event.stopPropagation();
    // Lógica para ativar/desativar um gift card (seria integrado com API)
    console.log(`Alterando status do gift card ${id}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciar Gift Cards
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/gift-cards/criar"
          sx={{ borderRadius: '8px' }}
          startIcon={<AddCircle />}
        >
          Novo Gift Card
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar gift cards por nome, código ou email do cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      
      <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Gift Card</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Valor Atual/Inicial</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGiftCards.map((card) => (
              <React.Fragment key={card.id}>
                <StyledTableRow onClick={() => handleRowClick(card.id)}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {expandedRow === card.id ? 
                        <ExpandLess color="primary" sx={{ mr: 1 }} /> : 
                        <ExpandMore color="action" sx={{ mr: 1 }} />
                      }
                      <Typography variant="body1" fontWeight="medium">
                        {card.nome}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <CodeChip>
                      {card.codigo}
                    </CodeChip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {card.tipo} • {card.formato}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.reutilizavel ? 'Reutilizável' : 'Uso único'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(card.valorAtual)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      de {formatCurrency(card.valorInicial)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={card.status}
                      color={getStatusColor(card.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(card.dataAtivacao)} - {formatDate(card.dataExpiracao)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" size="small" onClick={(e) => { e.stopPropagation(); }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      color={card.status === 'Ativo' ? 'error' : 'success'} 
                      size="small"
                      onClick={(e) => toggleGiftCardStatus(card.id, e)}
                    >
                      {card.status === 'Ativo' ? <BlockIcon fontSize="small" /> : <RefreshOutlined fontSize="small" />}
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expandedRow === card.id} timeout="auto" unmountOnExit>
                      <Box sx={{ m: 2, mb: 4, mt: 3 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Detalhes do Gift Card
                            </Typography>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Nome</Typography>
                              <Typography variant="body1" fontWeight="medium">{card.nome}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Código</Typography>
                              <Typography variant="body1" fontWeight="medium">{card.codigo}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Tipo</Typography>
                              <Typography variant="body2">{card.tipo}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Formato</Typography>
                              <Typography variant="body2">{card.formato}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Reutilizável</Typography>
                              <Typography variant="body2">{card.reutilizavel ? 'Sim' : 'Não'}</Typography>
                            </DetailItem>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Cliente
                            </Typography>
                            {card.cliente ? (
                              <>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Nome</Typography>
                                  <Typography variant="body2">{card.cliente.nome}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Email</Typography>
                                  <Typography variant="body2">{card.cliente.email}</Typography>
                                </DetailItem>
                                <DetailItem>
                                  <Typography variant="caption" color="text.secondary">Telefone</Typography>
                                  <Typography variant="body2">{card.cliente.telefone}</Typography>
                                </DetailItem>
                              </>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Nenhum cliente associado
                              </Typography>
                            )}

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Histórico de Uso
                            </Typography>
                            {card.historicoUso.length > 0 ? (
                              card.historicoUso.map((uso, index) => (
                                <DetailItem key={index}>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatDate(uso.data)} - Pedido {uso.pedido}
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {formatCurrency(uso.valor)}
                                  </Typography>
                                </DetailItem>
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Ainda não utilizado
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Estatísticas
                            </Typography>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Total Utilizado</Typography>
                              <Typography variant="body2" fontWeight="medium">{card.estatisticas.totalUtilizado}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Saldo Restante</Typography>
                              <Typography variant="body2" fontWeight="medium">{card.estatisticas.saldoRestante}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Percentual Utilizado</Typography>
                              <Typography variant="body2" fontWeight="medium">{card.estatisticas.percentualUtilizado}</Typography>
                            </DetailItem>
                            <DetailItem>
                              <Typography variant="caption" color="text.secondary">Dias Restantes</Typography>
                              <Typography variant="body2" fontWeight="medium">{card.estatisticas.diasRestantes}</Typography>
                            </DetailItem>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                              <Button 
                                startIcon={<ContentCopy />} 
                                sx={{ mr: 1 }}
                                onClick={(e) => { 
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(card.codigo);
                                }}
                              >
                                Copiar Código
                              </Button>
                              <Button 
                                startIcon={<BarChart />}
                                variant="outlined" 
                                color="primary"
                                sx={{ mr: 1 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Ver Relatório
                              </Button>
                              <Button 
                                variant="contained" 
                                color="primary"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Editar Gift Card
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            {filteredGiftCards.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <CardGiftcard sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Nenhum gift card encontrado.
                  </Typography>
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