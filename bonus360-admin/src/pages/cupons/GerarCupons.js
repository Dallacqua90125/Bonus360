import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  Switch,
  InputBase,
  styled
} from '@mui/material';

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

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px 12px',
  marginBottom: theme.spacing(3),
  '& .MuiSelect-select': {
    padding: 0,
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

const StyledSwitch = styled(Switch)(({ theme }) => ({
  marginRight: theme.spacing(1),
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#1976d2',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#1976d2',
  },
}));

function GerarCupons() {
  const [formData, setFormData] = useState({
    campanha: '',
    quantidade: '',
    prefixo: '',
    tipoDesconto: '',
    valorDesconto: '',
    usoUnico: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      usoUnico: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados dos cupons:', formData);
    // Aqui você adicionaria a lógica para gerar os cupons
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 'normal', 
        color: '#333',
        mb: 3
      }}>
        Gerar Cupons
      </Typography>
      
      <StyledPaper>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ 
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <StyledSelect
                  displayEmpty
                  name="campanha"
                  value={formData.campanha}
                  onChange={handleChange}
                  input={<InputBase />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: '#757575' }}>Campanha</span>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="Black Friday 2024">Black Friday 2024</MenuItem>
                  <MenuItem value="Cashback Verão">Cashback Verão</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <StyledTextField
                placeholder="Quantidade de Cupons"
                name="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Quantidade de Cupons' }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <StyledTextField
                placeholder="Prefixo do Cupom"
                name="prefixo"
                value={formData.prefixo}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Prefixo do Cupom' }}
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <StyledSelect
                  displayEmpty
                  name="tipoDesconto"
                  value={formData.tipoDesconto}
                  onChange={handleChange}
                  input={<InputBase />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: '#757575' }}>Tipo de Desconto</span>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="Percentual">Percentual (%)</MenuItem>
                  <MenuItem value="Valor Fixo">Valor Fixo (R$)</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <StyledTextField
              placeholder="Valor do Desconto"
              name="valorDesconto"
              type="number"
              value={formData.valorDesconto}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Valor do Desconto' }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <StyledSwitch
              checked={formData.usoUnico}
              onChange={handleSwitchChange}
              name="usoUnico"
              inputProps={{ 'aria-label': 'Uso Único por Cliente' }}
            />
            <Typography>Uso Único por Cliente</Typography>
          </Box>
          
          <Box>
            <StyledButton type="submit">
              Gerar Cupons
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
}

export default GerarCupons; 