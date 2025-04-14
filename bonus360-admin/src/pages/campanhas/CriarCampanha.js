import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  styled,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { 
  Info as InfoIcon, 
  EventNote as EventIcon, 
  People as PeopleIcon, 
  Settings as SettingsIcon,
  Campaign as CampaignIcon,
  LocalOffer as LocalOfferIcon,
  Check as CheckIcon
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

const StatusIndicator = styled(Box)(({ theme, completed }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: completed ? theme.palette.primary.main : '#e0e0e0',
  color: completed ? 'white' : '#757575',
  marginRight: theme.spacing(2),
}));

const CriarCampanha = () => {
  const [campanha, setCampanha] = useState({
    nome: '',
    descricao: '',
    status: '',
    codigoCupom: '',
    tipoDesconto: '',
    valorDesconto: '',
    
    dataInicio: '',
    dataFim: '',
    horaInicio: '',
    horaFim: '',
    
    publicoAlvo: '',
    condicaoDesconto: '',
    usosPorCliente: '',
    usosTotais: '',
    frequenciaUso: '',
    incompativel: false,
    
    aplicaEm: '',
    exclusoes: '',
    freteIncluso: false,
    aplicaAutomatico: false,
  });

  const [activeSection, setActiveSection] = useState(0);
  const infoGeraisRef = useRef(null);
  const periodoRef = useRef(null);
  const segmentacaoRef = useRef(null);
  const aplicacaoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCampanha((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Campanha:', campanha);
  };

  const scrollToSection = (ref, index) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  const isSectionCompleted = (index) => {
    if (index === 0) {
      return !!campanha.nome && !!campanha.descricao && !!campanha.tipoDesconto;
    } else if (index === 1) {
      return !!campanha.dataInicio && !!campanha.dataFim;
    } else if (index === 2) {
      return !!campanha.publicoAlvo;
    } else if (index === 3) {
      return !!campanha.aplicaEm;
    }
    return false;
  };

  const steps = [
    { title: "Informações Gerais", ref: infoGeraisRef, icon: <InfoIcon /> },
    { title: "Período de Validade", ref: periodoRef, icon: <EventIcon /> },
    { title: "Segmentação e Regras", ref: segmentacaoRef, icon: <PeopleIcon /> },
    { title: "Aplicação", ref: aplicacaoRef, icon: <SettingsIcon /> }
  ];

  return (
    <Box sx={{ width: '100%', px: 3, maxWidth: 'calc(100% - 320px)' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Criar Campanha
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Seção: Informações Gerais */}
        <Section ref={infoGeraisRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Informações Gerais</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <StyledInput 
            label="Nome da Campanha" 
            fullWidth 
            name="nome" 
            value={campanha.nome} 
            onChange={handleChange} 
            placeholder="Digite o nome da campanha"
            required
          />
          
          <StyledInput 
            label="Descrição" 
            fullWidth 
            multiline 
            rows={3} 
            name="descricao" 
            value={campanha.descricao} 
            onChange={handleChange} 
            placeholder="Descreva o objetivo desta campanha"
            required
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <StyledSelect
              name="status"
              value={campanha.status}
              onChange={handleChange}
              label="Status"
              required
            >
              <MenuItem value="ativo">Ativa</MenuItem>
              <MenuItem value="inativa">Inativa</MenuItem>
              <MenuItem value="agendada">Agendada</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <StyledInput 
            label="Código do Cupom" 
            fullWidth 
            name="codigoCupom" 
            value={campanha.codigoCupom} 
            onChange={handleChange} 
            placeholder="Ex: BLACK30"
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Desconto</InputLabel>
            <StyledSelect
              name="tipoDesconto"
              value={campanha.tipoDesconto}
              onChange={handleChange}
              label="Tipo de Desconto"
              required
            >
              <MenuItem value="percentual">Percentual (%)</MenuItem>
              <MenuItem value="valor">Valor fixo (R$)</MenuItem>
              <MenuItem value="frete">Frete grátis</MenuItem>
              <MenuItem value="produtoGratis">Produto grátis</MenuItem>
              <MenuItem value="escalonado">Desconto escalonado</MenuItem>
              <MenuItem value="primeiroPedido">Primeiro pedido</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <StyledInput 
            label="Valor do Desconto" 
            fullWidth 
            name="valorDesconto" 
            value={campanha.valorDesconto} 
            onChange={handleChange} 
            placeholder={campanha.tipoDesconto === 'percentual' ? 'Ex: 30%' : 'Ex: 50,00'}
          />
        </Section>

        {/* Seção: Período de Validade */}
        <Section ref={periodoRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Período de Validade</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Data de Início" 
                type="date" 
                name="dataInicio" 
                fullWidth 
                value={campanha.dataInicio} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Data de Término" 
                type="date" 
                name="dataFim" 
                fullWidth 
                value={campanha.dataFim} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                required
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Hora de Início" 
                type="time" 
                name="horaInicio" 
                fullWidth 
                value={campanha.horaInicio} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Hora de Término" 
                type="time" 
                name="horaFim" 
                fullWidth 
                value={campanha.horaFim} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
              />
            </Grid>
          </Grid>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            A campanha estará ativa no período especificado acima. Certifique-se de definir datas e horas corretas.
          </Typography>
        </Section>

        {/* Seção: Segmentação e Regras */}
        <Section ref={segmentacaoRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Segmentação e Regras de Aplicação</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Público Alvo</InputLabel>
            <StyledSelect
              name="publicoAlvo"
              value={campanha.publicoAlvo}
              onChange={handleChange}
              label="Público Alvo"
              required
            >
              <MenuItem value="todos">Todos os clientes</MenuItem>
              <MenuItem value="cadastrados">Clientes cadastrados</MenuItem>
              <MenuItem value="grupo">Grupo específico</MenuItem>
              <MenuItem value="fidelidade">Clientes com histórico de pedidos</MenuItem>
            </StyledSelect>
          </FormControl>
          
          <StyledInput 
            label="Condições para ativar o desconto" 
            fullWidth 
            name="condicaoDesconto" 
            value={campanha.condicaoDesconto} 
            onChange={handleChange} 
            placeholder="Ex: Compras acima de R$ 200,00"
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Máximo de usos por cliente" 
                fullWidth 
                name="usosPorCliente" 
                value={campanha.usosPorCliente} 
                onChange={handleChange} 
                placeholder="Ex: 1"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledInput 
                label="Máximo de usos totais" 
                fullWidth 
                name="usosTotais" 
                value={campanha.usosTotais} 
                onChange={handleChange} 
                placeholder="Deixe em branco para ilimitado"
                type="number"
              />
            </Grid>
          </Grid>
          
          <StyledInput 
            label="Frequência de uso" 
            fullWidth 
            name="frequenciaUso" 
            value={campanha.frequenciaUso} 
            onChange={handleChange} 
            placeholder="Ex: 1x por semana, 1x por mês"
          />
          
          <FormControlLabel
            control={
              <Switch 
                checked={campanha.incompativel} 
                onChange={handleChange} 
                name="incompativel" 
                color="primary"
              />
            }
            label="Incompatível com outras promoções"
          />
        </Section>

        {/* Seção: Aplicação */}
        <Section ref={aplicacaoRef}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" gutterBottom>Aplicação</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <StyledInput 
            label="Aplicável a" 
            fullWidth 
            name="aplicaEm" 
            value={campanha.aplicaEm} 
            onChange={handleChange} 
            placeholder="Ex: Eletrônicos, Vestuário"
            required
          />
          
          <StyledInput 
            label="Exclusões" 
            fullWidth 
            name="exclusoes" 
            value={campanha.exclusoes} 
            onChange={handleChange} 
            placeholder="Ex: Produtos já em promoção, Marcas específicas"
          />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={campanha.freteIncluso} 
                  onChange={handleChange} 
                  name="freteIncluso" 
                  color="primary"
                />
              }
              label="Frete incluso no desconto"
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={campanha.aplicaAutomatico} 
                  onChange={handleChange} 
                  name="aplicaAutomatico" 
                  color="primary"
                />
              }
              label="Aplicar automaticamente ao carrinho"
            />
          </Box>
        </Section>

        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth 
          sx={{ 
            padding: '12px', 
            borderRadius: '12px', 
            fontWeight: 'bold',
            mb: 4
          }}
        >
          CRIAR CAMPANHA
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
            <LocalOfferIcon sx={{ fontSize: 16, mr: 1, mt: 0.5 }} color="action" />
            Escolha um nome de campanha claro e um código de cupom fácil de lembrar para aumentar a conversão. Limite o uso por cliente para evitar abuso.
          </Typography>
        </Box>
      </StepSidebar>
    </Box>
  );
};

export default CriarCampanha;
