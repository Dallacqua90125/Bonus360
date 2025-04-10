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
  InputAdornment
} from '@mui/material';

function ResgatesRecargas() {
  const [formData, setFormData] = useState({
    customerEmail: '',
    operationType: 'recarga', // 'recarga' ou 'resgate'
    amount: '',
    reason: '' // Motivo (opcional)
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.customerEmail || !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        tempErrors.customerEmail = "Email do cliente inválido.";
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
        tempErrors.amount = "Valor inválido.";
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

    // Lógica de operação (simulada)
    console.log('Processando Operação na Carteira:', {
      ...formData,
      amount: Number(formData.amount),
    });

    alert(`Operação de ${formData.operationType} (simulada) registrada com sucesso! Verifique o console.`);
    // Limpar formulário
    setFormData({ customerEmail: '', operationType: 'recarga', amount: '', reason: '' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Resgates e Recargas Manuais
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  required
                  id="customerEmail"
                  label="Email do Cliente"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  error={!!errors.customerEmail}
                  helperText={errors.customerEmail}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
               <FormControl fullWidth required error={!!errors.operationType}>
                <InputLabel id="operation-type-label">Tipo de Operação</InputLabel>
                <Select
                  labelId="operation-type-label"
                  id="operationType"
                  name="operationType"
                  value={formData.operationType}
                  label="Tipo de Operação"
                  onChange={handleChange}
                >
                  <MenuItem value={'recarga'}>Recarga (+)</MenuItem>
                  <MenuItem value={'resgate'}>Resgate (-)</MenuItem>
                </Select>
                 {errors.operationType && <FormHelperText>{errors.operationType}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                 <TextField
                  fullWidth
                  required
                  id="amount"
                  label="Valor"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: 0.01, step: 0.01 }
                  }}
                />
            </Grid>

             <Grid item xs={12} sm={6}>
                 <TextField
                  fullWidth
                  id="reason"
                  label="Motivo/Observação (Opcional)"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
            </Grid>

          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Registrar Operação
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ResgatesRecargas; 