import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditCampaign = () => {
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        type: '',
        status: '',
        rules: [],
        segmentation: {
            userGroups: [],
            products: [],
            channels: []
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchCampaign();
    }, [id]);

    const fetchCampaign = async () => {
        try {
            const response = await fetch(`/api/campaigns/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCampaignData(data);
            } else {
                setError('Erro ao carregar campanha');
            }
        } catch (err) {
            setError('Erro ao carregar campanha');
        } finally {
            setLoading(false);
        }
    };

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
            const response = await fetch(`/api/campaigns/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(campaignData)
            });

            if (response.ok) {
                history.push('/campaigns');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao atualizar campanha');
            }
        } catch (err) {
            setError('Erro ao atualizar campanha. Tente novamente.');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="edit-campaign">
            <h1>Editar Campanha</h1>
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

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={campaignData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="draft">Rascunho</option>
                        <option value="active">Ativa</option>
                        <option value="paused">Pausada</option>
                        <option value="ended">Encerrada</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Salvar Alterações
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

export default EditCampaign; 