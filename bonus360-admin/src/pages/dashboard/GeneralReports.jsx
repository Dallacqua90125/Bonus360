import React from 'react';

const GeneralReports = () => {
    return (
        <div className="general-reports">
            <h1>Relatórios Gerais</h1>
            <div className="reports-grid">
                <div className="report-card">
                    <h3>Relatório de Campanhas</h3>
                    <p>Análise detalhada do desempenho das campanhas</p>
                    <button className="download-btn">Download PDF</button>
                </div>
                <div className="report-card">
                    <h3>Relatório de Cupons</h3>
                    <p>Estatísticas de geração e uso de cupons</p>
                    <button className="download-btn">Download PDF</button>
                </div>
                <div className="report-card">
                    <h3>Relatório de Gift Cards</h3>
                    <p>Análise de distribuição e uso de gift cards</p>
                    <button className="download-btn">Download PDF</button>
                </div>
                <div className="report-card">
                    <h3>Relatório de Usuários</h3>
                    <p>Métricas de engajamento e comportamento</p>
                    <button className="download-btn">Download PDF</button>
                </div>
                <div className="report-card">
                    <h3>Relatório Financeiro</h3>
                    <p>Análise de receita e custos</p>
                    <button className="download-btn">Download PDF</button>
                </div>
                <div className="report-card">
                    <h3>Relatório de Performance</h3>
                    <p>Métricas gerais de desempenho</p>
                    <button className="download-btn">Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default GeneralReports; 