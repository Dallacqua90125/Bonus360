import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaignPage from './pages/CreateCampaignPage';
import NotFound from './pages/NotFound';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/campaigns" component={Campaigns} />
          <Route path="/create-campaign" component={CreateCampaignPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;