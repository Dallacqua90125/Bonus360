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
  OutlinedInput,
  InputAdornment,
  Divider // Para separar seções
} from '@mui/material';

function ConfigurarPrograma() {
  const [config, setConfig] = useState({
    pointsPerReal: '1', // Ex: 1 ponto a cada R$ 1 gasto
    rewardName: 'Desconto 10%',
    pointsNeeded: '100', // Ex: 100 pontos para o Desconto 10%
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
    if (!config.pointsPerReal || isNaN(config.pointsPerReal) || Number(config.pointsPerReal) <= 0) {
        tempErrors.pointsPerReal = "Deve ser um número positivo.";
    }
    if (!config.rewardName) tempErrors.rewardName = "Nome da recompensa é obrigatório.";
    if (!config.pointsNeeded || isNaN(config.pointsNeeded) || Number(config.pointsNeeded) <= 0) {
        tempErrors.pointsNeeded = "Deve ser um número inteiro positivo.";
    }
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
    console.log('Salvando Configuração do Programa de Fidelidade:', {
      ...config,
      pointsPerReal: Number(config.pointsPerReal),
      pointsNeeded: parseInt(config.pointsNeeded, 10),
    });

    alert('Configuração (simulada) salva com sucesso! Verifique o console.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configurar Programa de Fidelidade
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" gutterBottom>Regra de Pontuação</Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="pointsPerReal"
                label="Pontos Ganhos por Real Gasto"
                name="pointsPerReal"
                type="number"
                value={config.pointsPerReal}
                onChange={handleChange}
                error={!!errors.pointsPerReal}
                helperText={errors.pointsPerReal || "Ex: 1 ponto por R$1,00"}
                InputProps={{ inputProps: { min: 0.1, step: 0.1 } }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Nível de Recompensa (Exemplo)</Typography>
           <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <TextField
                fullWidth
                id="rewardName"
                label="Nome da Recompensa"
                name="rewardName"
                value={config.rewardName}
                onChange={handleChange}
                error={!!errors.rewardName}
                helperText={errors.rewardName}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                fullWidth
                id="pointsNeeded"
                label="Pontos Necessários"
                name="pointsNeeded"
                type="number"
                value={config.pointsNeeded}
                onChange={handleChange}
                error={!!errors.pointsNeeded}
                helperText={errors.pointsNeeded || "Ex: 100 pontos"}
                 InputProps={{ inputProps: { min: 1, step: 1 } }}
              />
            </Grid>
             {/* Adicionar mais campos ou lógica para múltiplos níveis aqui */}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
          >
            Salvar Configuração
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ConfigurarPrograma; 