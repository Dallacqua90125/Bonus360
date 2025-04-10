import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateCampaign = () => {
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'discount', // discount, points, gift_card
        status: 'draft',
        rules: [],
        segmentation: {
            userGroups: [],
            products: [],
            channels: []
        }
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(campaignData)
            });

            if (response.ok) {
                const data = await response.json();
                history.push(`/campaigns/edit/${data.id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao criar campanha');
            }
        } catch (err) {
            setError('Erro ao criar campanha. Tente novamente.');
        }
    };

    return (
        <div className="create-campaign">
            <h1>Criar Nova Campanha</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="campaign-form">
                <div className="form-group">
                    <label htmlFor="name">Nome da Campanha</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={campaignData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={campaignData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">Data de Início</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={campaignData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">Data de Término</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={campaignData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipo de Campanha</label>
                    <select
                        id="type"
                        name="type"
                        value={campaignData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="discount">Desconto</option>
                        <option value="points">Pontos</option>
                        <option value="gift_card">Gift Card</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Criar Campanha
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => history.push('/campaigns')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCampaign; 