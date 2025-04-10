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
  InputAdornment
} from '@mui/material';

function ConfigurarProgramasIndicacao() {
  const [config, setConfig] = useState({
    referrerRewardType: 'desconto_percentual', // Tipo de recompensa para quem indica
    referrerRewardValue: '10', // Valor (ex: 10 para 10%)
    referredRewardType: 'credito', // Tipo de recompensa para o indicado
    referredRewardValue: '20', // Valor (ex: 20 para R$20)
    minPurchaseAmount: '50', // Valor mínimo de compra para o indicado validar a indicação
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
    if (!config.referrerRewardValue || isNaN(config.referrerRewardValue) || Number(config.referrerRewardValue) <= 0) {
        tempErrors.referrerRewardValue = "Valor da recompensa inválido.";
    }
    if (!config.referredRewardValue || isNaN(config.referredRewardValue) || Number(config.referredRewardValue) <= 0) {
        tempErrors.referredRewardValue = "Valor da recompensa inválido.";
    }
     if (config.minPurchaseAmount && (isNaN(config.minPurchaseAmount) || Number(config.minPurchaseAmount) < 0)) {
        tempErrors.minPurchaseAmount = "Valor mínimo inválido.";
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
    console.log('Salvando Configuração do Programa de Indicação:', {
      ...config,
      referrerRewardValue: Number(config.referrerRewardValue),
      referredRewardValue: Number(config.referredRewardValue),
      minPurchaseAmount: config.minPurchaseAmount ? Number(config.minPurchaseAmount) : null,
    });

    alert('Configuração (simulada) salva com sucesso! Verifique o console.');
  };

  const renderValueField = (valueName, label, error, type) => {
    const adornment = type === 'credito' ? 'R$' : '%';
    return (
       <TextField
          fullWidth
          id={valueName}
          label={`Valor (${adornment})`}
          name={valueName}
          type="number"
          value={config[valueName]}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          InputProps={{ inputProps: { min: 0.1, step: type === 'credito' ? 0.01 : 1 } }}
        />
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configurar Programa de Indicação
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>

          <Typography variant="h6" gutterBottom>Recompensa para Quem Indica (Referrer)</Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.referrerRewardType}>
                <InputLabel id="referrer-reward-type-label">Tipo de Recompensa</InputLabel>
                <Select
                  labelId="referrer-reward-type-label"
                  id="referrerRewardType"
                  name="referrerRewardType"
                  value={config.referrerRewardType}
                  label="Tipo de Recompensa"
                  onChange={handleChange}
                >
                  <MenuItem value={'desconto_percentual'}>Desconto (%)</MenuItem>
                  <MenuItem value={'credito'}>Crédito (R$)</MenuItem>
                  <MenuItem value={'cupom_unico'}>Cupom Único</MenuItem> { /* Exemplo */}
                </Select>
                 {errors.referrerRewardType && <FormHelperText>{errors.referrerRewardType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                 {renderValueField('referrerRewardValue', 'Valor da Recompensa', errors.referrerRewardValue, config.referrerRewardType)}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Recompensa para Indicado (Referred)</Typography>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.referredRewardType}>
                <InputLabel id="referred-reward-type-label">Tipo de Recompensa</InputLabel>
                <Select
                  labelId="referred-reward-type-label"
                  id="referredRewardType"
                  name="referredRewardType"
                  value={config.referredRewardType}
                  label="Tipo de Recompensa"
                  onChange={handleChange}
                >
                  <MenuItem value={'desconto_percentual'}>Desconto (%)</MenuItem>
                  <MenuItem value={'credito'}>Crédito (R$)</MenuItem>
                  <MenuItem value={'frete_gratis'}>Frete Grátis</MenuItem> { /* Exemplo */}
                </Select>
                 {errors.referredRewardType && <FormHelperText>{errors.referredRewardType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                {renderValueField('referredRewardValue', 'Valor da Recompensa', errors.referredRewardValue, config.referredRewardType)}
            </Grid>
          </Grid>

           <Divider sx={{ my: 3 }} />

           <Typography variant="h6" gutterBottom>Condições</Typography>
           <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  id="minPurchaseAmount"
                  label="Compra Mínima do Indicado (Opcional)"
                  name="minPurchaseAmount"
                  type="number"
                  value={config.minPurchaseAmount}
                  onChange={handleChange}
                  error={!!errors.minPurchaseAmount}
                  helperText={errors.minPurchaseAmount || "Deixe 0 ou vazio se não houver mínimo"}
                  InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: 0, step: 0.01 }
                  }}
                />
             </Grid>
              {/* Adicionar outras condições (ex: tempo para compra) */}
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

export default ConfigurarProgramasIndicacao; 