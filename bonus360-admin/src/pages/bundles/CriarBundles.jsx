import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  InputBase,
  Button,
  styled
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Estilizando componentes para ficarem com a aparência da imagem
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px'
}));

const StyledTextField = styled(InputBase)(({ theme }) => ({
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px 12px',
  marginBottom: theme.spacing(3),
  '&.Mui-focused': {
    border: '1px solid #1976d2',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginTop: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#1565c0',
  }
}));

// Componente estilizado para o DatePicker
const StyledDatePickerWrapper = styled(Box)(({ theme }) => ({
  '& .MuiInputBase-root': {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px 12px',
    width: '100%',
  },
  '& .MuiInputBase-input': {
    padding: 0,
  },
  marginBottom: theme.spacing(3),
}));

function CriarBundles() {
  const [formData, setFormData] = useState({
    name: '',
    products: '',
    price: '',
    discount: '',
    startDate: null,
    endDate: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, newValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Processar produtos (separados por vírgula)
    const productList = formData.products.split(',').map(p => p.trim()).filter(p => p);

    // Lógica de criação (simulada)
    console.log('Criando Bundle com os dados:', {
        ...formData,
        products: productList,
        price: Number(formData.price),
        discount: Number(formData.discount),
        startDate: formData.startDate ? formData.startDate.toISOString().split('T')[0] : null,
        endDate: formData.endDate ? formData.endDate.toISOString().split('T')[0] : null,
    });

    // Limpar formulário após sucesso (simulado)
    setFormData({ name: '', products: '', price: '', discount: '', startDate: null, endDate: null });
    alert('Bundle criado com sucesso!');
  };

  // Calcular valor final com desconto
  const calculateFinalPrice = () => {
    if (formData.price && formData.discount) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discount);
      if (!isNaN(price) && !isNaN(discount)) {
        return (price - (price * discount / 100)).toFixed(2);
      }
    }
    return "";
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 'normal', 
        color: '#333',
        mb: 3
      }}>
        Criar Bundle
      </Typography>
      
      <StyledPaper>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ width: '100%', mb: 1 }}>
              <StyledTextField
                placeholder="Nome do Bundle"
                name="name"
                value={formData.name}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Nome do Bundle' }}
              />
            </Box>
            
            <Box sx={{ width: '100%', mb: 1 }}>
              <StyledTextField
                placeholder="Produtos Incluídos (separados por vírgula)"
                name="products"
                value={formData.products}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{ 'aria-label': 'Produtos Incluídos' }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                Ex: Produto A, Produto B, Produto C
              </Typography>
            </Box>
            
            <Box sx={{ width: 'calc(50% - 8px)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                  Preço do Bundle
                </Typography>
                <StyledTextField
                  placeholder="R$"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  inputProps={{ 
                    'aria-label': 'Preço do Bundle',
                    step: "0.01",
                    min: "0.01"
                  }}
                />
              </Box>
            </Box>
            
            <Box sx={{ width: 'calc(50% - 8px)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                  Desconto (%)
                </Typography>
                <StyledTextField
                  placeholder="%"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  inputProps={{ 
                    'aria-label': 'Desconto',
                    step: "0.1",
                    min: "0",
                    max: "100"
                  }}
                />
              </Box>
            </Box>
            
            {formData.price && formData.discount && (
              <Box sx={{ width: '100%', mb: 2 }}>
                <Typography variant="body2" color="primary">
                  Valor final com desconto: R$ {calculateFinalPrice()}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ width: 'calc(50% - 8px)' }}>
              <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, display: 'block' }}>
                Data de Início
              </Typography>
              <StyledDatePickerWrapper>
                <DatePicker
                  value={formData.startDate}
                  onChange={(newValue) => handleDateChange('startDate', newValue)}
                  slotProps={{
                    textField: {
                      placeholder: 'Data de Início',
                      variant: 'standard',
                      InputProps: {
                        disableUnderline: true
                      }
                    }
                  }}
                />
              </StyledDatePickerWrapper>
            </Box>
            
            <Box sx={{ width: 'calc(50% - 8px)' }}>
              <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, display: 'block' }}>
                Data de Fim (Opcional)
              </Typography>
              <StyledDatePickerWrapper>
                <DatePicker
                  value={formData.endDate}
                  onChange={(newValue) => handleDateChange('endDate', newValue)}
                  minDate={formData.startDate || undefined}
                  slotProps={{
                    textField: {
                      placeholder: 'Data de Fim (Opcional)',
                      variant: 'standard',
                      InputProps: {
                        disableUnderline: true
                      }
                    }
                  }}
                />
              </StyledDatePickerWrapper>
            </Box>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <StyledButton type="submit">
              Criar Bundle
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
}

export default CriarBundles; 