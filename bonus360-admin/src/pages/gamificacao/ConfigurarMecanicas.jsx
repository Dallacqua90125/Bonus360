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
  Stack,
  Paper
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon, 
  Settings as SettingsIcon,
  Functions as FunctionsIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Campaign as CampaignIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Percent as PercentIcon,
  AddPhotoAlternate as ImageIcon,
  Event as EventIcon,
  Flag as FlagIcon,
  Star as StarIcon,
  Redeem as RedeemIcon,
  CardGiftcard as GiftIcon,
  LocalOffer as DiscountIcon,
  Loop as LoopIcon
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
  borderRadius: '8px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
}));

const StepCard = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
  borderRadius: '8px',
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
  borderRadius: '8px',
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
    borderRadius: '8px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
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

const MissionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#f9f9f9',
}));

function ConfigurarMecanicas() {
  // Refs para as seções
  const informacoesRef = useRef(null);
  const acoesRef = useRef(null);
  const desafiosRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);

  const [formData, setFormData] = useState({
    // Informações do Programa
    nome: '',
    descricao: '',
    imagem: null,
    status: 'ativo',
    canais: {
      site: true,
      app: false,
      loja: false,
    },
    dataInicio: null,
    dataFim: null,
    
    // Ações que Geram Pontos
    acoes: [
      { id: 'compra', nome: 'Fazer uma compra', pontos: 10, limite: 'diario', limiteValor: 1, ativo: true },
      { id: 'avaliacao', nome: 'Avaliar um produto', pontos: 5, limite: 'diario', limiteValor: 3, ativo: true },
      { id: 'indicacao', nome: 'Indicar um amigo', pontos: 20, limite: 'semanal', limiteValor: 5, ativo: true },
      { id: 'compartilhar', nome: 'Compartilhar nas redes sociais', pontos: 3, limite: 'diario', limiteValor: 5, ativo: true },
      { id: 'desejos', nome: 'Adicionar um produto à lista de desejos', pontos: 2, limite: 'diario', limiteValor: 10, ativo: true },
      { id: 'conta', nome: 'Criar uma conta', pontos: 15, limite: 'unico', limiteValor: 1, ativo: true },
      { id: 'visita', nome: 'Visitar o site por X dias consecutivos', pontos: 5, limite: 'diario', limiteValor: 1, ativo: true },
      { id: 'campanha', nome: 'Participar de campanhas específicas', pontos: 25, limite: 'campanha', limiteValor: 1, ativo: true },
    ],
    
    // Desafios e Missões
    missoes: [
      {
        id: 1,
        nome: 'Comprador Frequente',
        descricao: 'Faça 3 compras em 7 dias',
        criterio: { tipo: 'compra', quantidade: 3, periodo: 7 },
        recompensa: { tipo: 'pontos', valor: 100 },
        duracao: 7,
        repetivel: true
      },
      {
        id: 2,
        nome: 'Crítico de Produtos',
        descricao: 'Avalie 5 produtos diferentes',
        criterio: { tipo: 'avaliacao', quantidade: 5, periodo: 30 },
        recompensa: { tipo: 'badge', valor: 'Crítico' },
        duracao: 30,
        repetivel: false
      }
    ],
    novaMissao: {
      nome: '',
      descricao: '',
      criterio: { tipo: 'compra', quantidade: 1, periodo: 7 },
      recompensa: { tipo: 'pontos', valor: 50 },
      duracao: 7,
      repetivel: false
    }
  });

  const [errors, setErrors] = useState({});

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Informações do Programa', ref: informacoesRef, icon: <TrophyIcon /> },
    { title: 'Ações que Geram Pontos', ref: acoesRef, icon: <FunctionsIcon /> },
    { title: 'Desafios e Missões', ref: desafiosRef, icon: <FlagIcon /> }
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

  const handleCanalChange = (canal) => {
    setFormData(prev => ({
      ...prev,
      canais: {
        ...prev.canais,
        [canal]: !prev.canais[canal],
      }
    }));
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

  const handleAcaoChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      acoes: prev.acoes.map(acao => 
        acao.id === id ? { ...acao, [field]: value } : acao
      )
    }));
  };

  const handleAcaoToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      acoes: prev.acoes.map(acao => 
        acao.id === id ? { ...acao, ativo: !acao.ativo } : acao
      )
    }));
  };

  const handleNovaMissaoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      novaMissao: {
        ...prev.novaMissao,
        [field]: value
      }
    }));
  };

  const handleCriterioMissaoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      novaMissao: {
        ...prev.novaMissao,
        criterio: {
          ...prev.novaMissao.criterio,
          [field]: value
        }
      }
    }));
  };

  const handleRecompensaMissaoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      novaMissao: {
        ...prev.novaMissao,
        recompensa: {
          ...prev.novaMissao.recompensa,
          [field]: value
        }
      }
    }));
  };

  const adicionarMissao = () => {
    if (formData.novaMissao.nome && formData.novaMissao.descricao) {
      setFormData(prev => ({
        ...prev,
        missoes: [
          ...prev.missoes,
          {
            ...prev.novaMissao,
            id: prev.missoes.length + 1
          }
        ],
        novaMissao: {
          nome: '',
          descricao: '',
          criterio: { tipo: 'compra', quantidade: 1, periodo: 7 },
          recompensa: { tipo: 'pontos', valor: 50 },
          duracao: 7,
          repetivel: false
        }
      }));
    }
  };

  const removerMissao = (id) => {
    setFormData(prev => ({
      ...prev,
      missoes: prev.missoes.filter(missao => missao.id !== id)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do formulário:", formData);
    // Lógica para enviar dados para a API
    alert("Configurações de gamificação salvas com sucesso!");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Configurar Mecânicas de Gamificação
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <MainContent>
          {/* Seção: Informações do Programa */}
          <Section ref={informacoesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrophyIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Informações do Programa</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <StyledTextField 
                label="Nome do programa de gamificação"
                placeholder="Ex: Programa de Recompensas"
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
                label="Descrição para o usuário"
                placeholder="Ex: Participe de desafios, ganhe pontos e troque por recompensas exclusivas!"
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
              <Typography variant="subtitle2" gutterBottom>
                Imagem/banner (opcional)
              </Typography>
              <ImageUploadBox onClick={() => document.getElementById('image-upload').click()}>
                {formData.imagem ? (
                  <Box sx={{ position: 'relative' }}>
                    <img 
                      src={formData.imagem} 
                      alt="Banner do programa" 
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} 
                    />
                    <IconButton 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, imagem: null }));
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ImageIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Clique para adicionar uma imagem
                    </Typography>
                  </Box>
                )}
                <input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleImageUpload} 
                />
              </ImageUploadBox>
            </FormField>
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <FormControlLabel value="ativo" control={<StyledRadio />} label="Ativo" />
                  <FormControlLabel value="inativo" control={<StyledRadio />} label="Inativo" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Disponível em
              </Typography>
              <FormControlLabel
                control={
                  <StyledCheckbox 
                    checked={formData.canais.site} 
                    onChange={() => handleCanalChange('site')} 
                  />
                }
                label="Site"
              />
              <FormControlLabel
                control={
                  <StyledCheckbox 
                    checked={formData.canais.app} 
                    onChange={() => handleCanalChange('app')} 
                  />
                }
                label="App"
              />
              <FormControlLabel
                control={
                  <StyledCheckbox 
                    checked={formData.canais.loja} 
                    onChange={() => handleCanalChange('loja')} 
                  />
                }
                label="Loja física"
              />
            </FormField>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Data de início"
                    type="date"
                    name="dataInicio"
                    value={formData.dataInicio || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Data de fim (opcional)"
                    type="date"
                    name="dataFim"
                    value={formData.dataFim || ''}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </FormField>
              </Grid>
            </Grid>
          </Section>

          {/* Seção: Ações que Geram Pontos */}
          <Section ref={acoesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FunctionsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Ações que Geram Pontos ou Progresso</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Ações disponíveis
            </Typography>
            
            <Stack spacing={2}>
              {formData.acoes.map((acao) => (
                <Paper key={acao.id} sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <FormControlLabel
                        control={
                          <StyledSwitch 
                            checked={acao.ativo} 
                            onChange={() => handleAcaoToggle(acao.id)} 
                          />
                        }
                        label={acao.nome}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StyledTextField
                        label="Pontos"
                        type="number"
                        value={acao.pontos}
                        onChange={(e) => handleAcaoChange(acao.id, 'pontos', parseInt(e.target.value) || 0)}
                        fullWidth
                        size="small"
                        InputProps={{
                          inputProps: { min: 0 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Limite</InputLabel>
                        <StyledSelect
                          value={acao.limite}
                          label="Limite"
                          onChange={(e) => handleAcaoChange(acao.id, 'limite', e.target.value)}
                        >
                          <MenuItem value="diario">Diário</MenuItem>
                          <MenuItem value="semanal">Semanal</MenuItem>
                          <MenuItem value="mensal">Mensal</MenuItem>
                          <MenuItem value="unico">Único</MenuItem>
                          <MenuItem value="campanha">Por campanha</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <StyledTextField
                        label="Quantidade"
                        type="number"
                        value={acao.limiteValor}
                        onChange={(e) => handleAcaoChange(acao.id, 'limiteValor', parseInt(e.target.value) || 0)}
                        fullWidth
                        size="small"
                        InputProps={{
                          inputProps: { min: 1 }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Section>

          {/* Seção: Desafios e Missões */}
          <Section ref={desafiosRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FlagIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Desafios e Missões</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Missões existentes
            </Typography>
            
            {formData.missoes.map((missao) => (
              <MissionCard key={missao.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{missao.nome}</Typography>
                  <IconButton size="small" onClick={() => removerMissao(missao.id)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {missao.descricao}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight="medium">
                      Critério: {missao.criterio.quantidade} {missao.criterio.tipo}(s) em {missao.criterio.periodo} dias
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight="medium">
                      Recompensa: {missao.recompensa.tipo === 'pontos' ? `${missao.recompensa.valor} pontos` : 
                                   missao.recompensa.tipo === 'badge' ? `Badge "${missao.recompensa.valor}"` :
                                   missao.recompensa.tipo === 'desconto' ? `${missao.recompensa.valor}% de desconto` :
                                   `Produto grátis`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      Duração: {missao.duracao} dias
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      Repetível: {missao.repetivel ? 'Sim' : 'Não'}
                    </Typography>
                  </Grid>
                </Grid>
              </MissionCard>
            ))}
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Criar nova missão
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  label="Nome da missão"
                  fullWidth
                  value={formData.novaMissao.nome}
                  onChange={(e) => handleNovaMissaoChange('nome', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.novaMissao.descricao}
                  onChange={(e) => handleNovaMissaoChange('descricao', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Critério de conclusão
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo de ação</InputLabel>
                      <StyledSelect
                        value={formData.novaMissao.criterio.tipo}
                        label="Tipo de ação"
                        onChange={(e) => handleCriterioMissaoChange('tipo', e.target.value)}
                      >
                        <MenuItem value="compra">Compra</MenuItem>
                        <MenuItem value="avaliacao">Avaliação</MenuItem>
                        <MenuItem value="indicacao">Indicação</MenuItem>
                        <MenuItem value="compartilhar">Compartilhamento</MenuItem>
                        <MenuItem value="desejos">Lista de desejos</MenuItem>
                        <MenuItem value="visita">Visita ao site</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledTextField
                      label="Quantidade"
                      type="number"
                      fullWidth
                      size="small"
                      value={formData.novaMissao.criterio.quantidade}
                      onChange={(e) => handleCriterioMissaoChange('quantidade', parseInt(e.target.value) || 0)}
                      InputProps={{
                        inputProps: { min: 1 }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledTextField
                      label="Período (dias)"
                      type="number"
                      fullWidth
                      size="small"
                      value={formData.novaMissao.criterio.periodo}
                      onChange={(e) => handleCriterioMissaoChange('periodo', parseInt(e.target.value) || 0)}
                      InputProps={{
                        inputProps: { min: 1 }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Recompensa ao completar
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo de recompensa</InputLabel>
                      <StyledSelect
                        value={formData.novaMissao.recompensa.tipo}
                        label="Tipo de recompensa"
                        onChange={(e) => handleRecompensaMissaoChange('tipo', e.target.value)}
                      >
                        <MenuItem value="pontos">Pontos</MenuItem>
                        <MenuItem value="badge">Badge</MenuItem>
                        <MenuItem value="desconto">Desconto</MenuItem>
                        <MenuItem value="produto">Produto grátis</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledTextField
                      label="Valor"
                      fullWidth
                      size="small"
                      value={formData.novaMissao.recompensa.valor}
                      onChange={(e) => handleRecompensaMissaoChange('valor', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledTextField
                      label="Duração (dias)"
                      type="number"
                      fullWidth
                      size="small"
                      value={formData.novaMissao.duracao}
                      onChange={(e) => handleNovaMissaoChange('duracao', parseInt(e.target.value) || 0)}
                      InputProps={{
                        inputProps: { min: 1 }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <StyledSwitch 
                      checked={formData.novaMissao.repetivel} 
                      onChange={(e) => handleNovaMissaoChange('repetivel', e.target.checked)} 
                    />
                  }
                  label="Missão repetível"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={adicionarMissao}
                  disabled={!formData.novaMissao.nome || !formData.novaMissao.descricao}
                >
                  Adicionar Missão
                </Button>
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
              borderRadius: '8px', 
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
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default ConfigurarMecanicas; 