import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  Button,
  Chip,
  styled,
} from '@mui/material';
import {
  People as PeopleIcon,
  Loyalty as LoyaltyIcon,
  Redeem as RedeemIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

// Componentes estilizados
const MetricCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  height: '100%',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
  borderRadius: '8px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
  height: '100%',
  minHeight: 300,
  display: 'flex',
  flexDirection: 'column',
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ChartBody = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const ValueWithTrend = styled(Box)(({ theme, trend }) => ({
  display: 'flex',
  alignItems: 'center',
  color: trend === 'up' ? theme.palette.success.main : (trend === 'down' ? theme.palette.error.main : 'inherit'),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
}));

const SmallButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  minWidth: 'unset',
}));

// Dados mockados para demonstração
const metricasData = {
  totalClientes: 1250,
  clientesAtivos: 875,
  clientesInativos: 375,
  totalPontosDistribuidos: 85750,
  totalPontosResgatados: 42500,
  totalRecompensasResgatadas: 320,
  ticketMedio: 230.45,
  taxaRetencao: 78,
  pontosExpirados: 3500,
  clientesPorNivel: {
    bronze: 820,
    prata: 325,
    ouro: 105
  },
  resgateMaisPopular: 'Desconto de R$ 50,00 (500 pontos)',
  tendencias: {
    clientes: 'up',
    pontos: 'up',
    resgates: 'down'
  },
  historicoMensal: [
    { mes: 'Jan', pontos: 6200, resgates: 20 },
    { mes: 'Fev', pontos: 7500, resgates: 32 },
    { mes: 'Mar', pontos: 7800, resgates: 35 },
    { mes: 'Abr', pontos: 8250, resgates: 38 },
    { mes: 'Mai', pontos: 9100, resgates: 45 },
    { mes: 'Jun', pontos: 10200, resgates: 52 }
  ],
  topClientes: [
    { id: 1, nome: 'Ana Silva', pontos: 2580, resgates: 5, nivel: 'ouro' },
    { id: 2, nome: 'Carlos Oliveira', pontos: 1850, resgates: 3, nivel: 'prata' },
    { id: 3, nome: 'Mariana Souza', pontos: 1720, resgates: 4, nivel: 'prata' },
    { id: 4, nome: 'Roberto Santos', pontos: 1650, resgates: 2, nivel: 'prata' },
    { id: 5, nome: 'Juliana Ferreira', pontos: 1450, resgates: 1, nivel: 'bronze' }
  ],
  ultimosResgates: [
    { id: 1, cliente: 'Ana Silva', recompensa: 'Desconto de R$ 50,00', pontos: 500, data: '2024-06-15' },
    { id: 2, cliente: 'Mariana Souza', recompensa: 'Frete Grátis', pontos: 300, data: '2024-06-14' },
    { id: 3, cliente: 'Carlos Oliveira', recompensa: 'Desconto de 15%', pontos: 400, data: '2024-06-12' },
    { id: 4, cliente: 'Roberto Santos', recompensa: 'Desconto de R$ 50,00', pontos: 500, data: '2024-06-10' },
    { id: 5, cliente: 'Pedro Almeida', recompensa: 'Produto Grátis', pontos: 800, data: '2024-06-08' }
  ]
};

function MetricCardComponent({ title, value, icon, trend, subtitle }) {
  return (
    <MetricCard>
      {icon && <Box sx={{ mr: 2, color: 'primary.main' }}>{React.cloneElement(icon, { sx: { fontSize: 40 }})}</Box>}
      <CardContent sx={{ p: '0 !important', flex: 1 }}>
        <Typography color="text.secondary" variant="body2" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          {trend && (
            <ValueWithTrend trend={trend} sx={{ ml: 1 }}>
              {trend === 'up' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {trend === 'up' ? '8.7%' : '3.2%'}
              </Typography>
            </ValueWithTrend>
          )}
        </Box>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </MetricCard>
  );
}

function LinePlaceholder() {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <ShowChartIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Gráfico de linha demonstrativo
      </Typography>
    </Box>
  );
}

function BarPlaceholder() {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <BarChartIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Gráfico de barras demonstrativo
      </Typography>
    </Box>
  );
}

function PiePlaceholder() {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <PieChartIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Gráfico de pizza demonstrativo
      </Typography>
    </Box>
  );
}

function getNivelChip(nivel) {
  switch(nivel) {
    case 'bronze':
      return <Chip size="small" label="Bronze" sx={{ bgcolor: '#cd7f32', color: 'white' }} />;
    case 'prata':
      return <Chip size="small" label="Prata" sx={{ bgcolor: '#C0C0C0', color: 'white' }} />;
    case 'ouro':
      return <Chip size="small" label="Ouro" sx={{ bgcolor: '#FFD700', color: 'black' }} />;
    default:
      return <Chip size="small" label={nivel} />;
  }
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function VisualizarMetricas() {
  const [periodoFiltro, setPeriodoFiltro] = useState('6meses');
  const [tabValue, setTabValue] = useState(0);

  const handleChangePeriodo = (event) => {
    setPeriodoFiltro(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Métricas do Programa de Fidelidade
        </Typography>
        
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={periodoFiltro}
            label="Período"
            onChange={handleChangePeriodo}
            size="small"
          >
            <MenuItem value="30dias">Últimos 30 dias</MenuItem>
            <MenuItem value="3meses">Últimos 3 meses</MenuItem>
            <MenuItem value="6meses">Últimos 6 meses</MenuItem>
            <MenuItem value="12meses">Últimos 12 meses</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Tabs 
        value={tabValue} 
        onChange={handleChangeTab} 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Visão Geral" icon={<TrendingUpIcon />} iconPosition="start" />
        <Tab label="Clientes" icon={<PeopleIcon />} iconPosition="start" />
        <Tab label="Resgates" icon={<RedeemIcon />} iconPosition="start" />
      </Tabs>
      
      {/* Painel: Visão Geral */}
      {tabValue === 0 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Total de Clientes"
                value={metricasData.totalClientes.toLocaleString('pt-BR')}
                icon={<PeopleIcon />}
                trend={metricasData.tendencias.clientes}
                subtitle={`${metricasData.clientesAtivos.toLocaleString('pt-BR')} ativos`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Pontos Distribuídos"
                value={metricasData.totalPontosDistribuidos.toLocaleString('pt-BR')}
                icon={<LoyaltyIcon />}
                trend={metricasData.tendencias.pontos}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Recompensas Resgatadas"
                value={metricasData.totalRecompensasResgatadas.toLocaleString('pt-BR')}
                icon={<RedeemIcon />}
                trend={metricasData.tendencias.resgates}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Taxa de Retenção"
                value={`${metricasData.taxaRetencao}%`}
                icon={<TrophyIcon />}
                trend="up"
              />
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Evolução no Período
          </SectionTitle>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Pontos e Resgates</Typography>
                  <Box>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ChartHeader>
                <ChartBody>
                  <LinePlaceholder />
                </ChartBody>
              </ChartContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Distribuição por Nível</Typography>
                </ChartHeader>
                <ChartBody>
                  <PiePlaceholder />
                  <Box sx={{ mt: 2, width: '100%' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">Bronze</Typography>
                          <Typography variant="h6">{metricasData.clientesPorNivel.bronze}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">Prata</Typography>
                          <Typography variant="h6">{metricasData.clientesPorNivel.prata}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">Ouro</Typography>
                          <Typography variant="h6">{metricasData.clientesPorNivel.ouro}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </ChartBody>
              </ChartContainer>
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Principais Insights
          </SectionTitle>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Comportamento de Resgate</Typography>
                </ChartHeader>
                <ChartBody>
                  <BarPlaceholder />
                </ChartBody>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Recompensa mais popular:</Typography>
                  <Typography variant="body2">{metricasData.resgateMaisPopular}</Typography>
                </Box>
              </ChartContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Clientes de Destaque</Typography>
                </ChartHeader>
                <Box sx={{ overflow: 'auto', maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Nível</TableCell>
                        <TableCell align="center">Pontos</TableCell>
                        <TableCell align="center">Resgates</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {metricasData.topClientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{getNivelChip(cliente.nivel)}</TableCell>
                          <TableCell align="center">{cliente.pontos}</TableCell>
                          <TableCell align="center">{cliente.resgates}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <SmallButton variant="text" color="primary">
                    Ver todos os clientes
                  </SmallButton>
                </Box>
              </ChartContainer>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Painel: Clientes */}
      {tabValue === 1 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Total de Clientes"
                value={metricasData.totalClientes.toLocaleString('pt-BR')}
                icon={<PeopleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Clientes Ativos"
                value={metricasData.clientesAtivos.toLocaleString('pt-BR')}
                icon={<PersonIcon />}
                subtitle={`${Math.round(metricasData.clientesAtivos/metricasData.totalClientes*100)}% do total`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Ticket Médio"
                value={`R$ ${metricasData.ticketMedio.toLocaleString('pt-BR')}`}
                icon={<TrendingUpIcon />}
                trend="up"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Pontos por Cliente"
                value={(metricasData.totalPontosDistribuidos / metricasData.clientesAtivos).toFixed(0)}
                icon={<LoyaltyIcon />}
              />
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Distribuição de Clientes
          </SectionTitle>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Por Nível</Typography>
                </ChartHeader>
                <ChartBody>
                  <PiePlaceholder />
                </ChartBody>
              </ChartContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Por Segmento</Typography>
                </ChartHeader>
                <ChartBody>
                  <PiePlaceholder />
                </ChartBody>
              </ChartContainer>
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Lista de Clientes
          </SectionTitle>
          
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Nível</TableCell>
                  <TableCell align="center">Total de Pontos</TableCell>
                  <TableCell align="center">Pontos Utilizados</TableCell>
                  <TableCell align="center">Pontos Disponíveis</TableCell>
                  <TableCell align="center">Resgates</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metricasData.topClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{getNivelChip(cliente.nivel)}</TableCell>
                    <TableCell align="center">{cliente.pontos}</TableCell>
                    <TableCell align="center">{Math.round(cliente.pontos * 0.4)}</TableCell>
                    <TableCell align="center">{Math.round(cliente.pontos * 0.6)}</TableCell>
                    <TableCell align="center">{cliente.resgates}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined">Ver todos os clientes</Button>
          </Box>
        </>
      )}
      
      {/* Painel: Resgates */}
      {tabValue === 2 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Total de Resgates"
                value={metricasData.totalRecompensasResgatadas.toLocaleString('pt-BR')}
                icon={<RedeemIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Pontos Resgatados"
                value={metricasData.totalPontosResgatados.toLocaleString('pt-BR')}
                icon={<LoyaltyIcon />}
                subtitle={`${Math.round(metricasData.totalPontosResgatados/metricasData.totalPontosDistribuidos*100)}% do total`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Pontos Expirados"
                value={metricasData.pontosExpirados.toLocaleString('pt-BR')}
                icon={<CalendarIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent
                title="Média de Pontos por Resgate"
                value={(metricasData.totalPontosResgatados / metricasData.totalRecompensasResgatadas).toFixed(0)}
                icon={<TimelineIcon />}
              />
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Desempenho de Resgates
          </SectionTitle>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Resgates por Período</Typography>
                </ChartHeader>
                <ChartBody>
                  <LinePlaceholder />
                </ChartBody>
              </ChartContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <ChartContainer>
                <ChartHeader>
                  <Typography variant="h6">Tipos de Recompensas</Typography>
                </ChartHeader>
                <ChartBody>
                  <PiePlaceholder />
                </ChartBody>
              </ChartContainer>
            </Grid>
          </Grid>
          
          <SectionTitle variant="h5">
            Últimos Resgates
          </SectionTitle>
          
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Recompensa</TableCell>
                  <TableCell align="center">Pontos Utilizados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metricasData.ultimosResgates.map((resgate) => (
                  <TableRow key={resgate.id}>
                    <TableCell>{formatDate(resgate.data)}</TableCell>
                    <TableCell>{resgate.cliente}</TableCell>
                    <TableCell>{resgate.recompensa}</TableCell>
                    <TableCell align="center">{resgate.pontos}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined">Ver todos os resgates</Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default VisualizarMetricas; 