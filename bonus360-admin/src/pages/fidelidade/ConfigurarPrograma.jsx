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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { 
  Loyalty,
  EventNote as EventIcon, 
  Payment as PaymentIcon,
  AddCircleOutline as AddIcon,
  DeleteOutline as DeleteIcon,
  People as PeopleIcon,
  CardGiftcard as RewardIcon,
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

const RecompensaRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function ConfigurarPrograma() {
  // Refs para as seções
  const detalhesRef = useRef(null);
  const acumuloRef = useRef(null);
  const recompensasRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);

  const [formData, setFormData] = useState({
    // Detalhes do Programa
    nome: '',
    descricao: '',
    status: 'ativo',
    imagem: null,
    publicoAlvo: 'todos',
    gruposClientes: [],
    tipoProgramaBase: 'pontuacao',
    
    // Acúmulo de Pontos
    pontosValor: 1,
    valorBase: 1,
    arredondamento: 'baixo',
    bonusPrimeiraCompra: false,
    bonusPrimeiraCompraValor: 0,
    bonusAniversario: false,
    bonusAniversarioValor: 0,
    bonusIndicacao: false,
    bonusIndicacaoValor: 0,
    bonusAcoes: [],
    categoriasEspeciais: [],
    limitePontosPedido: false,
    valorLimitePontos: 0,
    pontuacaoEmFrete: false,
    pontuacaoEmImpostos: false,
    
    // Resgate de Recompensas
    tipoRecompensa: 'descontoFixo',
    recompensas: [
      { pontos: 100, valor: 10, tipo: 'descontoFixo', descricao: 'R$ 10 de desconto' }
    ],
    pontuacaoMinimaResgate: 100,
    validadePontosResgatados: 30, // em dias
    expiraPontuacao: false,
    diasExpiracao: 365,
    resgateAutomatico: false,
  });

  const [errors, setErrors] = useState({});

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Detalhes do Programa', ref: detalhesRef, icon: <Loyalty /> },
    { title: 'Acúmulo de Pontos', ref: acumuloRef, icon: <PaymentIcon /> },
    { title: 'Resgate de Recompensas', ref: recompensasRef, icon: <RewardIcon /> }
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

  const handleAddRecompensa = () => {
    const novaRecompensa = { 
      pontos: 0, 
      valor: 0, 
      tipo: formData.tipoRecompensa,
      descricao: 'Nova recompensa'
    };
    
    setFormData(prev => ({
      ...prev,
      recompensas: [...prev.recompensas, novaRecompensa]
    }));
  };

  const handleRemoveRecompensa = (index) => {
    setFormData(prev => ({
      ...prev,
      recompensas: prev.recompensas.filter((_, i) => i !== index)
    }));
  };

  const handleRecompensaChange = (index, field, value) => {
    setFormData(prev => {
      const updatedRecompensas = [...prev.recompensas];
      updatedRecompensas[index] = {
        ...updatedRecompensas[index],
        [field]: value
      };
      return {
        ...prev,
        recompensas: updatedRecompensas
      };
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    
    // Validação básica
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.descricao) tempErrors.descricao = "Descrição é obrigatória";
    
    if (formData.pontosValor <= 0) tempErrors.pontosValor = "Valor deve ser maior que zero";
    if (formData.valorBase <= 0) tempErrors.valorBase = "Valor deve ser maior que zero";
    
    if (formData.recompensas.length === 0) tempErrors.recompensas = "Adicione pelo menos uma recompensa";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    console.log('Configurando programa de fidelidade com os dados:', formData);
    alert('Programa de fidelidade configurado com sucesso!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Configurar Programa de Fidelidade
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <MainContent>
          {/* Seção: Detalhes do Programa */}
          <Section ref={detalhesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Loyalty sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Detalhes do Programa</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <StyledTextField 
                label="Nome do programa de fidelidade"
                placeholder="Ex: Clube de Vantagens Premium"
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
                label="Descrição para o cliente"
                placeholder="Ex: Acumule pontos em suas compras e troque por descontos exclusivos!"
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
                </Select>
              </FormControl>
            </FormField>
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Imagem ou ícone (opcional)
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
                        alt="Logo do Programa" 
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
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Público-alvo</FormLabel>
                <RadioGroup
                  name="publicoAlvo"
                  value={formData.publicoAlvo}
                  onChange={handleChange}
                >
                  <FormControlLabel value="todos" control={<Radio />} label="Todos os clientes" />
                  <FormControlLabel value="cadastrados" control={<Radio />} label="Clientes cadastrados" />
                  <FormControlLabel value="grupos" control={<Radio />} label="Clientes por grupo/tags" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de programa</FormLabel>
                <RadioGroup
                  name="tipoProgramaBase"
                  value={formData.tipoProgramaBase}
                  onChange={handleChange}
                >
                  <FormControlLabel value="pontuacao" control={<Radio />} label="Pontuação por compra" />
                  <FormControlLabel value="cashback" control={<Radio />} label="Cashback" />
                  <FormControlLabel value="niveis" control={<Radio />} label="Níveis de fidelidade (bronze, prata, ouro)" />
                  <FormControlLabel value="misto" control={<Radio />} label="Sistema misto" />
                </RadioGroup>
              </FormControl>
            </FormField>
          </Section>

          {/* Seção: Acúmulo de Pontos */}
          <Section ref={acumuloRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaymentIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Acúmulo de Pontos</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Regra principal
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <FormField>
                  <StyledTextField
                    label="Pontos"
                    fullWidth
                    type="number"
                    name="pontosValor"
                    value={formData.pontosValor}
                    onChange={handleChange}
                    error={!!errors.pontosValor}
                    helperText={errors.pontosValor}
                    inputProps={{ min: "0.1", step: "0.1" }}
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormField>
                  <StyledTextField
                    label="Valor em compras (R$)"
                    fullWidth
                    type="number"
                    name="valorBase"
                    value={formData.valorBase}
                    onChange={handleChange}
                    error={!!errors.valorBase}
                    helperText={errors.valorBase}
                    inputProps={{ min: "0.01", step: "0.01" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </FormField>
              </Grid>
            </Grid>
            
            <FormField>
              <FormControl fullWidth>
                <InputLabel>Arredondamento</InputLabel>
                <Select
                  name="arredondamento"
                  value={formData.arredondamento}
                  onChange={handleChange}
                  label="Arredondamento"
                >
                  <MenuItem value="baixo">Arredondar para baixo</MenuItem>
                  <MenuItem value="cima">Arredondar para cima</MenuItem>
                  <MenuItem value="proximo">Arredondar para o valor mais próximo</MenuItem>
                </Select>
              </FormControl>
            </FormField>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Ganho extra em:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.bonusPrimeiraCompra} 
                        onChange={handleChange} 
                        name="bonusPrimeiraCompra" 
                      />
                    }
                    label="Primeira compra"
                  />
                  {formData.bonusPrimeiraCompra && (
                    <StyledTextField
                      label="Pontos bônus"
                      fullWidth
                      type="number"
                      name="bonusPrimeiraCompraValor"
                      value={formData.bonusPrimeiraCompraValor}
                      onChange={handleChange}
                      inputProps={{ min: "1", step: "1" }}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.bonusAniversario} 
                        onChange={handleChange} 
                        name="bonusAniversario" 
                      />
                    }
                    label="Aniversário"
                  />
                  {formData.bonusAniversario && (
                    <StyledTextField
                      label="Pontos bônus"
                      fullWidth
                      type="number"
                      name="bonusAniversarioValor"
                      value={formData.bonusAniversarioValor}
                      onChange={handleChange}
                      inputProps={{ min: "1", step: "1" }}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.bonusIndicacao} 
                        onChange={handleChange} 
                        name="bonusIndicacao" 
                      />
                    }
                    label="Indicação"
                  />
                  {formData.bonusIndicacao && (
                    <StyledTextField
                      label="Pontos bônus"
                      fullWidth
                      type="number"
                      name="bonusIndicacaoValor"
                      value={formData.bonusIndicacaoValor}
                      onChange={handleChange}
                      inputProps={{ min: "1", step: "1" }}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </FormField>
              </Grid>
            </Grid>
            
            <FormField sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.limitePontosPedido} 
                    onChange={handleChange} 
                    name="limitePontosPedido" 
                  />
                }
                label="Limitar pontos por pedido"
              />
              {formData.limitePontosPedido && (
                <StyledTextField
                  label="Número máximo de pontos"
                  fullWidth
                  type="number"
                  name="valorLimitePontos"
                  value={formData.valorLimitePontos}
                  onChange={handleChange}
                  inputProps={{ min: "1", step: "1" }}
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.pontuacaoEmFrete} 
                    onChange={handleChange} 
                    name="pontuacaoEmFrete" 
                  />
                }
                label="Incluir frete no cálculo de pontos"
              />
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.pontuacaoEmImpostos} 
                    onChange={handleChange} 
                    name="pontuacaoEmImpostos" 
                  />
                }
                label="Incluir impostos no cálculo de pontos"
              />
            </FormField>
          </Section>

          {/* Seção: Resgate de Recompensas */}
          <Section ref={recompensasRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RewardIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Resgate de Recompensas</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de recompensa</FormLabel>
                <RadioGroup
                  name="tipoRecompensa"
                  value={formData.tipoRecompensa}
                  onChange={handleChange}
                >
                  <FormControlLabel value="descontoFixo" control={<Radio />} label="Desconto fixo (ex: R$ 10 por 100 pontos)" />
                  <FormControlLabel value="descontoPorcentagem" control={<Radio />} label="Porcentagem de desconto" />
                  <FormControlLabel value="produtoGratis" control={<Radio />} label="Produto grátis" />
                  <FormControlLabel value="freteGratis" control={<Radio />} label="Frete grátis" />
                  <FormControlLabel value="cashback" control={<Radio />} label="Cashback (reutilizável)" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Tabela de recompensas
            </Typography>
            
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pontos necessários</TableCell>
                    <TableCell>Valor da recompensa</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.recompensas.map((recompensa, index) => (
                    <RecompensaRow key={index}>
                      <TableCell>
                        <StyledTextField
                          type="number"
                          value={recompensa.pontos}
                          onChange={(e) => handleRecompensaChange(index, 'pontos', e.target.value)}
                          inputProps={{ min: "1", step: "1" }}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          type="number"
                          value={recompensa.valor}
                          onChange={(e) => handleRecompensaChange(index, 'valor', e.target.value)}
                          inputProps={{ min: "0.01", step: "0.01" }}
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: formData.tipoRecompensa === 'descontoPorcentagem' ? 
                              <InputAdornment position="start">%</InputAdornment> :
                              <InputAdornment position="start">R$</InputAdornment>
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          value={recompensa.descricao}
                          onChange={(e) => handleRecompensaChange(index, 'descricao', e.target.value)}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error" 
                          onClick={() => handleRemoveRecompensa(index)}
                          disabled={formData.recompensas.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </RecompensaRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={handleAddRecompensa}
              sx={{ mb: 3 }}
            >
              Adicionar Recompensa
            </Button>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Pontuação mínima para resgate"
                    fullWidth
                    type="number"
                    name="pontuacaoMinimaResgate"
                    value={formData.pontuacaoMinimaResgate}
                    onChange={handleChange}
                    inputProps={{ min: "1", step: "1" }}
                  />
                </FormField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormField>
                  <StyledTextField
                    label="Validade dos pontos resgatados (dias)"
                    fullWidth
                    type="number"
                    name="validadePontosResgatados"
                    value={formData.validadePontosResgatados}
                    onChange={handleChange}
                    inputProps={{ min: "1", step: "1" }}
                  />
                </FormField>
              </Grid>
            </Grid>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.expiraPontuacao} 
                    onChange={handleChange} 
                    name="expiraPontuacao" 
                  />
                }
                label="Pontuação necessária expira"
              />
              {formData.expiraPontuacao && (
                <StyledTextField
                  label="Dias até expiração"
                  fullWidth
                  type="number"
                  name="diasExpiracao"
                  value={formData.diasExpiracao}
                  onChange={handleChange}
                  inputProps={{ min: "1", step: "1" }}
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.resgateAutomatico} 
                    onChange={handleChange} 
                    name="resgateAutomatico" 
                  />
                }
                label="Permitir resgate automático no checkout"
              />
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
            Salvar Programa de Fidelidade
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
              Programas de fidelidade aumentam a retenção de clientes e incentivam compras recorrentes. Configure de acordo com a estratégia da sua empresa.
            </Typography>
          </Box>
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default ConfigurarPrograma; 