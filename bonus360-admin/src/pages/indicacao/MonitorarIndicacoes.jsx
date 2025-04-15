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
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Stack,
  Tooltip,
  styled
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  RedeemOutlined as RewardIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  FileDownload as DownloadIcon,
  PersonAdd as PersonAddIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

// Componentes estilizados
const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
  borderRadius: '8px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, highlight }) => ({
  cursor: 'pointer',
  backgroundColor: highlight ? 'rgba(25, 118, 210, 0.04)' : 'inherit',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& > *': {
    borderBottom: 'unset',
  },
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StatusBadge = styled(Chip)(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'concluida': return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'pendente': return { bg: '#fff8e1', color: '#f57c00' };
      case 'expirada': return { bg: '#ffebee', color: '#d32f2f' };
      case 'cancelada': return { bg: '#eeeeee', color: '#757575' };
      default: return { bg: '#e3f2fd', color: '#1976d2' };
    }
  };
  
  const colors = getStatusColor();
  
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 'medium',
    borderRadius: '16px',
    border: `1px solid ${colors.color}`,
    '& .MuiChip-icon': {
      color: colors.color,
    },
  };
});

// Dados Hardcoded mais detalhados
const mockIndications = [
  {
    id: 'IND001',
    quemIndicou: {
      email: 'carlos.silva@gmail.com',
      nome: 'Carlos Silva',
      telefone: '(11) 98765-4321',
      totalIndicacoes: 5,
      cliente: true
    },
    indicado: {
      email: 'mariana.santos@gmail.com',
      nome: 'Mariana Santos',
      telefone: '(11) 91234-5678',
      cliente: true
    },
    programa: 'Indique Amigos',
    metodo: 'Link personalizado',
    status: 'concluida',
    dataIndicacao: '2024-06-01',
    dataConversao: '2024-06-05',
    valorCompra: 250.00,
    recompensa: 'R$ 50,00 em desconto',
    dataRecompensa: '2024-06-07',
    observacoes: 'Cliente satisfeito, primeira indicação convertida.'
  },
  {
    id: 'IND002',
    quemIndicou: {
      email: 'ana.oliveira@gmail.com',
      nome: 'Ana Oliveira',
      telefone: '(21) 99876-5432',
      totalIndicacoes: 3,
      cliente: true
    },
    indicado: {
      email: 'pedro.costa@gmail.com',
      nome: 'Pedro Costa',
      telefone: '(21) 98877-6655',
      cliente: false
    },
    programa: 'Indique e Ganhe',
    metodo: 'Código de indicação',
    status: 'pendente',
    dataIndicacao: '2024-06-10',
    dataConversao: null,
    valorCompra: null,
    recompensa: 'Pendente',
    dataRecompensa: null,
    observacoes: 'Indicado já se cadastrou, aguardando compra mínima para recompensar.'
  },
  {
    id: 'IND003',
    quemIndicou: {
      email: 'roberto.almeida@gmail.com',
      nome: 'Roberto Almeida',
      telefone: '(31) 98765-1234',
      totalIndicacoes: 1,
      cliente: true
    },
    indicado: {
      email: 'julia.lima@gmail.com',
      nome: 'Júlia Lima',
      telefone: '',
      cliente: false
    },
    programa: 'Indique Amigos',
    metodo: 'Link personalizado',
    status: 'expirada',
    dataIndicacao: '2024-05-05',
    dataConversao: null,
    valorCompra: null,
    recompensa: 'Expirada',
    dataRecompensa: null,
    observacoes: 'Prazo de 30 dias expirado, indicado não realizou compra.'
  },
  {
    id: 'IND004',
    quemIndicou: {
      email: 'fernanda.gomes@gmail.com',
      nome: 'Fernanda Gomes',
      telefone: '(11) 97654-3210',
      totalIndicacoes: 8,
      cliente: true
    },
    indicado: {
      email: 'rodrigo.martins@gmail.com',
      nome: 'Rodrigo Martins',
      telefone: '(11) 91122-3344',
      cliente: true
    },
    programa: 'VIP Indique',
    metodo: 'QR Code',
    status: 'concluida',
    dataIndicacao: '2024-06-12',
    dataConversao: '2024-06-15',
    valorCompra: 780.00,
    recompensa: 'R$ 100,00 em cashback',
    dataRecompensa: '2024-06-16',
    observacoes: 'Cliente VIP, indicação premium.'
  },
  {
    id: 'IND005',
    quemIndicou: {
      email: 'carlos.silva@gmail.com',
      nome: 'Carlos Silva',
      telefone: '(11) 98765-4321',
      totalIndicacoes: 5,
      cliente: true
    },
    indicado: {
      email: 'bruno.ferreira@gmail.com',
      nome: 'Bruno Ferreira',
      telefone: '(11) 98888-7777',
      cliente: false
    },
    programa: 'Indique Amigos',
    metodo: 'Link personalizado',
    status: 'cancelada',
    dataIndicacao: '2024-05-20',
    dataConversao: null,
    valorCompra: null,
    recompensa: 'Cancelada',
    dataRecompensa: null,
    observacoes: 'Indicação cancelada após verificação de fraude.'
  },
];

// Estatísticas resumidas para o dashboard
const estatisticas = {
  totalIndicacoes: 120,
  indicacoesAtivas: 65,
  taxaConversao: 48,
  valorGerado: 12750.00,
  recompensasDistribuidas: 5800.00,
  topIndicadores: [
    { nome: 'Fernanda Gomes', total: 8 },
    { nome: 'Carlos Silva', total: 5 },
    { nome: 'Ana Oliveira', total: 3 }
  ]
};

function MonitorarIndicacoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [programaFilter, setProgramaFilter] = useState('todos');
  const [periodoFilter, setPeriodoFilter] = useState('30dias');
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleProgramaFilterChange = (event) => {
    setProgramaFilter(event.target.value);
  };

  const handlePeriodoFilterChange = (event) => {
    setPeriodoFilter(event.target.value);
  };

  // Filtrar indicações com base nos filtros aplicados
  const filteredIndications = mockIndications.filter(ind => {
    const matchesSearch = 
      ind.quemIndicou.nome.toLowerCase().includes(searchTerm) || 
      ind.quemIndicou.email.toLowerCase().includes(searchTerm) ||
      ind.indicado.nome.toLowerCase().includes(searchTerm) ||
      ind.indicado.email.toLowerCase().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'todos' || ind.status === statusFilter;
    const matchesPrograma = programaFilter === 'todos' || ind.programa === programaFilter;
    
    return matchesSearch && matchesStatus && matchesPrograma;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'concluida': return <CheckCircleIcon />;
      case 'pendente': return <HourglassEmptyIcon />;
      case 'expirada': return <CancelIcon />;
      case 'cancelada': return <CancelIcon />;
      default: return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'concluida': return 'Concluída';
      case 'pendente': return 'Pendente';
      case 'expirada': return 'Expirada';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Poderia adicionar um toast/snackbar aqui
    alert(`Copiado: ${text}`);
  };

  // Filtros disponíveis para programas (obtidos dinamicamente a partir dos dados)
  const programasDisponiveis = ['todos', ...new Set(mockIndications.map(ind => ind.programa))];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Monitorar Indicações
        </Typography>
        
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />} 
            sx={{ mr: 2 }}
          >
            Exportar
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            href="/indicacao/configurar"
          >
            Novo Programa
          </Button>
        </Box>
      </Box>
      
      {/* Dashboard */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Total de Indicações
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h4" component="div">
                  {estatisticas.totalIndicacoes}
                </Typography>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                +12% este mês
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Taxa de Conversão
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="h4" component="div">
                  {estatisticas.taxaConversao}%
                </Typography>
              </Box>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                {estatisticas.indicacoesAtivas} indicações ativas
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Valor Gerado
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" component="div">
                  R$ {estatisticas.valorGerado.toLocaleString('pt-BR')}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Recompensas: R$ {estatisticas.recompensasDistribuidas.toLocaleString('pt-BR')}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Melhores Indicadores
              </Typography>
              <Stack spacing={1}>
                {estatisticas.topIndicadores.map((indicador, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                      {indicador.nome}
                    </Typography>
                    <Typography variant="body2" color="primary.main">
                      {indicador.total}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </MetricCard>
        </Grid>
      </Grid>
      
      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={handleStatusFilterChange}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="concluida">Concluída</MenuItem>
                  <MenuItem value="pendente">Pendente</MenuItem>
                  <MenuItem value="expirada">Expirada</MenuItem>
                  <MenuItem value="cancelada">Cancelada</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Programa</InputLabel>
                <Select
                  value={programaFilter}
                  label="Programa"
                  onChange={handleProgramaFilterChange}
                >
                  {programasDisponiveis.map((programa) => (
                    <MenuItem key={programa} value={programa}>
                      {programa === 'todos' ? 'Todos os programas' : programa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Período</InputLabel>
                <Select
                  value={periodoFilter}
                  label="Período"
                  onChange={handlePeriodoFilterChange}
                >
                  <MenuItem value="7dias">Últimos 7 dias</MenuItem>
                  <MenuItem value="30dias">Últimos 30 dias</MenuItem>
                  <MenuItem value="90dias">Últimos 90 dias</MenuItem>
                  <MenuItem value="todos">Todo o período</MenuItem>
                </Select>
              </FormControl>
              
              <Tooltip title="Limpar filtros">
                <IconButton 
                  color="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('todos');
                    setProgramaFilter('todos');
                    setPeriodoFilter('30dias');
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de Indicações */}
      <TableContainer component={Paper} sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)', borderRadius: '8px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="30%">Quem Indicou</TableCell>
              <TableCell width="30%">Quem Foi Indicado</TableCell>
              <TableCell>Programa</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIndications.length > 0 ? (
              filteredIndications.map((ind) => (
                <React.Fragment key={ind.id}>
                  <StyledTableRow 
                    onClick={() => handleRowClick(ind.id)}
                    highlight={expandedRow === ind.id}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {expandedRow === ind.id ? 
                          <ExpandLessIcon color="primary" sx={{ mr: 1 }} /> : 
                          <ExpandMoreIcon color="action" sx={{ mr: 1 }} />
                        }
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {ind.quemIndicou.nome}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ind.quemIndicou.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {ind.indicado.nome || ind.indicado.email}
                      </Typography>
                      {ind.indicado.nome && (
                        <Typography variant="caption" color="text.secondary">
                          {ind.indicado.email}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ind.programa}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={ind.status}
                        icon={getStatusIcon(ind.status)}
                        label={getStatusLabel(ind.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(ind.dataIndicacao)}
                      </Typography>
                    </TableCell>
                  </StyledTableRow>
                  
                  {/* Linha expandida com detalhes */}
                  <TableRow>
                    <TableCell colSpan={5} sx={{ py: 0 }}>
                      <Collapse in={expandedRow === ind.id} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Detalhes da Indicação #{ind.id}
                          </Typography>
                          
                          <Grid container spacing={3}>
                            {/* Coluna de quem indicou */}
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" color="primary" gutterBottom>
                                Quem Indicou
                              </Typography>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Nome</Typography>
                                <Typography variant="body1">{ind.quemIndicou.nome}</Typography>
                              </Box>
                              
                              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">{ind.quemIndicou.email}</Typography>
                                <IconButton size="small" onClick={() => copyToClipboard(ind.quemIndicou.email)}>
                                  <CopyIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              
                              {ind.quemIndicou.telefone && (
                                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2">{ind.quemIndicou.telefone}</Typography>
                                </Box>
                              )}
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Total de Indicações</Typography>
                                <Typography variant="body1">{ind.quemIndicou.totalIndicacoes}</Typography>
                              </Box>
                            </Grid>
                            
                            {/* Coluna do indicado */}
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" color="primary" gutterBottom>
                                Quem Foi Indicado
                              </Typography>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Nome</Typography>
                                <Typography variant="body1">{ind.indicado.nome || '-'}</Typography>
                              </Box>
                              
                              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">{ind.indicado.email}</Typography>
                                <IconButton size="small" onClick={() => copyToClipboard(ind.indicado.email)}>
                                  <CopyIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              
                              {ind.indicado.telefone && (
                                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2">{ind.indicado.telefone}</Typography>
                                </Box>
                              )}
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Cliente?</Typography>
                                <Typography variant="body1">{ind.indicado.cliente ? 'Sim' : 'Não'}</Typography>
                              </Box>
                            </Grid>
                            
                            {/* Coluna de detalhes da transação */}
                            <Grid item xs={12} md={4}>
                              <Typography variant="subtitle2" color="primary" gutterBottom>
                                Detalhes da Transação
                              </Typography>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Método de Indicação</Typography>
                                <Typography variant="body1">{ind.metodo}</Typography>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Data da Indicação</Typography>
                                <Typography variant="body1">{formatDate(ind.dataIndicacao)}</Typography>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Data de Conversão</Typography>
                                <Typography variant="body1">{formatDate(ind.dataConversao)}</Typography>
                              </Box>
                              
                              {ind.valorCompra && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" color="text.secondary">Valor da Compra</Typography>
                                  <Typography variant="body1">R$ {ind.valorCompra.toFixed(2)}</Typography>
                                </Box>
                              )}
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Recompensa</Typography>
                                <Typography variant="body1">{ind.recompensa}</Typography>
                              </Box>
                              
                              {ind.observacoes && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" color="text.secondary">Observações</Typography>
                                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{ind.observacoes}</Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                          
                          {/* Ações */}
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button 
                              variant="outlined"
                              color="primary"
                              sx={{ mr: 1 }}
                            >
                              Ver Detalhes do Cliente
                            </Button>
                            <Button 
                              variant="contained"
                              color="primary"
                            >
                              Gerenciar Indicação
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PeopleIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Nenhuma indicação encontrada com os filtros atuais.
                    </Typography>
                  </Box>
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