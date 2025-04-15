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
  Avatar,
  TextField,
  InputAdornment,
  Tooltip,
  styled,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  FileDownload as DownloadIcon,
  Person as PersonIcon,
  Star as StarIcon,
  WorkspacePremium as PremiumIcon,
  Diamond as DiamondIcon,
  LocalOffer as OfferIcon,
  Redeem as RedeemIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledTableRow = styled(TableRow)(({ theme, rank }) => {
  let backgroundColor = 'inherit';
  let fontWeight = 'normal';
  
  if (rank === 1) {
    backgroundColor = 'rgba(255, 215, 0, 0.1)'; // Dourado
    fontWeight = 'bold';
  } else if (rank === 2) {
    backgroundColor = 'rgba(192, 192, 192, 0.1)'; // Prata
    fontWeight = 'bold';
  } else if (rank === 3) {
    backgroundColor = 'rgba(205, 127, 50, 0.1)'; // Bronze
    fontWeight = 'bold';
  }
  
  return {
    backgroundColor,
    fontWeight,
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '& > *': {
      borderBottom: 'unset',
    },
  };
});

const RankAvatar = styled(Avatar)(({ theme, rank }) => {
  let bgColor = theme.palette.grey[300];
  let color = theme.palette.text.primary;
  
  if (rank === 1) {
    bgColor = '#FFD700'; // Dourado
    color = '#000';
  } else if (rank === 2) {
    bgColor = '#C0C0C0'; // Prata
    color = '#000';
  } else if (rank === 3) {
    bgColor = '#CD7F32'; // Bronze
    color = '#fff';
  }
  
  return {
    backgroundColor: bgColor,
    color: color,
    width: 36,
    height: 36,
    fontSize: '0.875rem',
    fontWeight: 'bold',
  };
});

const NivelChip = styled(Chip)(({ theme, nivel }) => {
  let bgColor = theme.palette.grey[300];
  let color = theme.palette.text.primary;
  
  switch(nivel) {
    case 'bronze':
      bgColor = '#CD7F32';
      color = '#fff';
      break;
    case 'prata':
      bgColor = '#C0C0C0';
      color = '#000';
      break;
    case 'ouro':
      bgColor = '#FFD700';
      color = '#000';
      break;
    case 'platina':
      bgColor = '#E5E4E2';
      color = '#000';
      break;
    case 'diamante':
      bgColor = '#B9F2FF';
      color = '#000';
      break;
    default:
      break;
  }
  
  return {
    backgroundColor: bgColor,
    color: color,
    fontWeight: 'medium',
    borderRadius: '16px',
  };
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
}));

// Dados mockados para demonstração
const leaderboardData = {
  totalParticipantes: 1250,
  participantesAtivos: 875,
  mediaPontos: 1250,
  pontuacaoMaxima: 8750,
  topClientes: [
    { 
      id: 1, 
      nome: 'Ana Silva', 
      email: 'ana.silva@email.com',
      pontos: 8750, 
      nivel: 'diamante',
      conquistas: 12,
      posicaoAnterior: 2,
      tendencia: 'up'
    },
    { 
      id: 2, 
      nome: 'Carlos Oliveira', 
      email: 'carlos.oliveira@email.com',
      pontos: 7850, 
      nivel: 'platina',
      conquistas: 10,
      posicaoAnterior: 1,
      tendencia: 'down'
    },
    { 
      id: 3, 
      nome: 'Mariana Souza', 
      email: 'mariana.souza@email.com',
      pontos: 7200, 
      nivel: 'ouro',
      conquistas: 8,
      posicaoAnterior: 5,
      tendencia: 'up'
    },
    { 
      id: 4, 
      nome: 'Roberto Santos', 
      email: 'roberto.santos@email.com',
      pontos: 6850, 
      nivel: 'ouro',
      conquistas: 7,
      posicaoAnterior: 3,
      tendencia: 'down'
    },
    { 
      id: 5, 
      nome: 'Juliana Ferreira', 
      email: 'juliana.ferreira@email.com',
      pontos: 6500, 
      nivel: 'prata',
      conquistas: 6,
      posicaoAnterior: 4,
      tendencia: 'down'
    },
    { 
      id: 6, 
      nome: 'Pedro Alves', 
      email: 'pedro.alves@email.com',
      pontos: 6200, 
      nivel: 'prata',
      conquistas: 5,
      posicaoAnterior: 7,
      tendencia: 'up'
    },
    { 
      id: 7, 
      nome: 'Camila Lima', 
      email: 'camila.lima@email.com',
      pontos: 5900, 
      nivel: 'prata',
      conquistas: 5,
      posicaoAnterior: 6,
      tendencia: 'down'
    },
    { 
      id: 8, 
      nome: 'Lucas Costa', 
      email: 'lucas.costa@email.com',
      pontos: 5600, 
      nivel: 'bronze',
      conquistas: 4,
      posicaoAnterior: 9,
      tendencia: 'up'
    },
    { 
      id: 9, 
      nome: 'Fernanda Martins', 
      email: 'fernanda.martins@email.com',
      pontos: 5400, 
      nivel: 'bronze',
      conquistas: 4,
      posicaoAnterior: 8,
      tendencia: 'down'
    },
    { 
      id: 10, 
      nome: 'Rafael Pereira', 
      email: 'rafael.pereira@email.com',
      pontos: 5200, 
      nivel: 'bronze',
      conquistas: 3,
      posicaoAnterior: 10,
      tendencia: 'same'
    },
  ],
  periodos: [
    { id: 'semana', nome: 'Esta semana' },
    { id: 'mes', nome: 'Este mês' },
    { id: 'trimestre', nome: 'Este trimestre' },
    { id: 'ano', nome: 'Este ano' },
    { id: 'todos', nome: 'Todos os tempos' }
  ],
  niveis: [
    { id: 'todos', nome: 'Todos os níveis' },
    { id: 'bronze', nome: 'Bronze' },
    { id: 'prata', nome: 'Prata' },
    { id: 'ouro', nome: 'Ouro' },
    { id: 'platina', nome: 'Platina' },
    { id: 'diamante', nome: 'Diamante' }
  ]
};

function MetricCardComponent({ title, value, icon, subtitle }) {
  return (
    <MetricCard>
      {icon && <Box sx={{ mr: 2, color: 'primary.main' }}>{React.cloneElement(icon, { sx: { fontSize: 40 }})}</Box>}
      <CardContent sx={{ p: '0 !important', flex: 1 }}>
        <Typography color="text.secondary" variant="body2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </MetricCard>
  );
}

function LeaderboardClientes() {
  const [periodoFiltro, setPeriodoFiltro] = useState('mes');
  const [nivelFiltro, setNivelFiltro] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleChangePeriodo = (event) => {
    setPeriodoFiltro(event.target.value);
  };

  const handleChangeNivel = (event) => {
    setNivelFiltro(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredClientes = leaderboardData.topClientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm) || 
                         cliente.email.toLowerCase().includes(searchTerm);
    const matchesNivel = nivelFiltro === 'todos' || cliente.nivel === nivelFiltro;
    return matchesSearch && matchesNivel;
  });

  const getTendenciaIcon = (tendencia) => {
    switch(tendencia) {
      case 'up':
        return <ArrowUpwardIcon fontSize="small" color="success" />;
      case 'down':
        return <ArrowDownwardIcon fontSize="small" color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Leaderboard de Clientes
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel>Período</InputLabel>
            <Select
              value={periodoFiltro}
              label="Período"
              onChange={handleChangePeriodo}
            >
              {leaderboardData.periodos.map(periodo => (
                <MenuItem key={periodo.id} value={periodo.id}>{periodo.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            size="small"
          >
            Atualizar
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            size="small"
          >
            Exportar
          </Button>
        </Box>
      </Box>
      
      <Tabs 
        value={tabValue} 
        onChange={handleChangeTab} 
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Ranking Geral" icon={<TrophyIcon />} iconPosition="start" />
        <Tab label="Conquistas" icon={<StarIcon />} iconPosition="start" />
        <Tab label="Recompensas" icon={<RedeemIcon />} iconPosition="start" />
      </Tabs>
      
      {/* Painel: Ranking Geral */}
      {tabValue === 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent 
                title="Total de Participantes" 
                value={leaderboardData.totalParticipantes} 
                icon={<PeopleIcon />} 
                subtitle="Clientes no programa"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent 
                title="Participantes Ativos" 
                value={leaderboardData.participantesAtivos} 
                icon={<TrendingUpIcon />} 
                subtitle="Nos últimos 30 dias"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent 
                title="Média de Pontos" 
                value={leaderboardData.mediaPontos} 
                icon={<StarIcon />} 
                subtitle="Por participante"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCardComponent 
                title="Pontuação Máxima" 
                value={leaderboardData.pontuacaoMaxima} 
                icon={<TrophyIcon />} 
                subtitle="Maior pontuação"
              />
            </Grid>
          </Grid>
          
          <Paper sx={{ p: 3, mb: 4, borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Ranking de Clientes</Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <StyledTextField
                  placeholder="Buscar cliente..."
                  size="small"
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
                
                <FormControl size="small" sx={{ width: 150 }}>
                  <InputLabel>Nível</InputLabel>
                  <Select
                    value={nivelFiltro}
                    label="Nível"
                    onChange={handleChangeNivel}
                  >
                    {leaderboardData.niveis.map(nivel => (
                      <MenuItem key={nivel.id} value={nivel.id}>{nivel.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Posição</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Nível</TableCell>
                    <TableCell align="right">Pontos</TableCell>
                    <TableCell align="right">Conquistas</TableCell>
                    <TableCell align="center">Tendência</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClientes.map((cliente, index) => (
                    <StyledTableRow key={cliente.id} rank={index + 1}>
                      <TableCell>
                        <RankAvatar rank={index + 1}>{index + 1}</RankAvatar>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {cliente.nome.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1">{cliente.nome}</Typography>
                            <Typography variant="body2" color="text.secondary">{cliente.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <NivelChip 
                          nivel={cliente.nivel} 
                          label={cliente.nivel.charAt(0).toUpperCase() + cliente.nivel.slice(1)} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="medium">{cliente.pontos.toLocaleString()}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">{cliente.conquistas}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getTendenciaIcon(cliente.tendencia)}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Paper>
        </>
      )}
      
      {/* Painel: Conquistas */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h6" gutterBottom>Conquistas</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Em desenvolvimento. Esta seção mostrará as conquistas dos clientes.
          </Typography>
        </Paper>
      )}
      
      {/* Painel: Recompensas */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h6" gutterBottom>Recompensas</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Em desenvolvimento. Esta seção mostrará as recompensas resgatadas pelos clientes.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default LeaderboardClientes; 