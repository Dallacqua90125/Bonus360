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
  IconButton,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const campanhasDemo = [
  {
    id: 1,
    nome: 'Black Friday 2024',
    tipo: 'desconto',
    status: 'ativo',
    dataInicio: '2024-11-20',
    dataFim: '2024-11-30',
  },
  {
    id: 2,
    nome: 'Cashback Verão',
    tipo: 'cashback',
    status: 'pendente',
    dataInicio: '2024-12-01',
    dataFim: '2024-12-31',
  },
];

function ListarCampanhas() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Listar Campanhas
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data Início</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campanhasDemo.map((campanha) => (
              <TableRow key={campanha.id}>
                <TableCell>{campanha.nome}</TableCell>
                <TableCell>{campanha.tipo}</TableCell>
                <TableCell>
                  <Chip
                    label={campanha.status}
                    color={campanha.status === 'ativo' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>{campanha.dataInicio}</TableCell>
                <TableCell>{campanha.dataFim}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
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

export default ListarCampanhas; 