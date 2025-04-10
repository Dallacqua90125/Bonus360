import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
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

function CriarCampanha() {
  const [campanha, setCampanha] = useState({
    nome: '',
    descricao: '',
    tipo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampanha(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da campanha:', campanha);
    // Aqui você adicionaria a lógica para salvar a campanha
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 'normal', 
        color: '#333',
        mb: 3
      }}>
        Criar Campanha
      </Typography>
      
      <StyledPaper>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <StyledTextField
            placeholder="Nome da Campanha"
            name="nome"
            value={campanha.nome}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Nome da Campanha' }}
          />
          
          <StyledTextField
            placeholder="Descrição"
            name="descricao"
            value={campanha.descricao}
            onChange={handleChange}
            multiline
            rows={4}
            inputProps={{ 'aria-label': 'Descrição' }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <StyledSelect
              displayEmpty
              name="tipo"
              value={campanha.tipo}
              onChange={handleChange}
              input={<InputBase />}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: '#757575' }}>Tipo de Campanha</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="desconto">Desconto</MenuItem>
              <MenuItem value="cashback">Cashback</MenuItem>
              <MenuItem value="bonus">Bônus</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <StyledButton type="submit">
            Criar Campanha
          </StyledButton>
        </Box>
      </StyledPaper>
    </Box>
  );
}

export default CriarCampanha; 