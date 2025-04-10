import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid, // Para layout dos cards
  Card,
  CardContent
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RedeemIcon from '@mui/icons-material/Redeem';

// Dados Hardcoded para Métricas
const metricasData = {
  totalClientes: 1250,
  totalPontosDistribuidos: 85750,
  totalRecompensasResgatadas: 320,
};

function MetricCard({ title, value, icon }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      {icon && <Box sx={{ mr: 2, color: 'primary.main' }}>{React.cloneElement(icon, { sx: { fontSize: 40 }})}</Box>}
      <CardContent sx={{ p: '0 !important'}}>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function VisualizarMetricas() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Métricas do Programa de Fidelidade
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
           <MetricCard
            title="Total de Clientes Engajados"
            value={metricasData.totalClientes.toLocaleString('pt-BR')}
            icon={<PeopleIcon />}
           />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <MetricCard
            title="Total de Pontos Distribuídos"
            value={metricasData.totalPontosDistribuidos.toLocaleString('pt-BR')}
            icon={<LoyaltyIcon />}
           />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <MetricCard
            title="Total de Recompensas Resgatadas"
            value={metricasData.totalRecompensasResgatadas.toLocaleString('pt-BR')}
            icon={<RedeemIcon />}
           />
        </Grid>
         {/* Adicionar mais cards de métricas aqui */}
      </Grid>
      {/* Futuramente, adicionar gráficos ou tabelas mais detalhadas */}
    </Box>
  );
}

export default VisualizarMetricas; 