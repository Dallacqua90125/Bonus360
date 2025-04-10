import React from 'react';

const MetricsSummary = () => {
    return (
        <div className="metrics-summary">
            <h1>Resumo das Métricas</h1>
            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Campanhas Ativas</h3>
                    <p className="metric-value">12</p>
                </div>
                <div className="metric-card">
                    <h3>Cupons Gerados</h3>
                    <p className="metric-value">1,234</p>
                </div>
                <div className="metric-card">
                    <h3>Gift Cards Ativos</h3>
                    <p className="metric-value">567</p>
                </div>
                <div className="metric-card">
                    <h3>Usuários Ativos</h3>
                    <p className="metric-value">890</p>
                </div>
                <div className="metric-card">
                    <h3>Taxa de Conversão</h3>
                    <p className="metric-value">15.7%</p>
                </div>
                <div className="metric-card">
                    <h3>Receita Total</h3>
                    <p className="metric-value">R$ 45,678</p>
                </div>
            </div>
        </div>
    );
};

export default MetricsSummary; 