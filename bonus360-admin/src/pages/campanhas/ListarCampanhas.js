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
  IconButton,
  Chip,
  Collapse,
  Grid,
  Button,
  Divider,
  styled,
  TextField,
  InputAdornment,
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  ExpandMore, 
  ExpandLess,
  ContentCopy,
  BarChart,
  AddCircle,
  Search,
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

const campanhasDemo = [
  {
    id: 1,
    nome: 'Black Friday 2024',
    descricao: 'Desconto especial em todos os produtos durante a Black Friday',
    tipo: 'desconto',
    tipoDesconto: 'Percentual',
    valorDesconto: '30%',
    codigoCupom: 'BLACK30',
    status: 'Ativa',
    dataInicio: '2024-11-20',
    dataFim: '2024-11-30',
    horaInicio: '00:00',
    horaFim: '23:59',
    publicoAlvo: 'Todos',
    condicaoDesconto: 'Compras acima de R$ 200,00',
    usosPorCliente: 1,
    usosTotais: 1000,
    frequenciaUso: '1x por cliente',
    incompativel: true,
    aplicaEm: 'Eletrônicos, Vestuário',
    exclusoes: 'Produtos já em promoção',
    freteIncluso: false,
    aplicaAutomatico: true,
    estatisticas: {
      usos: 324,
      vendas: 'R$ 102.450,00',
      ticketMedio: 'R$ 316,20',
      conversao: '65%'
    }
  },
  {
    id: 2,
    nome: 'Cashback Verão',
    descricao: 'Receba 10% do valor de volta em compras na categoria Praia',
    tipo: 'cashback',
    tipoDesconto: 'Cashback',
    valorDesconto: '10%',
    codigoCupom: 'VERAO10',
    status: 'Agendada',
    dataInicio: '2024-12-01',
    dataFim: '2024-12-31',
    horaInicio: '00:00',
    horaFim: '23:59',
    publicoAlvo: 'Clientes cadastrados',
    condicaoDesconto: 'Compras na categoria Praia',
    usosPorCliente: 3,
    usosTotais: 5000,
    frequenciaUso: '1x por semana',
    incompativel: false,
    aplicaEm: 'Categoria Praia',
    exclusoes: 'Produtos de terceiros',
    freteIncluso: false,
    aplicaAutomatico: false,
    estatisticas: {
      usos: 0,
      vendas: 'R$ 0,00',
      ticketMedio: 'R$ 0,00',
      conversao: '0%'
    }
  },
  {
    id: 3,
    nome: 'Primeira Compra',
    descricao: 'Desconto para novos clientes em sua primeira compra',
    tipo: 'desconto',
    tipoDesconto: 'Valor Fixo',
    valorDesconto: 'R$ 50,00',
    codigoCupom: 'BEMVINDO50',
    status: 'Ativa',
    dataInicio: '2024-01-01',
    dataFim: '2024-12-31',
    horaInicio: '00:00',
    horaFim: '23:59',
    publicoAlvo: 'Novos clientes',
    condicaoDesconto: 'Primeira compra acima de R$ 150,00',
    usosPorCliente: 1,
    usosTotais: null,
    frequenciaUso: 'Uso único',
    incompativel: true,
    aplicaEm: 'Todas as categorias',
    exclusoes: 'Produtos em promoção',
    freteIncluso: true,
    aplicaAutomatico: true,
    estatisticas: {
      usos: 872,
      vendas: 'R$ 165.680,00',
      ticketMedio: 'R$ 190,00',
      conversao: '78%'
    }
  },
  {
    id: 4,
    nome: 'Frete Grátis Final de Ano',
    descricao: 'Frete grátis para todo o site no final do ano',
    tipo: 'frete',
    tipoDesconto: 'Frete Grátis',
    valorDesconto: 'Frete Grátis',
    codigoCupom: 'FRETEGRATIS',
    status: 'Finalizada',
    dataInicio: '2023-12-15',
    dataFim: '2023-12-31',
    horaInicio: '00:00',
    horaFim: '23:59',
    publicoAlvo: 'Todos',
    condicaoDesconto: 'Compras acima de R$ 100,00',
    usosPorCliente: 2,
    usosTotais: 2000,
    frequenciaUso: '1x por compra',
    incompativel: false,
    aplicaEm: 'Todo o site',
    exclusoes: 'Nenhuma',
    freteIncluso: true,
    aplicaAutomatico: true,
    estatisticas: {
      usos: 1453,
      vendas: 'R$ 217.950,00',
      ticketMedio: 'R$ 150,00',
      conversao: '85%'
    }
  }
];

function ListarCampanhas() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativa': return 'success';
      case 'Agendada': return 'warning';
      case 'Finalizada': return 'default';
      case 'Cancelada': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getDescontoBackground = (tipoDesconto) => {
    switch(tipoDesconto) {
      case 'Percentual': return '#e3f2fd';
      case 'Valor Fixo': return '#e8f5e9';
      case 'Frete Grátis': return '#fff8e1';
      case 'Produto Grátis': return '#f3e5f5';
      case 'Cashback': return '#ede7f6';
      default: return '#f5f5f5';
    }
  };

  const getDescontoLabel = (campanha) => {
    if (campanha.tipoDesconto === 'Percentual') return `${campanha.valorDesconto} OFF`;
    return campanha.valorDesconto;
  };

  const filteredCampanhas = campanhasDemo.filter(campanha => 
    campanha.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campanha.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (campanha.codigoCupom && campanha.codigoCupom.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciar Campanhas
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/campanhas/criar"
          sx={{ borderRadius: '8px' }}
          startIcon={<AddCircle />}
        >
          Nova Campanha
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar campanhas por nome, descrição ou código de cupom..."
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
              <TableCell width="25%"><Typography fontWeight="bold">Nome da Campanha</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Tipo de Desconto</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Código do Cupom</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell width="15%"><Typography fontWeight="bold">Período</Typography></TableCell>
              <TableCell width="15%" align="center"><Typography fontWeight="bold">Ações</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampanhas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhuma campanha encontrada com os termos da busca.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampanhas.map((campanha) => (
                <React.Fragment key={campanha.id}>
                  <StyledTableRow onClick={() => handleRowClick(campanha.id)}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {expandedRow === campanha.id ? 
                          <ExpandLess color="primary" sx={{ mr: 1 }} /> : 
                          <ExpandMore color="action" sx={{ mr: 1 }} />
                        }
                        <Typography variant="body2" fontWeight="medium">
                          {campanha.nome}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getDescontoLabel(campanha)}
                        size="small"
                        sx={{ 
                          backgroundColor: getDescontoBackground(campanha.tipoDesconto),
                          color: 'text.primary',
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                        {campanha.codigoCupom}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={campanha.status}
                        color={getStatusColor(campanha.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(campanha.dataInicio)} - {formatDate(campanha.dataFim)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small" onClick={(e) => { e.stopPropagation(); }}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        size="small" 
                        disabled={campanha.status !== 'Ativa'}
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>

                  <TableRow>
                    <TableCell colSpan={6} style={{ padding: 0, border: 0 }}>
                      <Collapse in={expandedRow === campanha.id} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Detalhes da Campanha
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Descrição</Typography>
                                <Typography variant="body2">{campanha.descricao}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Público Alvo</Typography>
                                <Typography variant="body2">{campanha.publicoAlvo}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Condição de Desconto</Typography>
                                <Typography variant="body2">{campanha.condicaoDesconto}</Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Condições
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Aplicável em</Typography>
                                <Typography variant="body2">{campanha.aplicaEm}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Exclusões</Typography>
                                <Typography variant="body2">{campanha.exclusoes || '-'}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Limites de Uso</Typography>
                                <Typography variant="body2">
                                  {campanha.usosPorCliente ? `${campanha.usosPorCliente}x por cliente` : 'Ilimitado por cliente'}
                                  {campanha.usosTotais ? `, máximo ${campanha.usosTotais} usos no total` : ''}
                                  {campanha.frequenciaUso ? `, ${campanha.frequenciaUso}` : ''}
                                </Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Estatísticas
                              </Typography>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Total de Usos</Typography>
                                <Typography variant="body2" fontWeight="medium">{campanha.estatisticas.usos}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Total de Vendas</Typography>
                                <Typography variant="body2" fontWeight="medium">{campanha.estatisticas.vendas}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Ticket Médio</Typography>
                                <Typography variant="body2" fontWeight="medium">{campanha.estatisticas.ticketMedio}</Typography>
                              </DetailItem>
                              <DetailItem>
                                <Typography variant="caption" color="text.secondary">Taxa de Conversão</Typography>
                                <Typography variant="body2" fontWeight="medium">{campanha.estatisticas.conversao}</Typography>
                              </DetailItem>
                            </Grid>

                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button 
                                  startIcon={<ContentCopy />} 
                                  sx={{ mr: 1 }}
                                  onClick={(e) => { 
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(campanha.codigoCupom);
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
                                  Editar Campanha
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

export default ListarCampanhas; 