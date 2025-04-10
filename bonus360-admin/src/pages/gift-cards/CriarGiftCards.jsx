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
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CriarGiftCards() {
  const [formData, setFormData] = useState({
    code: '',
    initialValue: '',
    expiryDate: null,
    customerEmail: '',
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

  const handleDateChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      expiryDate: newValue
    }));
    if (errors.expiryDate) {
       setErrors(prev => ({ ...prev, expiryDate: null }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.code) tempErrors.code = "Código é obrigatório.";
    if (!formData.initialValue) {
        tempErrors.initialValue = "Valor inicial é obrigatório.";
    } else if (isNaN(formData.initialValue) || Number(formData.initialValue) <= 0) {
        tempErrors.initialValue = "Valor inicial deve ser um número positivo.";
    }
    if (!formData.expiryDate) tempErrors.expiryDate = "Data de expiração é obrigatória.";
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        tempErrors.customerEmail = "Email inválido.";
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
    console.log('Criando Gift Card com os dados:', {
        ...formData,
        initialValue: Number(formData.initialValue),
        expiryDate: formData.expiryDate ? formData.expiryDate.toISOString().split('T')[0] : null
    });
    setFormData({ code: '', initialValue: '', expiryDate: null, customerEmail: '' });
    alert('Gift Card (simulado) criado com sucesso! Verifique o console.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerar Gift Cards
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="code"
                label="Código do Gift Card"
                name="code"
                value={formData.code}
                onChange={handleChange}
                error={!!errors.code}
                helperText={errors.code}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
               <FormControl fullWidth error={!!errors.initialValue}>
                  <InputLabel htmlFor="initialValue">Valor Inicial</InputLabel>
                  <OutlinedInput
                      id="initialValue"
                      name="initialValue"
                      type="number"
                      value={formData.initialValue}
                      onChange={handleChange}
                      startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                      label="Valor Inicial"
                      inputProps={{ step: "0.01", min: "0.01" }}
                  />
                   {errors.initialValue && <Typography color="error" variant="caption" sx={{ ml: 2 }}>{errors.initialValue}</Typography>}
               </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data de Expiração"
                value={formData.expiryDate}
                onChange={handleDateChange}
                minDate={new Date()}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        id: 'expiryDate',
                        name: 'expiryDate',
                        error: !!errors.expiryDate,
                        helperText: errors.expiryDate,
                    }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
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

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Criar Gift Card
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default CriarGiftCards; 