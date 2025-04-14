import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  styled,
  Paper,
  Grid,
  Divider,
  InputAdornment,
  Radio,
  RadioGroup,
  FormLabel,
  IconButton,
  OutlinedInput,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
  CardGiftcard as GiftCardIcon, 
  EventNote as EventIcon, 
  Payment as PaymentIcon,
  ContentCopy as ContentCopyIcon,
  AddPhotoAlternate as ImageIcon,
} from '@mui/icons-material';

// Componentes estilizados
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '800px',
}));

const StepSidebar = styled(Box)(({ theme }) => ({
  width: '280px',
  position: 'sticky',
  top: '80px',
  alignSelf: 'flex-start',
  marginLeft: 'auto',
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '4px',
  border: '1px solid #eaeaea',
}));

const StepCard = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderLeft: active ? '4px solid #1976d2' : '4px solid transparent',
}));

const StepIcon = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: active ? '#1976d2' : '#bdbdbd',
  color: '#fff',
  marginRight: theme.spacing(1.5),
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  border: '1px dashed #ccc',
  borderRadius: '4px',
  padding: theme.spacing(3),
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: '#fafafa',
  '&:hover': {
    borderColor: '#1976d2',
    backgroundColor: '#f0f7ff',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
}));

function CriarGiftCards() {
  // Refs para as seções
  const detalhesRef = useRef(null);
  const tipoRef = useRef(null);
  const validadeRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: null,
    codigo: '',
    codigoPersonalizado: false,
    valor: '',
    moeda: 'BRL',
    status: 'ativo',
    campanha: '',
    
    tipo: 'prepago',
    valorMinimo: '',
    valorMaximo: '',
    reutilizavel: false,
    formato: 'digital',
    estoque: '',
    
    dataAtivacao: null,
    dataExpiracao: null,
    duracaoAposAtivacao: '',
    unidadeDuracao: 'dias',
  });

  const [errors, setErrors] = useState({});

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Detalhes do Gift Card', ref: detalhesRef, icon: <GiftCardIcon /> },
    { title: 'Tipo de Gift Card', ref: tipoRef, icon: <PaymentIcon /> },
    { title: 'Validade', ref: validadeRef, icon: <EventIcon /> }
  ];

  // Função para scrollar para uma seção
  const scrollToSection = (ref, index) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  // Effect para detectar qual seção está visível
  useEffect(() => {
    const handleScroll = () => {
      // Lógica para determinar qual seção está visível
      const positions = steps.map(step => ({
        position: step.ref.current.getBoundingClientRect().top,
        index: steps.indexOf(step)
      }));
      
      // Encontrar a seção mais próxima do topo
      const activePos = positions.reduce((prev, curr) => {
        return (Math.abs(curr.position - 100) < Math.abs(prev.position - 100)) ? curr : prev;
      });
      
      setActiveSection(activePos.index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDateChange = (name, newValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagem: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({
      ...prev,
      codigo: result
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    
    // Validações básicas
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.codigo) tempErrors.codigo = "Código é obrigatório";
    if (!formData.valor && formData.tipo === 'prepago') tempErrors.valor = "Valor é obrigatório";
    
    // Outras validações conforme necessário
    // ...
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    console.log('Criando Gift Card com os dados:', formData);
    alert('Gift Card criado com sucesso!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Criar Gift Card
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <MainContent>
          {/* Seção: Detalhes do Gift Card */}
          <Section ref={detalhesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GiftCardIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Detalhes do Gift Card</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <StyledTextField 
                label="Nome do Gift Card"
                placeholder="Ex: Cartão Presente Aniversário"
                fullWidth
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
                required
              />
            </FormField>
            
            <FormField>
              <StyledTextField
                label="Descrição"
                placeholder="Descreva o gift card e sua utilização"
                fullWidth
                multiline
                rows={3}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </FormField>
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Imagem Personalizada (opcional)
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="imagem-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="imagem-upload">
                <ImageUploadBox>
                  {formData.imagem ? (
                    <Box sx={{ width: '100%', height: '120px', position: 'relative' }}>
                      <img 
                        src={formData.imagem} 
                        alt="Gift Card Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Clique para fazer upload de uma imagem
                      </Typography>
                    </Box>
                  )}
                </ImageUploadBox>
              </label>
            </FormField>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Código</Typography>
                    <IconButton size="small" onClick={generateRandomCode} sx={{ ml: 1 }}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <StyledTextField
                    placeholder="Código do gift card"
                    fullWidth
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    error={!!errors.codigo}
                    helperText={errors.codigo}
                    required
                    InputProps={{
                      endAdornment: (
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={formData.codigoPersonalizado} 
                              onChange={handleChange} 
                              name="codigoPersonalizado" 
                              size="small"
                            />
                          }
                          label="Personalizado"
                          sx={{ ml: 1 }}
                        />
                      )
                    }}
                  />
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="valor">Valor do Gift Card</InputLabel>
                    <OutlinedInput
                      id="valor"
                      name="valor"
                      value={formData.valor}
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          R$
                        </InputAdornment>
                      }
                      label="Valor do Gift Card"
                      type="number"
                      inputProps={{ min: "0.01", step: "0.01" }}
                      error={!!errors.valor}
                      required
                    />
                    {errors.valor && (
                      <Typography variant="caption" color="error">
                        {errors.valor}
                      </Typography>
                    )}
                  </FormControl>
                </FormField>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControl fullWidth>
                    <InputLabel>Moeda</InputLabel>
                    <Select
                      name="moeda"
                      value={formData.moeda}
                      onChange={handleChange}
                      label="Moeda"
                    >
                      <MenuItem value="BRL">Real (R$)</MenuItem>
                      <MenuItem value="USD">Dólar (US$)</MenuItem>
                      <MenuItem value="EUR">Euro (€)</MenuItem>
                    </Select>
                  </FormControl>
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value="ativo">Ativo</MenuItem>
                      <MenuItem value="inativo">Inativo</MenuItem>
                      <MenuItem value="agendado">Agendado</MenuItem>
                    </Select>
                  </FormControl>
                </FormField>
              </Grid>
            </Grid>
          </Section>

          {/* Seção: Tipo de Gift Card */}
          <Section ref={tipoRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaymentIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Tipo de Gift Card</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo</FormLabel>
                <RadioGroup
                  row
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <FormControlLabel value="prepago" control={<Radio />} label="Pré-pago (valor fixo)" />
                  <FormControlLabel value="customizavel" control={<Radio />} label="Customizável (cliente define valor)" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            {formData.tipo === 'customizavel' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormField>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="valorMinimo">Valor Mínimo</InputLabel>
                      <OutlinedInput
                        id="valorMinimo"
                        name="valorMinimo"
                        value={formData.valorMinimo}
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            R$
                          </InputAdornment>
                        }
                        label="Valor Mínimo"
                        type="number"
                      />
                    </FormControl>
                  </FormField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormField>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="valorMaximo">Valor Máximo</InputLabel>
                      <OutlinedInput
                        id="valorMaximo"
                        name="valorMaximo"
                        value={formData.valorMaximo}
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            R$
                          </InputAdornment>
                        }
                        label="Valor Máximo"
                        type="number"
                      />
                    </FormControl>
                  </FormField>
                </Grid>
              </Grid>
            )}
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.reutilizavel} 
                    onChange={handleChange} 
                    name="reutilizavel" 
                    color="primary"
                  />
                }
                label="Reutilizável (pode ser usado mais de uma vez)"
              />
            </FormField>
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Formato</FormLabel>
                <RadioGroup
                  row
                  name="formato"
                  value={formData.formato}
                  onChange={handleChange}
                >
                  <FormControlLabel value="digital" control={<Radio />} label="Digital (enviado por e-mail)" />
                  <FormControlLabel value="fisico" control={<Radio />} label="Físico (impresso)" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            {formData.formato === 'fisico' && (
              <FormField>
                <StyledTextField 
                  label="Estoque disponível"
                  fullWidth
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  type="number"
                  inputProps={{ min: "1" }}
                />
              </FormField>
            )}
          </Section>

          {/* Seção: Validade */}
          <Section ref={validadeRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Validade</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <DatePicker
                    label="Data de Ativação"
                    value={formData.dataAtivacao}
                    onChange={(newValue) => handleDateChange('dataAtivacao', newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined'
                      }
                    }}
                  />
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <DatePicker
                    label="Data de Expiração"
                    value={formData.dataExpiracao}
                    onChange={(newValue) => handleDateChange('dataExpiracao', newValue)}
                    minDate={formData.dataAtivacao || undefined}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined'
                      }
                    }}
                  />
                </FormField>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField 
                    label="Duração após ativação"
                    fullWidth
                    name="duracaoAposAtivacao"
                    value={formData.duracaoAposAtivacao}
                    onChange={handleChange}
                    type="number"
                    inputProps={{ min: "1" }}
                    placeholder="Ex: 6"
                  />
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControl fullWidth>
                    <InputLabel>Unidade</InputLabel>
                    <Select
                      name="unidadeDuracao"
                      value={formData.unidadeDuracao}
                      onChange={handleChange}
                      label="Unidade"
                    >
                      <MenuItem value="dias">Dias</MenuItem>
                      <MenuItem value="semanas">Semanas</MenuItem>
                      <MenuItem value="meses">Meses</MenuItem>
                      <MenuItem value="anos">Anos</MenuItem>
                    </Select>
                  </FormControl>
                </FormField>
              </Grid>
            </Grid>
          </Section>

          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ 
              py: 1.5,
              px: 4, 
              borderRadius: '4px', 
              mt: 2,
              textTransform: 'uppercase'
            }}
          >
            Criar Gift Card
          </Button>
        </MainContent>
        
        {/* Navegação lateral */}
        <StepSidebar>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Etapas do Formulário
          </Typography>
          
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              active={activeSection === index}
              onClick={() => scrollToSection(step.ref, index)}
            >
              <StepIcon active={activeSection === index}>
                {step.icon}
              </StepIcon>
              <Typography variant="body1">
                {index + 1}. {step.title}
              </Typography>
            </StepCard>
          ))}

          <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: '4px' }}>
            <Typography variant="body2" color="text.secondary">
              Os gift cards são uma excelente forma de aumentar vendas e fidelizar clientes. Ofereça opções personalizadas para ocasiões especiais.
            </Typography>
          </Box>
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default CriarGiftCards; 