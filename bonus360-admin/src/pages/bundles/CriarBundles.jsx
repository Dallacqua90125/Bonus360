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

function CriarBundles() {
  const [formData, setFormData] = useState({
    name: '',
    products: '', // Campo simples para produtos separados por vírgula
    price: '',
    startDate: null,
    endDate: null,
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

  const handleDateChange = (name, newValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    if (errors[name]) {
       setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Nome do bundle é obrigatório.";
    if (!formData.products) tempErrors.products = "Pelo menos um produto é obrigatório.";
    if (!formData.price) {
        tempErrors.price = "Preço é obrigatório.";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
        tempErrors.price = "Preço deve ser um número positivo.";
    }
    if (!formData.startDate) tempErrors.startDate = "Data de início é obrigatória.";
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
        tempErrors.endDate = "Data de fim não pode ser anterior à data de início.";
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

    // Processar produtos (separados por vírgula)
    const productList = formData.products.split(',').map(p => p.trim()).filter(p => p);

    // Lógica de criação (simulada)
    console.log('Criando Bundle com os dados:', {
        ...formData,
        products: productList,
        price: Number(formData.price),
        startDate: formData.startDate ? formData.startDate.toISOString().split('T')[0] : null,
        endDate: formData.endDate ? formData.endDate.toISOString().split('T')[0] : null,
    });

    // Limpar formulário após sucesso (simulado)
    setFormData({ name: '', products: '', price: '', startDate: null, endDate: null });
    alert('Bundle (simulado) criado com sucesso! Verifique o console.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Criar Bundle
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Nome do Bundle */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label="Nome do Bundle"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            {/* Produtos */}
             <Grid item xs={12}>
              <TextField
                fullWidth
                id="products"
                label="Produtos Incluídos (separados por vírgula)"
                name="products"
                value={formData.products}
                onChange={handleChange}
                error={!!errors.products}
                helperText={errors.products || "Ex: Produto A, Produto B, Produto C"}
                multiline
                rows={3}
              />
            </Grid>

            {/* Preço */}
            <Grid item xs={12} sm={6}>
               <FormControl fullWidth error={!!errors.price}>
                  <InputLabel htmlFor="price">Preço do Bundle</InputLabel>
                  <OutlinedInput
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                      label="Preço do Bundle"
                      inputProps={{ step: "0.01", min: "0.01" }}
                  />
                   {errors.price && <Typography color="error" variant="caption" sx={{ ml: 2 }}>{errors.price}</Typography>}
               </FormControl>
            </Grid>

            {/* Data de Início */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data de Início"
                value={formData.startDate}
                onChange={(newValue) => handleDateChange('startDate', newValue)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        id: 'startDate',
                        name: 'startDate',
                        error: !!errors.startDate,
                        helperText: errors.startDate,
                    }
                }}
              />
            </Grid>

             {/* Data de Fim (Opcional) */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data de Fim (Opcional)"
                value={formData.endDate}
                onChange={(newValue) => handleDateChange('endDate', newValue)}
                minDate={formData.startDate || undefined} // Não permite data fim antes do início
                slotProps={{
                    textField: {
                        fullWidth: true,
                        id: 'endDate',
                        name: 'endDate',
                        error: !!errors.endDate,
                        helperText: errors.endDate,
                    }
                }}
              />
            </Grid>

            {/* Botão de Submissão */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Criar Bundle
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default CriarBundles; 