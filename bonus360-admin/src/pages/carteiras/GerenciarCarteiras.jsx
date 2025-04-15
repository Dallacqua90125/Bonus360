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
  IconButton,
  Tooltip,
  Link,
  Grid,
  Card,
  CardContent,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
}));

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

// Dados Hardcoded para Carteiras
const initialWallets = [
  {
    id: 'WALLET001',
    customerEmail: 'cliente1@email.com',
    balance: 150.75,
    lastUpdated: '2024-04-18T10:30:00Z',
  },
  {
    id: 'WALLET002',
    customerEmail: 'cliente_vip@email.com',
    balance: 580.00,
    lastUpdated: '2024-04-20T15:00:00Z',
  },
  {
    id: 'WALLET003',
    customerEmail: 'novo_cliente@email.com',
    balance: 25.00,
    lastUpdated: '2024-04-21T09:15:00Z',
  },
   {
    id: 'WALLET004',
    customerEmail: 'cliente2@email.com',
    balance: 0.00,
    lastUpdated: '2024-03-10T11:00:00Z',
  },
];

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

function GerenciarCarteiras() {
  const [wallets, setWallets] = useState(initialWallets);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredWallets = wallets.filter(wallet =>
    wallet.customerEmail.toLowerCase().includes(searchTerm)
  );

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const handleViewDetails = (id) => {
    console.log("Visualizar detalhes/histórico da carteira:", id);
    // Navegar para página de detalhes/histórico ou abrir modal (simulado)
  };

  // Calcular métricas
  const totalCarteiras = wallets.length;
  const carteirasAtivas = wallets.filter(w => w.balance > 0).length;
  const saldoTotal = wallets.reduce((sum, w) => sum + w.balance, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Gerenciar Carteiras Digitais
      </Typography>

      {/* Cards de Métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <MetricCardComponent 
            title="Total de Carteiras" 
            value={totalCarteiras} 
            icon={<PeopleIcon />} 
            subtitle="Clientes com carteira digital"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCardComponent 
            title="Carteiras Ativas" 
            value={carteirasAtivas} 
            icon={<AccountBalanceWalletIcon />} 
            subtitle="Carteiras com saldo positivo"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCardComponent 
            title="Saldo Total" 
            value={formatCurrency(saldoTotal)} 
            icon={<AttachMoneyIcon />} 
            subtitle="Valor total em todas as carteiras"
          />
        </Grid>
      </Grid>

      <Section>
        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por email do cliente..."
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
      </Section>

      <SectionTitle variant="h6">Lista de Carteiras</SectionTitle>

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de carteiras digitais">
          <TableHead>
            <TableRow>
              <TableCell>Cliente (Email)</TableCell>
              <TableCell align="right">Saldo Atual</TableCell>
              <TableCell>Última Atualização</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWallets.length > 0 ? (
              filteredWallets.map((wallet) => (
                <StyledTableRow
                  key={wallet.id}
                >
                  <TableCell component="th" scope="row">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <AccountBalanceWalletIcon sx={{ mr: 1, color: 'action.active' }} fontSize="small" />
                       <Link href={`mailto:${wallet.customerEmail}`} sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                         {wallet.customerEmail}
                       </Link>
                     </Box>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(wallet.balance)}</TableCell>
                  <TableCell>{formatDate(wallet.lastUpdated)}</TableCell>
                  <TableCell align="center">
                     <Tooltip title="Ver Histórico">
                      <IconButton 
                        onClick={() => handleViewDetails(wallet.id)} 
                        size="small"
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                     </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhuma carteira encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}

export default GerenciarCarteiras; 