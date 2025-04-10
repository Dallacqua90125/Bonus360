import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Campaign,
  CardGiftcard,
  LocalOffer,
  Inventory,
  Loyalty,
  Share,
  AccountBalanceWallet,
  EmojiEvents,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from '@mui/icons-material';

// Importação da logo
import timewareLogo from '../assets/Logo-timeware.png'; // Usando a mesma logo da tela de login

// Importação das páginas
import Dashboard from '../pages/Dashboard';
import CriarCampanha from '../pages/campanhas/CriarCampanha';
import ListarCampanhas from '../pages/campanhas/ListarCampanhas';
import GerarCupons from '../pages/cupons/GerarCupons';
import GerenciarCupons from '../pages/cupons/GerenciarCupons';
// Importações das novas páginas de Gift Card
import CriarGiftCards from '../pages/gift-cards/CriarGiftCards';
import ConsultarGiftCards from '../pages/gift-cards/ConsultarGiftCards';
// Importações das novas páginas de Bundles
import CriarBundles from '../pages/bundles/CriarBundles';
import GerenciarBundles from '../pages/bundles/GerenciarBundles';
// Importações das novas páginas de Fidelidade
import ConfigurarPrograma from '../pages/fidelidade/ConfigurarPrograma';
import VisualizarMetricas from '../pages/fidelidade/VisualizarMetricas';
// Importações das novas páginas de Indicação
import ConfigurarProgramasIndicacao from '../pages/indicacao/ConfigurarProgramasIndicacao';
import MonitorarIndicacoes from '../pages/indicacao/MonitorarIndicacoes';
// Importações das novas páginas de Carteiras
import GerenciarCarteiras from '../pages/carteiras/GerenciarCarteiras';
import ResgatesRecargas from '../pages/carteiras/ResgatesRecargas';
// Importações das novas páginas de Gamificação
import ConfigurarMecanicas from '../pages/gamificacao/ConfigurarMecanicas';
import VisualizarLeaderboards from '../pages/gamificacao/VisualizarLeaderboards';
// Importação da nova página de Perfil
import Profile from '../pages/Profile';
// ... outras importações de páginas

const drawerWidth = 280;

const menuItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    title: 'Campanhas',
    icon: <Campaign />,
    children: [
      { title: 'Criar Campanhas', path: '/campanhas/criar' },
      { title: 'Listar/Editar Campanhas', path: '/campanhas/listar' },
    ],
  },
  {
    title: 'Cupons',
    icon: <LocalOffer />,
    children: [
      { title: 'Gerar Cupons', path: '/cupons/gerar' },
      { title: 'Gerenciar Cupons', path: '/cupons/gerenciar' },
    ],
  },
  {
    title: 'Gift Cards',
    icon: <CardGiftcard />,
    children: [
      { title: 'Gerar Gift Cards', path: '/gift-cards/criar' },
      { title: 'Gerenciar Gift Cards', path: '/gift-cards/consultar' },
    ],
  },
  {
    title: 'Product Bundling',
    icon: <Inventory />,
    children: [
      { title: 'Criar Bundles', path: '/bundles/criar' },
      { title: 'Gerenciar Bundles', path: '/bundles/gerenciar' },
    ],
  },
  {
    title: 'Programas de Fidelidade',
    icon: <Loyalty />,
    children: [
      { title: 'Configurar Programa', path: '/fidelidade/configurar' },
      { title: 'Visualizar Métricas', path: '/fidelidade/metricas' },
    ],
  },
  {
    title: 'Programas de Indicação',
    icon: <Share />,
    children: [
      { title: 'Configurar Programas', path: '/indicacao/configurar' },
      { title: 'Monitorar Indicações', path: '/indicacao/monitorar' },
    ],
  },
  {
    title: 'Carteiras Digitais',
    icon: <AccountBalanceWallet />,
    children: [
      { title: 'Resgates e Recargas', path: '/carteiras/operacoes' },
      { title: 'Gerenciar Carteiras', path: '/carteiras/gerenciar' },
    ],
  },
  {
    title: 'Gamificação',
    icon: <EmojiEvents />,
    children: [
      { title: 'Configurar Mecânicas', path: '/gamificacao/configurar' },
      { title: 'Visualizar Leaderboards', path: '/gamificacao/leaderboards' },
    ],
  },
];

function Layout() {
  const [open, setOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleSubmenuToggle = (title) => {
    setExpandedItems({
      ...expandedItems,
      [title]: !expandedItems[title],
    });
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Função para navegar para o perfil
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img
              src={timewareLogo}
              alt="Bonus360 Logo"
              style={{
                height: '30px',
                marginRight: '10px'
              }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Bonus360
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={handleProfileClick}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
          </Box>
          <IconButton color="inherit" onClick={logout} sx={{ ml: 1 }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...(open ? {} : { width: theme => theme.spacing(7) }),
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.title}>
                <ListItem
                  button
                  onClick={() =>
                    item.children
                      ? handleSubmenuToggle(item.title)
                      : handleMenuItemClick(item.path)
                  }
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.children && (
                    expandedItems[item.title] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItem>
                {item.children && (
                  <Collapse in={expandedItems[item.title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItem
                          button
                          key={child.title}
                          sx={{ pl: 4 }}
                          onClick={() => handleMenuItemClick(child.path)}
                        >
                          <ListItemText primary={child.title} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campanhas/criar" element={<CriarCampanha />} />
          <Route path="/campanhas/listar" element={<ListarCampanhas />} />
          <Route path="/cupons/gerar" element={<GerarCupons />} />
          <Route path="/cupons/gerenciar" element={<GerenciarCupons />} />
          {/* Novas rotas para Gift Cards */}
          <Route path="/gift-cards/criar" element={<CriarGiftCards />} />
          <Route path="/gift-cards/consultar" element={<ConsultarGiftCards />} />
          {/* Novas rotas para Bundles */}
          <Route path="/bundles/criar" element={<CriarBundles />} />
          <Route path="/bundles/gerenciar" element={<GerenciarBundles />} />
          {/* Novas rotas para Fidelidade */}
          <Route path="/fidelidade/configurar" element={<ConfigurarPrograma />} />
          <Route path="/fidelidade/metricas" element={<VisualizarMetricas />} />
          {/* Novas rotas para Indicação */}
          <Route path="/indicacao/configurar" element={<ConfigurarProgramasIndicacao />} />
          <Route path="/indicacao/monitorar" element={<MonitorarIndicacoes />} />
          {/* Novas rotas para Carteiras */}
          <Route path="/carteiras/gerenciar" element={<GerenciarCarteiras />} />
          <Route path="/carteiras/operacoes" element={<ResgatesRecargas />} />
          {/* Novas rotas para Gamificação */}
          <Route path="/gamificacao/configurar" element={<ConfigurarMecanicas />} />
          <Route path="/gamificacao/leaderboards" element={<VisualizarLeaderboards />} />
          {/* Nova rota para Perfil */}
          <Route path="/profile" element={<Profile />} />
          {/* Adicione as outras rotas aqui (se houver mais) */}
          <Route path="*" element={<Typography>Página não encontrada</Typography>} /> {/* Rota Catch-all */}
        </Routes>
      </Box>
    </Box>
  );
}

export default Layout; 