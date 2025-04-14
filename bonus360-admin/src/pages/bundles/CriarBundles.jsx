import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  InputBase,
  Button,
  styled,
  Divider,
  FormControlLabel,
  Switch,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';

// Componentes estilizados
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  maxWidth: '1200px',
  margin: '0 auto',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '10px 12px',
  fontSize: '14px',
  width: '100%',
  marginTop: '8px',
  marginBottom: '16px',
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: '#bdbdbd',
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
  },
}));

const StepSidebar = styled(Box)(({ theme }) => ({
  width: '280px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: theme.spacing(2),
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
}));

const StepCard = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

// Componente estilizado para o DatePicker
const StyledDatePickerWrapper = styled(Box)(({ theme }) => ({
  '& .MuiInputBase-root': {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '10px 12px',
    width: '100%',
    transition: 'all 0.3s',
    '&:hover': {
      borderColor: '#bdbdbd',
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '14px',
  },
  marginBottom: theme.spacing(2),
}));

function CriarBundles() {
  // Refs para as seções
  const detalhesRef = useRef(null);
  const precificacaoRef = useRef(null);
  const validadeRef = useRef(null);
  
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = useState(0);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    produtos: '',
    preco: '',
    desconto: '',
    mostrarEconomia: true,
    destaque: false,
    limitarQuantidade: false,
    quantidadeMaxima: '',
    dataInicio: null,
    dataFim: null,
    status: 'ativo'
  });

  // Configuração das etapas de navegação
  const steps = [
    { title: 'Detalhes do Bundle', ref: detalhesRef, icon: <ShoppingBasketIcon sx={{ fontSize: 16, color: 'inherit' }} /> },
    { title: 'Precificação', ref: precificacaoRef, icon: <AttachMoneyIcon sx={{ fontSize: 16, color: 'inherit' }} /> },
    { title: 'Período de Validade', ref: validadeRef, icon: <EventIcon sx={{ fontSize: 16, color: 'inherit' }} /> }
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
  };

  const handleDateChange = (name, newValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Processar produtos (separados por vírgula)
    const productList = formData.produtos.split(',').map(p => p.trim()).filter(p => p);

    // Lógica de criação (simulada)
    console.log('Criando Bundle com os dados:', {
        ...formData,
        produtos: productList,
        preco: Number(formData.preco),
        desconto: Number(formData.desconto),
        dataInicio: formData.dataInicio ? formData.dataInicio.toISOString().split('T')[0] : null,
        dataFim: formData.dataFim ? formData.dataFim.toISOString().split('T')[0] : null,
    });

    // Limpar formulário após sucesso (simulado)
    alert('Bundle criado com sucesso!');
  };

  // Calcular valor final com desconto
  const calculateFinalPrice = () => {
    if (formData.preco && formData.desconto) {
      const price = parseFloat(formData.preco);
      const discount = parseFloat(formData.desconto);
      if (!isNaN(price) && !isNaN(discount)) {
        return (price - (price * discount / 100)).toFixed(2);
      }
    }
    return "";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 'bold', 
        color: '#333',
        mb: 3
      }}>
        Criar Bundle
      </Typography>
      
      <PageContainer component="form" onSubmit={handleSubmit}>
        <FormContainer>
          {/* Seção de Detalhes do Bundle */}
          <Section ref={detalhesRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShoppingBasketIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Detalhes do Bundle
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Nome do Bundle
            </Typography>
            <StyledInput
              placeholder="Ex: Kit Promocional Verão"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Descrição
            </Typography>
            <StyledInput
              placeholder="Descreva o bundle e seus benefícios"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Produtos Incluídos
            </Typography>
            <StyledInput
              placeholder="Insira os produtos separados por vírgula"
              name="produtos"
              value={formData.produtos}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            <Typography variant="caption" color="textSecondary">
              Ex: Produto A, Produto B, Produto C
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.destaque} 
                    onChange={handleChange} 
                    name="destaque" 
                    color="primary"
                  />
                }
                label="Destacar este bundle na loja"
              />
            </Box>
          </Section>
          
          {/* Seção de Precificação */}
          <Section ref={precificacaoRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Precificação
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: 'calc(50% - 8px)' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Preço do Bundle
                </Typography>
                <StyledInput
                  placeholder="R$"
                  name="preco"
                  type="number"
                  value={formData.preco}
                  onChange={handleChange}
                  inputProps={{ 
                    step: "0.01",
                    min: "0.01"
                  }}
                  required
                />
              </Box>
              
              <Box sx={{ width: 'calc(50% - 8px)' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Desconto (%)
                </Typography>
                <StyledInput
                  placeholder="%"
                  name="desconto"
                  type="number"
                  value={formData.desconto}
                  onChange={handleChange}
                  inputProps={{ 
                    step: "0.1",
                    min: "0",
                    max: "100"
                  }}
                  required
                />
              </Box>
            </Box>
            
            {formData.preco && formData.desconto && (
              <Box sx={{ 
                mt: 2, 
                mb: 3, 
                p: 2, 
                bgcolor: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: '8px',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  Valor final com desconto: R$ {calculateFinalPrice()}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={formData.mostrarEconomia} 
                    onChange={handleChange} 
                    name="mostrarEconomia" 
                    color="primary"
                  />
                }
                label="Mostrar o valor economizado na loja"
              />
              
              <Box sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.limitarQuantidade} 
                      onChange={handleChange} 
                      name="limitarQuantidade" 
                      color="primary"
                    />
                  }
                  label="Limitar quantidade por cliente"
                />
                
                {formData.limitarQuantidade && (
                  <Box sx={{ ml: 4, mt: 1, width: '40%' }}>
                    <StyledInput
                      placeholder="Quantidade máxima"
                      name="quantidadeMaxima"
                      type="number"
                      value={formData.quantidadeMaxima}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                      required={formData.limitarQuantidade}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Section>
          
          {/* Seção de Período de Validade */}
          <Section ref={validadeRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Período de Validade
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ width: 'calc(50% - 8px)' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Data de Início
                </Typography>
                <StyledDatePickerWrapper>
                  <DatePicker
                    value={formData.dataInicio}
                    onChange={(newValue) => handleDateChange('dataInicio', newValue)}
                    slotProps={{
                      textField: {
                        placeholder: 'Selecione a data',
                        variant: 'standard',
                        InputProps: {
                          disableUnderline: true
                        }
                      }
                    }}
                    required
                  />
                </StyledDatePickerWrapper>
              </Box>
              
              <Box sx={{ width: 'calc(50% - 8px)' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Data de Fim (Opcional)
                </Typography>
                <StyledDatePickerWrapper>
                  <DatePicker
                    value={formData.dataFim}
                    onChange={(newValue) => handleDateChange('dataFim', newValue)}
                    minDate={formData.dataInicio || undefined}
                    slotProps={{
                      textField: {
                        placeholder: 'Selecione a data',
                        variant: 'standard',
                        InputProps: {
                          disableUnderline: true
                        }
                      }
                    }}
                  />
                </StyledDatePickerWrapper>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Status do Bundle
              </Typography>
              <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button
                variant={formData.status === 'ativo' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setFormData(prev => ({ ...prev, status: 'ativo' }))}
                sx={{ borderRadius: '16px' }}
              >
                Ativo
              </Button>
              <Button
                variant={formData.status === 'inativo' ? 'contained' : 'outlined'}
                size="small"
                color="secondary"
                onClick={() => setFormData(prev => ({ ...prev, status: 'inativo' }))}
                sx={{ borderRadius: '16px' }}
              >
                Inativo
              </Button>
              <Button
                variant={formData.status === 'rascunho' ? 'contained' : 'outlined'}
                size="small"
                color="info"
                onClick={() => setFormData(prev => ({ ...prev, status: 'rascunho' }))}
                sx={{ borderRadius: '16px' }}
              >
                Rascunho
              </Button>
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
            CRIAR BUNDLE
          </Button>
        </FormContainer>
        
        {/* Barra lateral com etapas */}
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
              <ShoppingBasketIcon sx={{ fontSize: 16, mr: 1, mt: 0.5 }} color="action" />
              Combine produtos complementares em bundles para aumentar o valor médio do pedido. Use descontos atrativos para incentivar a compra conjunta.
            </Typography>
          </Box>
        </StepSidebar>
      </PageContainer>
    </Box>
  );
}

export default CriarBundles; 