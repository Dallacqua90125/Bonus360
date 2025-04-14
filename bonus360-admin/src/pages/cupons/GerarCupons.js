import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  styled,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  LocalOffer, 
  ShoppingCart, 
  AccessTime,
  Label as LabelIcon,
  CodeRounded,
  CheckCircle,
} from '@mui/icons-material';

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  scrollMarginTop: '80px',
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: '#f9f9f9',
}));

const StepCard = styled(Paper)(({ theme, active }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  borderRadius: '8px',
  backgroundColor: active ? '#e3f2fd' : 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: active ? '1px solid #1976d2' : '1px solid #e0e0e0',
  '&:hover': {
    backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
  }
}));

const StepSidebar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '80px',
  right: '32px',
  width: '280px',
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'auto'
}));

function GerarCupons() {
  const [formData, setFormData] = useState({
    // Detalhes do Cupom
    codigoCupom: '',
    descricao: '',
    campanhaAssociada: '',
    tipoCupom: '',
    ativo: true,
    
    // Benefício
    tipoDesconto: '',
    valorDesconto: '',
    freteIncluso: false,
    qtdMinimaItens: '',
    valorMinimoPedido: '',
    
    // Validade
    dataInicio: '',
    dataFim: '',
    horaInicio: '',
    horaFim: '',
    limiteTotal: '',
    limitePorCliente: '',
    reutilizavel: false,
  });

  const [activeSection, setActiveSection] = useState(0);
  
  const detalhesRef = useRef(null);
  const beneficioRef = useRef(null);
  const validadeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados dos cupons:', formData);
    // Aqui você adicionaria a lógica para gerar os cupons
  };

  const scrollToSection = (ref, index) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  const steps = [
    { title: "Detalhes do Cupom", ref: detalhesRef, icon: <LabelIcon /> },
    { title: "Benefício", ref: beneficioRef, icon: <ShoppingCart /> },
    { title: "Validade", ref: validadeRef, icon: <AccessTime /> }
  ];

  const generateCode = () => {
    const prefix = formData.tipoCupom === 'grupo' ? 'GRP-' : 'CPN-';
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({
      ...prev,
      codigoCupom: `${prefix}${randomCode}`
    }));
  };

  return (
    <Box sx={{ width: '100%', px: 3, maxWidth: 'calc(100% - 320px)' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Gerar Cupons
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Seção: Detalhes do Cupom */}
        <Section ref={detalhesRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LabelIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Detalhes do Cupom</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StyledInput 
              label="Código do Cupom" 
              fullWidth 
              name="codigoCupom" 
              value={formData.codigoCupom} 
              onChange={handleChange}
              sx={{ mr: 1, flex: 1 }}
              placeholder="Gerado automaticamente ou inserido manualmente"
            />
            <Button 
              variant="outlined" 
              onClick={generateCode}
              sx={{ height: 56, minWidth: 120 }}
            >
              Gerar
            </Button>
          </Box>
          
          <StyledInput 
            label="Descrição" 
            fullWidth 
            multiline 
            rows={3} 
            name="descricao" 
            value={formData.descricao} 
            onChange={handleChange} 
            placeholder="Descreva o propósito deste cupom"
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Campanha Associada</InputLabel>
            <StyledSelect
              name="campanhaAssociada"
              value={formData.campanhaAssociada}
              onChange={handleChange}
              label="Campanha Associada"
            >
              <MenuItem value="Black Friday 2024">Black Friday 2024</MenuItem>
              <MenuItem value="Cashback Verão">Cashback Verão</MenuItem>
              <MenuItem value="Primeira Compra">Primeira Compra</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Cupom</InputLabel>
            <StyledSelect
              name="tipoCupom"
              value={formData.tipoCupom}
              onChange={handleChange}
              label="Tipo de Cupom"
            >
              <MenuItem value="unico">Único</MenuItem>
              <MenuItem value="multiplo">Múltiplo uso</MenuItem>
              <MenuItem value="limitado">Limitado por cliente</MenuItem>
              <MenuItem value="grupo">Cupom por grupo (geração em massa)</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch 
                checked={formData.ativo} 
                onChange={handleChange}
                name="ativo" 
                color="primary"
              />
            }
            label="Ativo"
          />
        </Section>

        {/* Seção: Benefício */}
        <Section ref={beneficioRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Benefício</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Desconto</InputLabel>
            <StyledSelect
              name="tipoDesconto"
              value={formData.tipoDesconto}
              onChange={handleChange}
              label="Tipo de Desconto"
            >
              <MenuItem value="percentual">Percentual (%)</MenuItem>
              <MenuItem value="valor">Valor fixo (R$)</MenuItem>
              <MenuItem value="frete">Frete grátis</MenuItem>
              <MenuItem value="produto">Produto grátis</MenuItem>
            </StyledSelect>
          </FormControl>
          
          {formData.tipoDesconto && formData.tipoDesconto !== 'frete' && (
            <StyledInput 
              label="Valor do Desconto" 
              fullWidth 
              name="valorDesconto"
              value={formData.valorDesconto}
              onChange={handleChange}
              type="number"
              InputProps={{
                startAdornment: formData.tipoDesconto === 'percentual' ? '%' : 'R$',
              }}
            />
          )}
          
          <FormControlLabel
            control={
              <Switch 
                checked={formData.freteIncluso} 
                onChange={handleChange} 
                name="freteIncluso" 
                color="primary"
              />
            }
            label="Frete incluso no benefício"
            sx={{ mb: 2 }}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Quantidade mínima de itens" 
                fullWidth 
                name="qtdMinimaItens" 
                value={formData.qtdMinimaItens} 
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Valor mínimo do pedido" 
                fullWidth 
                name="valorMinimoPedido" 
                value={formData.valorMinimoPedido} 
                onChange={handleChange}
                type="number"
                InputProps={{
                  startAdornment: 'R$',
                }}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Seção: Validade */}
        <Section ref={validadeRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Validade</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Data de Início" 
                fullWidth 
                name="dataInicio" 
                value={formData.dataInicio} 
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Data de Término" 
                fullWidth 
                name="dataFim" 
                value={formData.dataFim} 
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Hora de Início" 
                fullWidth 
                name="horaInicio" 
                value={formData.horaInicio} 
                onChange={handleChange}
                type="time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Hora de Término" 
                fullWidth 
                name="horaFim" 
                value={formData.horaFim} 
                onChange={handleChange}
                type="time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Limite total de uso" 
                fullWidth 
                name="limiteTotal" 
                value={formData.limiteTotal} 
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledInput 
                label="Limite por cliente" 
                fullWidth 
                name="limitePorCliente" 
                value={formData.limitePorCliente} 
                onChange={handleChange}
                type="number"
              />
            </Grid>
          </Grid>
          
          <FormControlLabel
            control={
              <Switch 
                checked={formData.reutilizavel} 
                onChange={handleChange} 
                name="reutilizavel" 
                color="primary"
              />
            }
            label="Reutilizável"
          />
        </Section>

        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth 
          sx={{ padding: '12px', borderRadius: '12px', fontWeight: 'bold', mb: 4 }}
        >
          GERAR CUPOM
        </Button>
      </form>

      {/* Steps no canto direito */}
      <StepSidebar>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 2, mt: 2 }}>
          Etapas do Formulário
        </Typography>
        
        {steps.map((step, index) => (
          <StepCard 
            key={index} 
            active={activeSection === index}
            onClick={() => scrollToSection(step.ref, index)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: 28, height: 28, bgcolor: activeSection === index ? 'primary.main' : '#f0f0f0', mr: 1 }}>
                {step.icon}
              </Box>
              <Typography variant="body1" fontWeight={activeSection === index ? "bold" : "normal"}>
                {index + 1}. {step.title}
              </Typography>
            </Box>
          </StepCard>
        ))}

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f8f8', borderRadius: '8px', border: '1px dashed #ddd' }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CodeRounded sx={{ fontSize: 16, mr: 1, mt: 0.5 }} color="action" />
            Cupons com limite de uso por cliente incentivam compras repetidas. Os do tipo "grupo" são ideais para campanhas com vários usuários.
          </Typography>
        </Box>
      </StepSidebar>
    </Box>
  );
}

export default GerarCupons; 