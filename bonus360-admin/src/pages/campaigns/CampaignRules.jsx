import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const CampaignRules = () => {
    const [rules, setRules] = useState({
        minimumPurchase: 0,
        maximumDiscount: 0,
        productRestrictions: [],
        userRestrictions: [],
        timeRestrictions: {
            startTime: '',
            endTime: '',
            daysOfWeek: []
        },
        usageLimits: {
            perUser: 0,
            global: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchRules();
    }, [id]);

    const fetchRules = async () => {
        try {
            const response = await fetch(`/api/campaigns/${id}/rules`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRules(data);
            } else {
                setError('Erro ao carregar regras');
            }
        } catch (err) {
            setError('Erro ao carregar regras');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setRules(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setRules(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/campaigns/${id}/rules`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(rules)
            });

            if (response.ok) {
                history.push(`/campaigns/edit/${id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao atualizar regras');
            }
        } catch (err) {
            setError('Erro ao atualizar regras. Tente novamente.');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="campaign-rules">
            <h1>Configuração de Regras e Limites</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="rules-form">
                <div className="form-section">
                    <h2>Restrições de Compra</h2>
                    <div className="form-group">
                        <label htmlFor="minimumPurchase">Valor Mínimo de Compra (R$)</label>
                        <input
                            type="number"
                            id="minimumPurchase"
                            name="minimumPurchase"
                            value={rules.minimumPurchase}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maximumDiscount">Desconto Máximo (%)</label>
                        <input
                            type="number"
                            id="maximumDiscount"
                            name="maximumDiscount"
                            value={rules.maximumDiscount}
                            onChange={handleChange}
                            min="0"
                            max="100"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Limites de Uso</h2>
                    <div className="form-group">
                        <label htmlFor="usageLimits.perUser">Limite por Usuário</label>
                        <input
                            type="number"
                            id="usageLimits.perUser"
                            name="usageLimits.perUser"
                            value={rules.usageLimits.perUser}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usageLimits.global">Limite Global</label>
                        <input
                            type="number"
                            id="usageLimits.global"
                            name="usageLimits.global"
                            value={rules.usageLimits.global}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Restrições de Horário</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="timeRestrictions.startTime">Horário de Início</label>
                            <input
                                type="time"
                                id="timeRestrictions.startTime"
                                name="timeRestrictions.startTime"
                                value={rules.timeRestrictions.startTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeRestrictions.endTime">Horário de Término</label>
                            <input
                                type="time"
                                id="timeRestrictions.endTime"
                                name="timeRestrictions.endTime"
                                value={rules.timeRestrictions.endTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Salvar Regras
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => history.push(`/campaigns/edit/${id}`)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CampaignRules; 