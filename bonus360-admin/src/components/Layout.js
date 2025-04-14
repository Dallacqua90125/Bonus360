import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';

// Importação da logo
import timewareLogo from '../assets/Logo-Bonus.png'; // Usando a mesma logo da tela de login

// Importação das páginas
import Dashboard from '../pages/Dashboard';
import CriarCampanha from '../pages/campanhas/CriarCampanha';
import ListarCampanhas from '../pages/campanhas/ListarCampanhas';
import GerarCupons from '../pages/cupons/GerarCupons';
import GerenciarCupons from '../pages/cupons/GerenciarCupons';
import CriarGiftCards from '../pages/gift-cards/CriarGiftCards';
import ConsultarGiftCards from '../pages/gift-cards/ConsultarGiftCards';
import CriarBundles from '../pages/bundles/CriarBundles';
import GerenciarBundles from '../pages/bundles/GerenciarBundles';
import ConfigurarPrograma from '../pages/fidelidade/ConfigurarPrograma';
import VisualizarMetricas from '../pages/fidelidade/VisualizarMetricas';
import ConfigurarProgramasIndicacao from '../pages/indicacao/ConfigurarProgramasIndicacao';
import MonitorarIndicacoes from '../pages/indicacao/MonitorarIndicacoes';
import GerenciarCarteiras from '../pages/carteiras/GerenciarCarteiras';
import ResgatesRecargas from '../pages/carteiras/ResgatesRecargas';
import ConfigurarMecanicas from '../pages/gamificacao/ConfigurarMecanicas';
import VisualizarLeaderboards from '../pages/gamificacao/VisualizarLeaderboards';
import Profile from '../pages/Profile';

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
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const { user, logout } = useAuth();
  const [lastExpanded, setLastExpanded] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
    // Se estiver abrindo o drawer e tem um submenu expandido anteriormente
    if (!open && lastExpanded) {
      setExpandedItems({ [lastExpanded]: true });
    }
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setExpandedItems({});
    setLastExpanded(null);
  };

  const handleSubmenuToggle = (title) => {
    // Se o drawer estiver fechado, abra-o primeiro
    if (!open) {
      setOpen(true);
    }
    
    const isCurrentlyExpanded = expandedItems[title];
    const newExpandedItems = { ...expandedItems, [title]: !isCurrentlyExpanded };
    
    // Fecha todos os outros submenus
    Object.keys(menuItems).forEach((key) => {
      if (menuItems[key].title !== title) {
        newExpandedItems[menuItems[key].title] = false;
      }
    });
    
    setExpandedItems(newExpandedItems);
    
    // Se estiver abrindo, salva como último expandido
    if (!isCurrentlyExpanded) {
      setLastExpanded(title);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>

      {/* AppBar com gap dos dois lados */}
      <Box sx={{ width: '100%', px: '10px', position: 'fixed', top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AppBar position="static" sx={{
          boxShadow: 'none',
          borderBottom: '1px solid #D3D3D3',
          borderRadius: '5px',
          backgroundColor: '#FFFFFF',
        }}>
          <Toolbar sx={{ minHeight: '48px' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2, color: '#000000' }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <img
                src={timewareLogo}
                alt="Bonus360 Logo"
                style={{ height: '30px', marginRight: '10px' }}
              />
            </Box>
            <IconButton color="inherit" onClick={logout} sx={{ ml: 1, color: '#000000' }}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : theme => theme.spacing(7),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : theme => theme.spacing(7),
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#000000',
            borderRight: '1px solid #e0e0e0',
            overflowX: 'hidden',
            transition: theme => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginTop: 0,
            padding: 0,
            boxShadow: 'none',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box sx={{ overflow: 'auto', marginTop: "60px" }}>
            <List sx={{ marginLeft: 0 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <React.Fragment key={item.title}>
                    <ListItem
                      button
                      onClick={() => item.path ? handleMenuItemClick(item.path) : handleSubmenuToggle(item.title)}
                      sx={{
                        paddingY: 1,
                        borderRadius: '8px',
                        backgroundColor: item.title === 'Dashboard' ? '#000000' : 'inherit',
                        color: item.title === 'Dashboard' ? '#FFFFFF' : 'inherit',
                        '&:hover': {
                          backgroundColor: item.title === 'Dashboard' ? '#000000' : '#D3D3D3',
                          color: item.title === 'Dashboard' ? '#FFFFFF' : '#000000',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        },
                        borderLeft: 'none',
                        width: '80%',
                        margin: '0 auto',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: item.title === 'Dashboard' ? '#FFFFFF' : '#000000',
                          minWidth: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{
                            sx: {
                              color: item.title === 'Dashboard' ? '#FFFFFF' : '#000000',
                              fontSize: '1rem',
                              padding: '0 5px',
                            },
                          }}
                        />
                      )}
                      {item.children && open && (expandedItems[item.title] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItem>

                    {item.children && (
                      <Collapse in={expandedItems[item.title]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.children.map((child) => {
                            const isChildActive = location.pathname === child.path;
                            return (
                              <ListItem
                                button
                                onClick={() => handleMenuItemClick(child.path)}
                                key={child.title}
                                sx={{
                                  paddingY: 1,
                                  borderRadius: '8px',
                                  backgroundColor: location.pathname === child.path ? '#808080' : 'inherit',
                                  color: location.pathname === child.path ? '#000000' : 'inherit',
                                  '&:hover': {
                                    backgroundColor: '#D3D3D3',
                                    color: '#000000',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                  },
                                  borderRadius: '8px',
                                  pl: 0,
                                  width: '70%',
                                  margin: '0 auto',
                                  mb: 1,
                                  cursor: 'pointer',
                                }}
                              >
                                <ListItemIcon sx={{ color: '#000000', minWidth: '40px' }}>
                                  {/* opcionalmente adicione ícones aqui */}
                                </ListItemIcon>
                                <ListItemText primary={child.title} sx={{ fontSize: '0.75rem' }} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>

          {/* Footer com avatar e ajuda */}
          <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center' }} onClick={handleProfileClick}>
              <Avatar sx={{
                width: 32,
                height: 32,
                mb: 1,
                bgcolor: '#000000',
                color: '#FFFFFF',
                borderRadius: '8px',
              }}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              {open && <Typography variant="body2" sx={{ ml: 1 }}>Usuário Teste</Typography>}
            </Box>
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
        <Toolbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campanhas/criar" element={<CriarCampanha />} />
          <Route path="/campanhas/listar" element={<ListarCampanhas />} />
          <Route path="/cupons/gerar" element={<GerarCupons />} />
          <Route path="/cupons/gerenciar" element={<GerenciarCupons />} />
          <Route path="/gift-cards/criar" element={<CriarGiftCards />} />
          <Route path="/gift-cards/consultar" element={<ConsultarGiftCards />} />
          <Route path="/bundles/criar" element={<CriarBundles />} />
          <Route path="/bundles/gerenciar" element={<GerenciarBundles />} />
          <Route path="/fidelidade/configurar" element={<ConfigurarPrograma />} />
          <Route path="/fidelidade/metricas" element={<VisualizarMetricas />} />
          <Route path="/indicacao/configurar" element={<ConfigurarProgramasIndicacao />} />
          <Route path="/indicacao/monitorar" element={<MonitorarIndicacoes />} />
          <Route path="/carteiras/gerenciar" element={<GerenciarCarteiras />} />
          <Route path="/carteiras/operacoes" element={<ResgatesRecargas />} />
          <Route path="/gamificacao/configurar" element={<ConfigurarMecanicas />} />
          <Route path="/gamificacao/leaderboards" element={<VisualizarLeaderboards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Typography>Página não encontrada</Typography>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Layout;
