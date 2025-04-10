import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Chip // Para badges
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Exemplo de ícone para badge

function ConfigurarMecanicas() {
  const [config, setConfig] = useState({
    actionName: 'Compra acima de R$100', // Nome da ação que gera pontos/badge
    pointsAwarded: '50', // Pontos ganhos
    badgeName: 'Comprador Frequente', // Nome de um badge de exemplo
    badgeCriteria: 'Realizar 5 compras acima de R$50', // Critério para o badge
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!config.actionName) tempErrors.actionName = "Nome da ação é obrigatório.";
    if (!config.pointsAwarded || isNaN(config.pointsAwarded) || Number(config.pointsAwarded) < 0) {
        tempErrors.pointsAwarded = "Pontos devem ser um número não negativo.";
    }
    if (!config.badgeName) tempErrors.badgeName = "Nome do badge é obrigatório.";
    if (!config.badgeCriteria) tempErrors.badgeCriteria = "Critério do badge é obrigatório.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
        console.log("Erro de validação no formulário", errors);
        return;
    }

    // Lógica de salvar configuração (simulada)
    console.log('Salvando Configuração de Gamificação:', {
      ...config,
      pointsAwarded: parseInt(config.pointsAwarded, 10),
    });

    alert('Configuração de Gamificação (simulada) salva com sucesso! Verifique o console.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configurar Mecânicas de Gamificação
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>

          <Typography variant="h6" gutterBottom>Ações e Pontos</Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
               <TextField
                fullWidth
                id="actionName"
                label="Nome da Ação"
                name="actionName"
                value={config.actionName}
                onChange={handleChange}
                error={!!errors.actionName}
                helperText={errors.actionName || "Ex: Cadastro Completo, Primeira Compra"}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                fullWidth
                id="pointsAwarded"
                label="Pontos Concedidos"
                name="pointsAwarded"
                type="number"
                value={config.pointsAwarded}
                onChange={handleChange}
                error={!!errors.pointsAwarded}
                helperText={errors.pointsAwarded || "Número de pontos ganhos por esta ação"}
                InputProps={{ inputProps: { min: 0, step: 1 } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Badges (Exemplo)</Typography>
           <Grid container spacing={3} sx={{ mb: 3 }}>
             <Grid item xs={12} sm={6}>
               <TextField
                fullWidth
                id="badgeName"
                label="Nome do Badge"
                name="badgeName"
                value={config.badgeName}
                onChange={handleChange}
                error={!!errors.badgeName}
                helperText={errors.badgeName}
                InputProps={{
                    startAdornment: <EmojiEventsIcon sx={{ mr:1, color: 'warning.main'}} />
                }}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="badgeCriteria"
                  label="Critério para Ganhar o Badge"
                  name="badgeCriteria"
                  value={config.badgeCriteria}
                  onChange={handleChange}
                  error={!!errors.badgeCriteria}
                  helperText={errors.badgeCriteria}
                  multiline
                  rows={2}
                />
             </Grid>
               <Grid item xs={12}>
                  <Typography variant="caption">Preview do Badge:</Typography>
                  <Chip
                    icon={<EmojiEventsIcon />}
                    label={config.badgeName || "Nome do Badge"}
                    color="warning"
                    variant="outlined"
                    sx={{ ml: 1 }}
                 />
               </Grid>
          </Grid>

          {/* Adicionar lógica para mais ações e badges */}

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
          >
            Salvar Mecânicas
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ConfigurarMecanicas; 