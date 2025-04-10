import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            // Aqui será implementada a chamada à API para buscar as campanhas
            const response = await fetch('/api/campaigns', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCampaigns(data);
            } else {
                setError('Erro ao carregar campanhas');
            }
        } catch (err) {
            setError('Erro ao carregar campanhas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="campaigns">
            <div className="campaigns-header">
                <h1>Campanhas</h1>
                <Link to="/campaigns/create" className="create-btn">
                    Criar Nova Campanha
                </Link>
            </div>

            <div className="campaigns-grid">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="campaign-card">
                        <h3>{campaign.name}</h3>
                        <p>{campaign.description}</p>
                        <div className="campaign-details">
                            <span>Início: {new Date(campaign.startDate).toLocaleDateString()}</span>
                            <span>Fim: {new Date(campaign.endDate).toLocaleDateString()}</span>
                            <span>Status: {campaign.status}</span>
                        </div>
                        <div className="campaign-actions">
                            <Link to={`/campaigns/edit/${campaign.id}`} className="edit-btn">
                                Editar
                            </Link>
                            <Link to={`/campaigns/rules/${campaign.id}`} className="rules-btn">
                                Regras
                            </Link>
                            <Link to={`/campaigns/segmentation/${campaign.id}`} className="segmentation-btn">
                                Segmentação
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Campaigns; 