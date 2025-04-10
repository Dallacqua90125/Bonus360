import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Block, Search } from '@mui/icons-material';

const cuponsDemo = [
  {
    id: 1,
    codigo: 'BLACK-123456',
    campanha: 'Black Friday 2024',
    desconto: '20%',
    status: 'ativo',
    usos: 0,
    maxUsos: 1,
  },
  {
    id: 2,
    codigo: 'SUMMER-789012',
    campanha: 'Cashback Verão',
    desconto: 'R$ 50,00',
    status: 'usado',
    usos: 1,
    maxUsos: 1,
  },
];

function GerenciarCupons() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Cupons
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar cupons..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Campanha</TableCell>
              <TableCell>Desconto</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Usos</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuponsDemo.map((cupom) => (
              <TableRow key={cupom.id}>
                <TableCell>{cupom.codigo}</TableCell>
                <TableCell>{cupom.campanha}</TableCell>
                <TableCell>{cupom.desconto}</TableCell>
                <TableCell>
                  <Chip
                    label={cupom.status}
                    color={cupom.status === 'ativo' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>{`${cupom.usos}/${cupom.maxUsos}`}</TableCell>
                <TableCell>
                  <IconButton 
                    color="error"
                    disabled={cupom.status !== 'ativo'}
                  >
                    <Block />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GerenciarCupons; 