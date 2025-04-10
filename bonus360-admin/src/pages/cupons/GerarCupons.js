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
  Switch,
  FormControlLabel,
} from '@mui/material';

function GerarCupons() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerar Cupons
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Campanha</InputLabel>
              <Select label="Campanha">
                <MenuItem value="1">Black Friday 2024</MenuItem>
                <MenuItem value="2">Cashback Verão</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantidade de Cupons"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Prefixo do Cupom"
              variant="outlined"
              placeholder="Ex: BLACKFRIDAY-"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Desconto</InputLabel>
              <Select label="Tipo de Desconto">
                <MenuItem value="percentual">Percentual (%)</MenuItem>
                <MenuItem value="fixo">Valor Fixo (R$)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Valor do Desconto"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch />}
              label="Uso Único por Cliente"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" size="large">
              Gerar Cupons
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default GerarCupons; 