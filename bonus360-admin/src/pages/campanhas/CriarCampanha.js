import React, { useState, useEffect, useRef } from 'react';
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
  Stepper,
  Step,
  StepButton,
} from '@mui/material';

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(3),
  maxWidth: 'calc(100% - 280px)', // evita que ultrapasse a largura do stepper
  marginRight: '280px', // espaço reservado para o stepper fixo
}));

const CriarCampanha = () => {
  const [campanha, setCampanha] = useState({
    nome: '', descricao: '', status: '', codigoCupom: '', tipoDesconto: '',
    dataInicio: '', dataFim: '', horaInicio: '', horaFim: '',
    publicoAlvo: '', condicaoDesconto: '', usosPorCliente: '', usosTotais: '',
    frequenciaUso: '', incompativel: false, aplicaEm: '', exclusoes: '',
    freteIncluso: false, aplicaAutomatico: false,
  });

  const steps = [
    { id: 'info-gerais', label: 'Informações Gerais' },
    { id: 'periodo', label: 'Período de Validade' },
    { id: 'segmentacao', label: 'Segmentação e Regras' },
    { id: 'aplicacao', label: 'Aplicação' },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef({});

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

  const scrollToSection = (index) => {
    const id = steps[index].id;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const positions = steps.map(({ id }) => {
        const el = sectionRefs.current[id];
        return { id, top: el.getBoundingClientRect().top };
      });
      const closest = positions.reduce((acc, curr, i) => {
        return Math.abs(curr.top) < Math.abs(acc.top) ? { ...curr, index: i } : acc;
      }, { top: Infinity, index: 0 });
      setActiveSection(closest.index);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps]);

  const SectionBlock = ({ id, title, children }) => (
    <Section id={id} ref={(el) => (sectionRefs.current[id] = el)}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {children}
    </Section>
  );

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Criar Campanha
        </Typography>

        {/* Bloco 1: Informações Gerais */}
        <Box id="info-gerais" ref={(el) => (sectionRefs.current['info-gerais'] = el)}>
          <Section>
            <Typography variant="h6" gutterBottom>Informações Gerais</Typography>
            <StyledInput label="Nome da Campanha" fullWidth name="nome" value={campanha.nome} onChange={handleChange} />
            <StyledInput label="Descrição" fullWidth multiline rows={3} name="descricao" value={campanha.descricao} onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <StyledSelect name="status" value={campanha.status} onChange={handleChange}>
                <MenuItem value="ativa">Ativa</MenuItem>
                <MenuItem value="inativa">Inativa</MenuItem>
                <MenuItem value="agendada">Agendada</MenuItem>
              </StyledSelect>
            </FormControl>
            <StyledInput label="Código do Cupom" fullWidth name="codigoCupom" value={campanha.codigoCupom} onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel>Tipo de Desconto</InputLabel>
              <StyledSelect name="tipoDesconto" value={campanha.tipoDesconto} onChange={handleChange}>
                <MenuItem value="percentual">Percentual (%)</MenuItem>
                <MenuItem value="valor">Valor fixo (R$)</MenuItem>
                <MenuItem value="frete">Frete grátis</MenuItem>
                <MenuItem value="produtoGratis">Produto grátis</MenuItem>
                <MenuItem value="escalonado">Desconto escalonado</MenuItem>
                <MenuItem value="primeiroPedido">Primeiro pedido</MenuItem>
              </StyledSelect>
            </FormControl>
          </Section>
        </Box>

        {/* Blocos seguintes */}
        <form onSubmit={handleSubmit}>
          <SectionBlock id="periodo" title="Período de Validade">
            <StyledInput label="Data de Início" type="date" name="dataInicio" fullWidth value={campanha.dataInicio} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <StyledInput label="Data de Término" type="date" name="dataFim" fullWidth value={campanha.dataFim} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <StyledInput label="Hora de Início" type="time" name="horaInicio" fullWidth value={campanha.horaInicio} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <StyledInput label="Hora de Término" type="time" name="horaFim" fullWidth value={campanha.horaFim} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </SectionBlock>

          <SectionBlock id="segmentacao" title="Segmentação e Regras de Aplicação">
            <FormControl fullWidth>
              <InputLabel>Público Alvo</InputLabel>
              <StyledSelect name="publicoAlvo" value={campanha.publicoAlvo} onChange={handleChange}>
                <MenuItem value="todos">Todos os clientes</MenuItem>
                <MenuItem value="cadastrados">Clientes cadastrados</MenuItem>
                <MenuItem value="grupo">Grupo específico</MenuItem>
                <MenuItem value="fidelidade">Clientes com histórico de pedidos</MenuItem>
              </StyledSelect>
            </FormControl>
            <StyledInput label="Condições para ativar o desconto" fullWidth name="condicaoDesconto" value={campanha.condicaoDesconto} onChange={handleChange} />
            <StyledInput label="Máximo de usos por cliente" fullWidth name="usosPorCliente" value={campanha.usosPorCliente} onChange={handleChange} />
            <StyledInput label="Máximo de usos totais" fullWidth name="usosTotais" value={campanha.usosTotais} onChange={handleChange} />
            <StyledInput label="Frequência de uso (ex: 1x por semana)" fullWidth name="frequenciaUso" value={campanha.frequenciaUso} onChange={handleChange} />
            <FormControlLabel
              control={<Switch checked={campanha.incompativel} onChange={handleChange} name="incompativel" />}
              label="Incompatível com outras promoções"
            />
          </SectionBlock>

          <SectionBlock id="aplicacao" title="Aplicação">
            <StyledInput label="Aplicável a (ex: produtos, categorias)" fullWidth name="aplicaEm" value={campanha.aplicaEm} onChange={handleChange} />
            <StyledInput label="Exclusões (ex: produtos ou métodos de pagamento)" fullWidth name="exclusoes" value={campanha.exclusoes} onChange={handleChange} />
            <FormControlLabel
              control={<Switch checked={campanha.freteIncluso} onChange={handleChange} name="freteIncluso" />}
              label="Frete incluso"
            />
            <FormControlLabel
              control={<Switch checked={campanha.aplicaAutomatico} onChange={handleChange} name="aplicaAutomatico" />}
              label="Aplicar automaticamente"
            />
          </SectionBlock>

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>
            Criar Campanha
          </Button>
        </form>
      </Container>

      {/* Stepper flutuante fixo no lado direito */}
      <Box
        sx={{
          position: 'fixed',
          top: 100,
          right: 32,
          width: 240,
          zIndex: 1300,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Stepper nonLinear activeStep={activeSection} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.id} completed={false}>
                <StepButton onClick={() => scrollToSection(index)}>
                  {step.label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </>
  );
};

export default CriarCampanha;
