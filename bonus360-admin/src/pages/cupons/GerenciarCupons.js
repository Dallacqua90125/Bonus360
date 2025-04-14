import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Grid,
  Divider,
  styled,
} from '@mui/material';
import { 
  Block, 
  Search, 
  Edit, 
  Delete, 
  ContentCopy, 
  ExpandMore, 
  ExpandLess,
  LocalOffer,
  QrCode2,
  Share
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

// Dados de exemplo mais completos
const cuponsDemo = [
  {
    id: 1,
    codigo: 'BLACK-123456',
    campanha: 'Black Friday 2024',
    descricao: 'Desconto especial para Black Friday em todos os produtos eletrônicos',
    tipoDesconto: 'percentual',
    desconto: '20%',
    status: 'ativo',
    usos: 0,
    maxUsos: 1000,
    limitePorCliente: 1,
    tipoCupom: 'limitado',
    dataInicio: '2024-11-20',
    dataFim: '2024-11-30',
    freteIncluso: true,
    valorMinimoPedido: 200,
    qtdMinimaItens: null,
    aplicavelEm: 'Produtos eletrônicos',
    exclusoes: 'Não aplicável em smartphones',
    estatisticas: {
      conversao: '0%',
      ticketMedio: 'R$ 0,00',
      economia: 'R$ 0,00'
    }
  },
  {
    id: 2,
    codigo: 'SUMMER-789012',
    campanha: 'Cashback Verão',
    descricao: 'Cupom de desconto fixo para produtos de verão',
    tipoDesconto: 'valor',
    desconto: 'R$ 50,00',
    status: 'usado',
    usos: 1,
    maxUsos: 1,
    limitePorCliente: 1,
    tipoCupom: 'unico',
    dataInicio: '2024-06-01',
    dataFim: '2024-08-31',
    freteIncluso: false,
    valorMinimoPedido: 150,
    qtdMinimaItens: 2,
    aplicavelEm: 'Categoria Praia e Piscina',
    exclusoes: 'Produtos em promoção',
    estatisticas: {
      conversao: '100%',
      ticketMedio: 'R$ 210,50',
      economia: 'R$ 50,00'
    }
  },
  {
    id: 3,
    codigo: 'WELCOME-50OFF',
    campanha: 'Primeira Compra',
    descricao: 'Desconto para novos clientes em sua primeira compra',
    tipoDesconto: 'percentual',
    desconto: '50%',
    status: 'ativo',
    usos: 156,
    maxUsos: 500,
    limitePorCliente: 1,
    tipoCupom: 'limitado',
    dataInicio: '2024-01-01',
    dataFim: '2024-12-31',
    freteIncluso: true,
    valorMinimoPedido: 100,
    qtdMinimaItens: null,
    aplicavelEm: 'Todas as categorias',
    exclusoes: 'Marcas premium',
    estatisticas: {
      conversao: '62%',
      ticketMedio: 'R$ 135,80',
      economia: 'R$ 10.665,00'
    }
  },
  {
    id: 4,
    codigo: 'FRETEGRATIS',
    campanha: 'Frete Grátis',
    descricao: 'Cupom de frete grátis para todo o site',
    tipoDesconto: 'frete',
    desconto: 'Frete Grátis',
    status: 'ativo',
    usos: 278,
    maxUsos: null,
    limitePorCliente: 3,
    tipoCupom: 'multiplo',
    dataInicio: '2024-05-01',
    dataFim: '2024-07-31',
    freteIncluso: true,
    valorMinimoPedido: 80,
    qtdMinimaItens: null,
    aplicavelEm: 'Todo o site',
    exclusoes: 'Apenas para Sul e Sudeste',
    estatisticas: {
      conversao: '78%',
      ticketMedio: 'R$ 145,30',
      economia: 'R$ 6.952,00'
    }
  }
];

function GerenciarCupons() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ativo': return 'success';
      case 'usado': return 'default';
      case 'expirado': return 'warning';
      case 'inativo': return 'error';
      default: return 'default';
    }
  };

  const formatarData = (data) => {
    if (!data) return '-';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const getDescontoLabel = (cupom) => {
    switch(cupom.tipoDesconto) {
      case 'percentual': return `${cupom.desconto} OFF`;
      case 'valor': return cupom.desconto;
      case 'frete': return 'Frete Grátis';
      case 'produto': return 'Produto Grátis';
      default: return cupom.desconto;
    }
  };

  const getDescontoBackground = (tipoDesconto) => {
    switch(tipoDesconto) {
      case 'percentual': return '#e3f2fd';
      case 'valor': return '#e8f5e9';
      case 'frete': return '#fff8e1';
      case 'produto': return '#f3e5f5';
      default: return '#f5f5f5';
    }
  };

  const filteredCupons = cuponsDemo.filter(cupom => 
    cupom.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cupom.campanha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cupom.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciar Cupons
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/cupons/gerar"
          sx={{ borderRadius: '8px' }}
          startIcon={<LocalOffer />}
        >
          Novo Cupom
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar cupons por código, campanha ou descrição..."
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
      
      <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="25%"><Typography fontWeight="bold">Código</Typography></TableCell>
              <TableCell width="20%"><Typography fontWeight="bold">Campanha</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Desconto</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Utilização</Typography></TableCell>
              <TableCell width="10%"><Typography fontWeight="bold">Ações</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhum cupom encontrado com os termos da busca.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCupons.map((cupom) => (
                <React.Fragment key={cupom.id}>
                  <StyledTableRow onClick={() => handleRowClick(cupom.id)}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {expandedRow === cupom.id ? 
                          <ExpandLess color="primary" sx={{ mr: 1 }} /> : 
                          <ExpandMore color="action" sx={{ mr: 1 }} />
                        }
                        <Typography variant="body2" fontFamily="monospace">
                          {cupom.codigo}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{cupom.campanha}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getDescontoLabel(cupom)}
                        size="small"
                        sx={{ 
                          backgroundColor: getDescontoBackground(cupom.tipoDesconto),
                          color: 'text.primary',
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={cupom.status}
                        color={getStatusColor(cupom.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {cupom.usos}{cupom.maxUsos ? `/${cupom.maxUsos}` : ''} 
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                          ({cupom.limitePorCliente ? `${cupom.limitePorCliente}x por cliente` : 'ilimitado'})
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" size="small" onClick={(e) => { e.stopPropagation(); }}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        size="small" 
                        disabled={cupom.status !== 'ativo'}
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Block fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>

                  <TableRow>
                    <TableCell colSpan={6} style={{ padding: 0, border: 0 }}>
                      <Collapse in={expandedRow === cupom.id} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Detalhes do Cupom
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Descrição</Typography>
                                <Typography variant="body2">{cupom.descricao}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Tipo de Cupom</Typography>
                                <Typography variant="body2">
                                  {cupom.tipoCupom === 'unico' ? 'Uso único' : 
                                   cupom.tipoCupom === 'multiplo' ? 'Múltiplo uso' : 
                                   cupom.tipoCupom === 'limitado' ? 'Limitado por cliente' : 
                                   cupom.tipoCupom === 'grupo' ? 'Cupom de grupo' : cupom.tipoCupom}
                                </Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Período de Validade</Typography>
                                <Typography variant="body2">
                                  {formatarData(cupom.dataInicio)} até {formatarData(cupom.dataFim)}
                                </Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Condições
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Aplicável em</Typography>
                                <Typography variant="body2">{cupom.aplicavelEm}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Exclusões</Typography>
                                <Typography variant="body2">{cupom.exclusoes || '-'}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Requisitos</Typography>
                                <Typography variant="body2">
                                  {cupom.valorMinimoPedido ? `Valor mínimo: R$ ${cupom.valorMinimoPedido}` : 'Sem valor mínimo'}
                                  {cupom.qtdMinimaItens ? `, Mínimo ${cupom.qtdMinimaItens} itens` : ''}
                                  {cupom.freteIncluso ? ', Frete incluso' : ''}
                                </Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Estatísticas
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Taxa de Conversão</Typography>
                                <Typography variant="body2" fontWeight="medium">{cupom.estatisticas.conversao}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Ticket Médio</Typography>
                                <Typography variant="body2" fontWeight="medium">{cupom.estatisticas.ticketMedio}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Economia Gerada</Typography>
                                <Typography variant="body2" fontWeight="medium">{cupom.estatisticas.economia}</Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button 
                                  startIcon={<ContentCopy />} 
                                  sx={{ mr: 1 }}
                                  onClick={(e) => { 
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(cupom.codigo);
                                  }}
                                >
                                  Copiar Código
                                </Button>
                                <Button 
                                  startIcon={<QrCode2 />}
                                  variant="outlined" 
                                  color="primary"
                                  sx={{ mr: 1 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Gerar QR Code
                                </Button>
                                <Button 
                                  startIcon={<Share />}
                                  variant="outlined" 
                                  color="primary"
                                  sx={{ mr: 1 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Compartilhar
                                </Button>
                                <Button 
                                  variant="contained" 
                                  color="primary"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Editar Cupom
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GerenciarCupons; 