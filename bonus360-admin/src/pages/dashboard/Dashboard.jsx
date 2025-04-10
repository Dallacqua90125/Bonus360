import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Métricas Principais</h2>
                    <Link to="/metrics-summary">Ver Resumo</Link>
                </div>
                <div className="dashboard-card">
                    <h2>Desempenho</h2>
                    <Link to="/performance-charts">Ver Gráficos</Link>
                </div>
                <div className="dashboard-card">
                    <h2>Relatórios</h2>
                    <Link to="/general-reports">Ver Relatórios</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 