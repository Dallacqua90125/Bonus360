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
import { 
  Share as ShareIcon, 
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  AddPhotoAlternate as ImageIcon,
  Link as LinkIcon,
  QrCode as QrCodeIcon,
  VerifiedUser as VerifiedUserIcon,
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

function ConfigurarProgramasIndicacao() {
  // Refs para as seções
  const detalhesRef = useRef(null);
  const quemIndicaRef = useRef(null);
  const quemEIndicadoRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);

  const [formData, setFormData] = useState({
    // Detalhes do Programa
    nome: '',
    descricao: '',
    imagem: null,
    status: 'ativo',
    canais: {
      online: true,
      app: false,
      loja: false,
    },
    slugUrl: '',
    
    // Quem Pode Indicar
    tipoUsuarioIndicador: 'cadastrados',
    metodoIdentificacao: 'link',
    gerarQrCode: false,
    limiteConvites: '',
    permitirReutilizacao: true,
    
    // Quem é Indicado
    quemPodeSerIndicado: 'novos',
    valorMinimoPedido: '',
    validacaoObrigatoria: 'email',
  });

  const [errors, setErrors] = useState({});

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Detalhes do Programa', ref: detalhesRef, icon: <ShareIcon /> },
    { title: 'Quem Pode Indicar', ref: quemIndicaRef, icon: <PersonIcon /> },
    { title: 'Quem é Indicado', ref: quemEIndicadoRef, icon: <PersonAddIcon /> }
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

  const handleGenerateSlug = () => {
    const slugText = formData.nome
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setFormData(prev => ({
      ...prev,
      slugUrl: slugText
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    
    // Validação básica
    if (!formData.nome) tempErrors.nome = "Nome é obrigatório";
    if (!formData.descricao) tempErrors.descricao = "Descrição é obrigatória";
    if (!formData.slugUrl) tempErrors.slugUrl = "URL do programa é obrigatória";
    
    // Validação de quem pode indicar
    if (formData.limiteConvites && formData.limiteConvites <= 0) {
      tempErrors.limiteConvites = "Limite deve ser maior que zero";
    }
    
    // Validação de quem é indicado
    if (formData.quemPodeSerIndicado === 'valor' && (!formData.valorMinimoPedido || formData.valorMinimoPedido <= 0)) {
      tempErrors.valorMinimoPedido = "Valor mínimo deve ser maior que zero";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    console.log('Configurando programa de indicação com os dados:', formData);
    alert('Programa de indicação configurado com sucesso!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Configurar Programa de Indicação
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <MainContent>
          {/* Seção: Detalhes do Programa */}
          <Section ref={detalhesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShareIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Detalhes do Programa</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <StyledTextField 
                label="Nome do programa"
                placeholder="Ex: Indique Amigos e Ganhe"
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
                placeholder="Ex: Indique seus amigos e ganhe descontos exclusivos!"
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
                Imagem ou banner promocional
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
                        alt="Banner do Programa" 
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
            
            <FormField>
              <Typography variant="subtitle2" gutterBottom>
                Canais disponíveis
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.canais.online} 
                    onChange={() => handleCanalChange('online')} 
                    color="primary"
                  />
                }
                label="Online (site)"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.canais.app} 
                    onChange={() => handleCanalChange('app')} 
                    color="primary"
                  />
                }
                label="Aplicativo móvel"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.canais.loja} 
                    onChange={() => handleCanalChange('loja')} 
                    color="primary"
                  />
                }
                label="Loja física"
              />
            </FormField>
            
            <FormField>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <StyledTextField
                  label="Slug / URL do programa"
                  placeholder="Ex: indique-e-ganhe"
                  fullWidth
                  name="slugUrl"
                  value={formData.slugUrl}
                  onChange={handleChange}
                  error={!!errors.slugUrl}
                  helperText={errors.slugUrl || "Usado para criar o link de indicação: loja.com/indique/[slug]"}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleGenerateSlug}
                  sx={{ mt: 1 }}
                >
                  Gerar
                </Button>
              </Box>
            </FormField>
          </Section>

          {/* Seção: Quem Pode Indicar */}
          <Section ref={quemIndicaRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Quem Pode Indicar</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de usuário que pode indicar</FormLabel>
                <RadioGroup
                  name="tipoUsuarioIndicador"
                  value={formData.tipoUsuarioIndicador}
                  onChange={handleChange}
                >
                  <FormControlLabel value="todos" control={<Radio />} label="Todos os clientes" />
                  <FormControlLabel value="cadastrados" control={<Radio />} label="Apenas clientes cadastrados" />
                  <FormControlLabel value="grupos" control={<Radio />} label="Grupos específicos (ex: VIP, atacado)" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Método de identificação</FormLabel>
                <RadioGroup
                  name="metodoIdentificacao"
                  value={formData.metodoIdentificacao}
                  onChange={handleChange}
                >
                  <FormControlLabel value="link" control={<Radio />} label="Link único" />
                  <FormControlLabel value="codigo" control={<Radio />} label="Código de indicação" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.gerarQrCode} 
                    onChange={handleChange} 
                    name="gerarQrCode" 
                  />
                }
                label="Gerar QR Code para compartilhamento (opcional)"
              />
            </FormField>
            
            <FormField>
              <StyledTextField
                label="Limite de convites por pessoa"
                placeholder="Deixe em branco para ilimitado"
                fullWidth
                type="number"
                name="limiteConvites"
                value={formData.limiteConvites}
                onChange={handleChange}
                error={!!errors.limiteConvites}
                helperText={errors.limiteConvites}
                InputProps={{
                  inputProps: { min: "1" },
                }}
              />
            </FormField>
            
            <FormField>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.permitirReutilizacao} 
                    onChange={handleChange} 
                    name="permitirReutilizacao" 
                  />
                }
                label="Permitir reutilização do mesmo link/código"
              />
            </FormField>
          </Section>

          {/* Seção: Quem é Indicado */}
          <Section ref={quemEIndicadoRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonAddIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Quem é Indicado</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Quem pode ser indicado?</FormLabel>
                <RadioGroup
                  name="quemPodeSerIndicado"
                  value={formData.quemPodeSerIndicado}
                  onChange={handleChange}
                >
                  <FormControlLabel value="novos" control={<Radio />} label="Novos clientes (sem conta)" />
                  <FormControlLabel value="pedidos" control={<Radio />} label="Novos pedidos" />
                  <FormControlLabel value="valor" control={<Radio />} label="Clientes com pedido mínimo de R$" />
                </RadioGroup>
              </FormControl>
            </FormField>
            
            {formData.quemPodeSerIndicado === 'valor' && (
              <FormField>
                <StyledTextField
                  label="Valor mínimo do pedido (R$)"
                  fullWidth
                  type="number"
                  name="valorMinimoPedido"
                  value={formData.valorMinimoPedido}
                  onChange={handleChange}
                  error={!!errors.valorMinimoPedido}
                  helperText={errors.valorMinimoPedido}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    inputProps: { min: "0.01", step: "0.01" },
                  }}
                />
              </FormField>
            )}
            
            <FormField>
              <FormControl component="fieldset">
                <FormLabel component="legend">Validação obrigatória?</FormLabel>
                <RadioGroup
                  name="validacaoObrigatoria"
                  value={formData.validacaoObrigatoria}
                  onChange={handleChange}
                >
                  <FormControlLabel value="email" control={<Radio />} label="Confirmação de e-mail" />
                  <FormControlLabel value="compra" control={<Radio />} label="Primeira compra finalizada" />
                  <FormControlLabel value="valorminimo" control={<Radio />} label="Pedido acima de valor mínimo" />
                </RadioGroup>
              </FormControl>
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
            Salvar Programa de Indicação
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
              Programas de indicação são uma forma eficiente de adquirir novos clientes e fidelizar os atuais. Configure o programa de acordo com a estratégia de sua empresa.
            </Typography>
          </Box>
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default ConfigurarProgramasIndicacao; 