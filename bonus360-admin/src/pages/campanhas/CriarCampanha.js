import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function CriarCampanha() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Criar Campanha
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da Campanha"
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Campanha</InputLabel>
              <Select label="Tipo de Campanha">
                <MenuItem value="desconto">Desconto</MenuItem>
                <MenuItem value="cashback">Cashback</MenuItem>
                <MenuItem value="bonus">Bônus</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button variant="contained" color="primary" size="large">
              Criar Campanha
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CriarCampanha; 