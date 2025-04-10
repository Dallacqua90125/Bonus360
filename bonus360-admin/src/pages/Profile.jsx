import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Importar para pegar dados do usuário

function Profile() {
  const { user } = useAuth(); // Obter dados do usuário do contexto

  // Simular dados adicionais ou formulário de edição
  const [formData, setFormData] = React.useState({
    name: user?.name || 'Usuário Demo',
    email: user?.email || 'email@exemplo.com',
    // Adicionar outros campos se necessário (ex: telefone, senha antiga/nova)
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Salvando dados do perfil (simulado):", formData);
    alert("Dados do perfil atualizados (simulação).");
    // Lógica para chamar API de atualização
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>
                {formData.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={10}>
              <Typography variant="h5">{formData.name}</Typography>
              <Typography color="text.secondary">{formData.email}</Typography>
          </Grid>
        </Grid>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{mb: 2}}>Editar Informações</Typography>
            <Grid container spacing={2}>
                 <Grid item xs={12} sm={6}>
                     <TextField
                        fullWidth
                        id="name"
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                     />
                </Grid>
                 <Grid item xs={12} sm={6}>
                     <TextField
                        fullWidth
                        disabled // Geralmente não se edita email diretamente
                        id="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        // onChange={handleChange}
                     />
                </Grid>
                 {/* Adicionar campos de senha aqui se necessário */}
                 <Grid item xs={12}>
                    <Button type="submit" variant="contained" sx={{ mt: 1 }}>
                        Salvar Alterações
                    </Button>
                 </Grid>
            </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile; 