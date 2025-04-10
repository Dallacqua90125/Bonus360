import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const CampaignSegmentation = () => {
    const [segmentation, setSegmentation] = useState({
        userGroups: [],
        products: [],
        channels: [],
        customerSegments: [],
        purchaseHistory: {
            minValue: 0,
            maxValue: 0,
            period: 'all' // all, last_month, last_quarter, last_year
        },
        location: {
            regions: [],
            cities: []
        }
    });
    const [availableOptions, setAvailableOptions] = useState({
        userGroups: [],
        products: [],
        channels: [],
        customerSegments: [],
        regions: [],
        cities: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchSegmentation();
        fetchAvailableOptions();
    }, [id]);

    const fetchSegmentation = async () => {
        try {
            const response = await fetch(`/api/campaigns/${id}/segmentation`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSegmentation(data);
            } else {
                setError('Erro ao carregar segmentação');
            }
        } catch (err) {
            setError('Erro ao carregar segmentação');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableOptions = async () => {
        try {
            const response = await fetch('/api/segmentation/options', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAvailableOptions(data);
            }
        } catch (err) {
            console.error('Erro ao carregar opções de segmentação');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setSegmentation(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setSegmentation(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleMultiSelect = (field, value) => {
        setSegmentation(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/campaigns/${id}/segmentation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(segmentation)
            });

            if (response.ok) {
                history.push(`/campaigns/edit/${id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao atualizar segmentação');
            }
        } catch (err) {
            setError('Erro ao atualizar segmentação. Tente novamente.');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="campaign-segmentation">
            <h1>Segmentação e Personalização</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="segmentation-form">
                <div className="form-section">
                    <h2>Grupos de Usuários</h2>
                    <div className="form-group">
                        <label>Selecione os Grupos</label>
                        <select
                            multiple
                            value={segmentation.userGroups}
                            onChange={(e) => handleMultiSelect('userGroups', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableOptions.userGroups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Produtos</h2>
                    <div className="form-group">
                        <label>Selecione os Produtos</label>
                        <select
                            multiple
                            value={segmentation.products}
                            onChange={(e) => handleMultiSelect('products', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableOptions.products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Canais</h2>
                    <div className="form-group">
                        <label>Selecione os Canais</label>
                        <select
                            multiple
                            value={segmentation.channels}
                            onChange={(e) => handleMultiSelect('channels', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableOptions.channels.map(channel => (
                                <option key={channel.id} value={channel.id}>
                                    {channel.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Histórico de Compras</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="purchaseHistory.minValue">Valor Mínimo</label>
                            <input
                                type="number"
                                id="purchaseHistory.minValue"
                                name="purchaseHistory.minValue"
                                value={segmentation.purchaseHistory.minValue}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="purchaseHistory.maxValue">Valor Máximo</label>
                            <input
                                type="number"
                                id="purchaseHistory.maxValue"
                                name="purchaseHistory.maxValue"
                                value={segmentation.purchaseHistory.maxValue}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchaseHistory.period">Período</label>
                        <select
                            id="purchaseHistory.period"
                            name="purchaseHistory.period"
                            value={segmentation.purchaseHistory.period}
                            onChange={handleChange}
                        >
                            <option value="all">Todo o período</option>
                            <option value="last_month">Último mês</option>
                            <option value="last_quarter">Último trimestre</option>
                            <option value="last_year">Último ano</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Localização</h2>
                    <div className="form-group">
                        <label>Regiões</label>
                        <select
                            multiple
                            value={segmentation.location.regions}
                            onChange={(e) => handleMultiSelect('location.regions', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableOptions.regions.map(region => (
                                <option key={region.id} value={region.id}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cidades</label>
                        <select
                            multiple
                            value={segmentation.location.cities}
                            onChange={(e) => handleMultiSelect('location.cities', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableOptions.cities.map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Salvar Segmentação
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

export default CampaignSegmentation; 