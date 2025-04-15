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
  Chip,
  FormHelperText,
  Slider,
  Tooltip,
  Stack
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon, 
  Settings as SettingsIcon,
  Functions as FunctionsIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  CurrencyExchange as CurrencyIcon,
  Campaign as CampaignIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Percent as PercentIcon,
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '4px',
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${theme.palette.primary.light}`,
    },
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ResgatesRecargas() {
  // Refs para as seções
  const configuracoesRef = useRef(null);
  const funcionalidadesRef = useRef(null);
  const regrasRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);

  const [formData, setFormData] = useState({
    // Configurações Gerais da Carteira
    nome: '',
    descricao: '',
    ativada: true,
    moeda: 'BRL',
    saldoInicial: '',
    programasVinculados: {
      cashback: false,
      fidelidade: false,
      indicacao: false,
      giftCards: false
    },
    
    // Funcionalidades Ativadas
    funcionalidades: {
      receberSaldoManual: true,
      ganharCashback: true,
      usarPontosConvertidos: true,
      receberPorCupons: true,
      transferirSaldo: false,
      reembolsosAutomaticos: true
    },
    valorMinimoCheckout: '',
    valorMaximoTransacao: '',
    usarComPromocoes: true,
    saldoExpira: false,
    diasParaExpiracao: 365,
    
    // Regras de Ganho de Saldo
    tipoGanho: 'percentual',
    tabelaGanho: [
      { min: 0, max: 100, percentual: 5 },
      { min: 100, max: 500, percentual: 10 },
      { min: 500, max: 1000, percentual: 15 },
      { min: 1000, max: null, percentual: 20 }
    ],
    ganhoAdicionalCampanha: false,
    percentualAdicionalCampanha: 5,
    regrasAcumulo: {
      compraMinima: '',
      produtosEspecificos: false,
      categoriasEspecificas: false,
      canalOrigem: 'todos'
    }
  });

  const [errors, setErrors] = useState({});

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Configurações Gerais', ref: configuracoesRef, icon: <SettingsIcon /> },
    { title: 'Funcionalidades', ref: funcionalidadesRef, icon: <FunctionsIcon /> },
    { title: 'Regras de Ganho', ref: regrasRef, icon: <MoneyIcon /> }
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
    
    // Tratamento especial para campos aninhados
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleProgramaChange = (programa) => {
    setFormData(prev => ({
      ...prev,
      programasVinculados: {
        ...prev.programasVinculados,
        [programa]: !prev.programasVinculados[programa],
      }
    }));
  };

  const handleFuncionalidadeChange = (funcionalidade) => {
    setFormData(prev => ({
      ...prev,
      funcionalidades: {
        ...prev.funcionalidades,
        [funcionalidade]: !prev.funcionalidades[funcionalidade],
      }
    }));
  };

  const handleRegraAcumuloChange = (regra) => {
    setFormData(prev => ({
      ...prev,
      regrasAcumulo: {
        ...prev.regrasAcumulo,
        [regra]: !prev.regrasAcumulo[regra],
      }
    }));
  };

  const handleTabelaGanhoChange = (index, field, value) => {
    const newTabela = [...formData.tabelaGanho];
    newTabela[index] = {
      ...newTabela[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      tabelaGanho: newTabela
    }));
  };

  const addTabelaGanho = () => {
    setFormData(prev => ({
      ...prev,
      tabelaGanho: [
        ...prev.tabelaGanho,
        { min: 0, max: null, percentual: 0 }
      ]
    }));
  };

  const removeTabelaGanho = (index) => {
    setFormData(prev => ({
      ...prev,
      tabelaGanho: prev.tabelaGanho.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    
    // Validação básica
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.descricao) tempErrors.descricao = "Descrição é obrigatória";
    if (!formData.moeda) tempErrors.moeda = "Moeda é obrigatória";
    
    // Validação de valores
    if (formData.saldoInicial && (isNaN(formData.saldoInicial) || Number(formData.saldoInicial) < 0)) {
      tempErrors.saldoInicial = "Saldo inicial deve ser um valor positivo";
    }
    
    if (formData.valorMinimoCheckout && (isNaN(formData.valorMinimoCheckout) || Number(formData.valorMinimoCheckout) < 0)) {
      tempErrors.valorMinimoCheckout = "Valor mínimo deve ser positivo";
    }
    
    if (formData.valorMaximoTransacao && (isNaN(formData.valorMaximoTransacao) || Number(formData.valorMaximoTransacao) < 0)) {
      tempErrors.valorMaximoTransacao = "Valor máximo deve ser positivo";
    }
    
    if (formData.saldoExpira && (isNaN(formData.diasParaExpiracao) || Number(formData.diasParaExpiracao) <= 0)) {
      tempErrors.diasParaExpiracao = "Dias para expiração deve ser maior que zero";
    }
    
    // Validação da tabela de ganho
    if (formData.tabelaGanho.length === 0) {
      tempErrors.tabelaGanho = "Adicione pelo menos uma regra de ganho";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    console.log('Configurando carteira com os dados:', formData);
    alert('Configuração da carteira salva com sucesso!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Configurar Carteira
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <MainContent>
          {/* Seção: Configurações Gerais da Carteira */}
          <Section ref={configuracoesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Configurações Gerais da Carteira</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <StyledTextField 
                label="Nome da carteira"
                placeholder="Ex: Carteira de Fidelidade"
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
                placeholder="Ex: Carteira para acumular créditos e descontos"
                fullWidth
                multiline
                rows={3}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                error={!!errors.descricao}
                helperText={errors.descricao}
                required
              />
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <StyledSwitch 
                    checked={formData.ativada} 
                    onChange={handleChange} 
                    name="ativada" 
                  />
                }
                label="Carteira ativada"
              />
            </FormField>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControl fullWidth>
                    <InputLabel>Moeda utilizada</InputLabel>
                    <StyledSelect
                      name="moeda"
                      value={formData.moeda}
                      onChange={handleChange}
                      label="Moeda utilizada"
                    >
                      <MenuItem value="BRL">BRL - Real Brasileiro</MenuItem>
                      <MenuItem value="USD">USD - Dólar Americano</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="ARS">ARS - Peso Argentino</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Saldo inicial padrão"
                    placeholder="Deixe em branco para zero"
                    fullWidth
                    type="number"
                    name="saldoInicial"
                    value={formData.saldoInicial}
                    onChange={handleChange}
                    error={!!errors.saldoInicial}
                    helperText={errors.saldoInicial}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: "0", step: "0.01" },
                    }}
                  />
                </FormField>
              </Grid>
            </Grid>
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Vinculada a programas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                <FormControlLabel
                  control={
                    <StyledCheckbox 
                      checked={formData.programasVinculados.cashback} 
                      onChange={() => handleProgramaChange('cashback')} 
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">Cashback</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <StyledCheckbox 
                      checked={formData.programasVinculados.fidelidade} 
                      onChange={() => handleProgramaChange('fidelidade')} 
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CampaignIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">Fidelidade</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <StyledCheckbox 
                      checked={formData.programasVinculados.indicacao} 
                      onChange={() => handleProgramaChange('indicacao')} 
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalanceIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">Indicação</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <StyledCheckbox 
                      checked={formData.programasVinculados.giftCards} 
                      onChange={() => handleProgramaChange('giftCards')} 
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <OfferIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">Gift Cards</Typography>
                    </Box>
                  }
                />
              </Box>
            </FormField>
          </Section>

          {/* Seção: Funcionalidades Ativadas */}
          <Section ref={funcionalidadesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FunctionsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Funcionalidades Ativadas</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Permitir:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.receberSaldoManual} 
                        onChange={() => handleFuncionalidadeChange('receberSaldoManual')} 
                      />
                    }
                    label="Receber saldo manualmente"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.ganharCashback} 
                        onChange={() => handleFuncionalidadeChange('ganharCashback')} 
                      />
                    }
                    label="Ganhar cashback"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.usarPontosConvertidos} 
                        onChange={() => handleFuncionalidadeChange('usarPontosConvertidos')} 
                      />
                    }
                    label="Usar pontos convertidos em saldo"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.receberPorCupons} 
                        onChange={() => handleFuncionalidadeChange('receberPorCupons')} 
                      />
                    }
                    label="Receber por cupons ou promoções"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.transferirSaldo} 
                        onChange={() => handleFuncionalidadeChange('transferirSaldo')} 
                      />
                    }
                    label="Transferir saldo entre clientes"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.funcionalidades.reembolsosAutomaticos} 
                        onChange={() => handleFuncionalidadeChange('reembolsosAutomaticos')} 
                      />
                    }
                    label="Reembolsos automáticos para a carteira"
                  />
                </Grid>
              </Grid>
            </FormField>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Valor mínimo para uso no checkout"
                    placeholder="Ex: 10,00"
                    fullWidth
                    type="number"
                    name="valorMinimoCheckout"
                    value={formData.valorMinimoCheckout}
                    onChange={handleChange}
                    error={!!errors.valorMinimoCheckout}
                    helperText={errors.valorMinimoCheckout}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: "0", step: "0.01" },
                    }}
                  />
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Valor máximo por transação"
                    placeholder="Ex: 500,00"
                    fullWidth
                    type="number"
                    name="valorMaximoTransacao"
                    value={formData.valorMaximoTransacao}
                    onChange={handleChange}
                    error={!!errors.valorMaximoTransacao}
                    helperText={errors.valorMaximoTransacao}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: "0", step: "0.01" },
                    }}
                  />
                </FormField>
              </Grid>
            </Grid>
            
            <FormField>
              <FormControlLabel
                control={
                  <StyledSwitch 
                    checked={formData.usarComPromocoes} 
                    onChange={handleChange} 
                    name="usarComPromocoes" 
                  />
                }
                label="Saldo pode ser usado com outras promoções?"
              />
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <StyledSwitch 
                    checked={formData.saldoExpira} 
                    onChange={handleChange} 
                    name="saldoExpira" 
                  />
                }
                label="Saldo pode expirar?"
              />
            </FormField>
            
            {formData.saldoExpira && (
              <FormField>
                <Typography variant="subtitle2" gutterBottom>
                  Após quantos dias o saldo expira?
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <StyledSlider
                    value={formData.diasParaExpiracao}
                    onChange={(_, value) => setFormData(prev => ({ ...prev, diasParaExpiracao: value }))}
                    min={1}
                    max={730}
                    step={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} dias`}
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="body2" sx={{ minWidth: '60px' }}>
                    {formData.diasParaExpiracao} dias
                  </Typography>
                </Box>
                {errors.diasParaExpiracao && (
                  <FormHelperText error>{errors.diasParaExpiracao}</FormHelperText>
                )}
              </FormField>
            )}
          </Section>

          {/* Seção: Regras de Ganho de Saldo */}
          <Section ref={regrasRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Regras de Ganho de Saldo</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de ganho:</FormLabel>
                <RadioGroup
                  name="tipoGanho"
                  value={formData.tipoGanho}
                  onChange={handleChange}
                >
                  <FormControlLabel value="percentual" control={<StyledRadio />} label="Percentual sobre compras" />
                  <FormControlLabel value="fixo" control={<StyledRadio />} label="Valor fixo por ação" />
                  <FormControlLabel value="categoria" control={<StyledRadio />} label="Cashback por categoria/produto" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Tabela de ganho
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">Valor mínimo</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">Valor máximo</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="caption" color="text.secondary">Percentual</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="caption" color="text.secondary">Ações</Typography>
                  </Grid>
                </Grid>
                
                {formData.tabelaGanho.map((item, index) => (
                  <Grid container spacing={2} alignItems="center" key={index} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        type="number"
                        value={item.min}
                        onChange={(e) => handleTabelaGanhoChange(index, 'min', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                          inputProps: { min: "0", step: "0.01" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        type="number"
                        value={item.max || ''}
                        onChange={(e) => handleTabelaGanhoChange(index, 'max', e.target.value || null)}
                        placeholder="Sem limite"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                          inputProps: { min: "0", step: "0.01" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        type="number"
                        value={item.percentual}
                        onChange={(e) => handleTabelaGanhoChange(index, 'percentual', e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          inputProps: { min: "0", max: "100", step: "0.1" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => removeTabelaGanho(index)}
                        disabled={formData.tabelaGanho.length <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={addTabelaGanho}
                  sx={{ mt: 2 }}
                >
                  Adicionar regra
                </Button>
                
                {errors.tabelaGanho && (
                  <FormHelperText error>{errors.tabelaGanho}</FormHelperText>
                )}
              </Paper>
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <StyledSwitch 
                    checked={formData.ganhoAdicionalCampanha} 
                    onChange={handleChange} 
                    name="ganhoAdicionalCampanha" 
                  />
                }
                label="Ganho adicional por campanha ou canal"
              />
            </FormField>
            
            {formData.ganhoAdicionalCampanha && (
              <FormField>
                <StyledTextField
                  label="Percentual adicional"
                  fullWidth
                  type="number"
                  name="percentualAdicionalCampanha"
                  value={formData.percentualAdicionalCampanha}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: { min: "0", max: "100", step: "0.1" },
                  }}
                />
              </FormField>
            )}
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Regras específicas de acúmulo
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    label="Compra mínima para ganho"
                    placeholder="Ex: 50,00"
                    fullWidth
                    type="number"
                    name="regrasAcumulo.compraMinima"
                    value={formData.regrasAcumulo.compraMinima}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      inputProps: { min: "0", step: "0.01" },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Canal de origem</InputLabel>
                    <StyledSelect
                      name="regrasAcumulo.canalOrigem"
                      value={formData.regrasAcumulo.canalOrigem}
                      onChange={handleChange}
                      label="Canal de origem"
                    >
                      <MenuItem value="todos">Todos os canais</MenuItem>
                      <MenuItem value="app">Apenas aplicativo</MenuItem>
                      <MenuItem value="site">Apenas site</MenuItem>
                      <MenuItem value="loja">Apenas loja física</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.regrasAcumulo.produtosEspecificos} 
                        onChange={() => handleRegraAcumuloChange('produtosEspecificos')} 
                      />
                    }
                    label="Apenas em determinados produtos"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <StyledCheckbox 
                        checked={formData.regrasAcumulo.categoriasEspecificas} 
                        onChange={() => handleRegraAcumuloChange('categoriasEspecificas')} 
                      />
                    }
                    label="Apenas em determinadas categorias"
                  />
                </Grid>
              </Grid>
            </FormField>
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
            Salvar Configurações
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
              Configure sua carteira digital para oferecer benefícios aos clientes. Defina as regras de ganho, funcionalidades disponíveis e integrações com outros programas.
            </Typography>
          </Box>
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default ResgatesRecargas; 