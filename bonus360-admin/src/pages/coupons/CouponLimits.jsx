import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const CouponLimits = () => {
    const [limits, setLimits] = useState({
        maxUses: 0,
        maxUsesPerUser: 0,
        maxUsesPerDay: 0,
        maxUsesPerWeek: 0,
        maxUsesPerMonth: 0,
        minimumPurchase: 0,
        maximumDiscount: 0,
        productRestrictions: [],
        userRestrictions: [],
        timeRestrictions: {
            startTime: '',
            endTime: '',
            daysOfWeek: []
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [availableProducts, setAvailableProducts] = useState([]);
    const [availableUserGroups, setAvailableUserGroups] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchLimits();
        fetchAvailableOptions();
    }, [id]);

    const fetchLimits = async () => {
        try {
            const response = await fetch(`/api/coupons/${id}/limits`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLimits(data);
            } else {
                setError('Erro ao carregar limites do cupom');
            }
        } catch (err) {
            setError('Erro ao carregar limites do cupom');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableOptions = async () => {
        try {
            const [productsResponse, userGroupsResponse] = await Promise.all([
                fetch('/api/products', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }),
                fetch('/api/user-groups', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            ]);

            if (productsResponse.ok) {
                const productsData = await productsResponse.json();
                setAvailableProducts(productsData);
            }

            if (userGroupsResponse.ok) {
                const userGroupsData = await userGroupsResponse.json();
                setAvailableUserGroups(userGroupsData);
            }
        } catch (err) {
            console.error('Erro ao carregar opções disponíveis');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setLimits(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setLimits(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleMultiSelect = (field, value) => {
        setLimits(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/coupons/${id}/limits`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(limits)
            });

            if (response.ok) {
                history.push(`/coupons/manage/${id}`);
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao atualizar limites');
            }
        } catch (err) {
            setError('Erro ao atualizar limites. Tente novamente.');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="coupon-limits">
            <h1>Configuração de Limites</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="limits-form">
                <div className="form-section">
                    <h2>Limites de Uso</h2>
                    <div className="form-group">
                        <label htmlFor="maxUses">Limite Total de Usos</label>
                        <input
                            type="number"
                            id="maxUses"
                            name="maxUses"
                            value={limits.maxUses}
                            onChange={handleChange}
                            min="0"
                            placeholder="0 para ilimitado"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxUsesPerUser">Limite por Usuário</label>
                        <input
                            type="number"
                            id="maxUsesPerUser"
                            name="maxUsesPerUser"
                            value={limits.maxUsesPerUser}
                            onChange={handleChange}
                            min="0"
                            placeholder="0 para ilimitado"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="maxUsesPerDay">Limite Diário</label>
                            <input
                                type="number"
                                id="maxUsesPerDay"
                                name="maxUsesPerDay"
                                value={limits.maxUsesPerDay}
                                onChange={handleChange}
                                min="0"
                                placeholder="0 para ilimitado"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxUsesPerWeek">Limite Semanal</label>
                            <input
                                type="number"
                                id="maxUsesPerWeek"
                                name="maxUsesPerWeek"
                                value={limits.maxUsesPerWeek}
                                onChange={handleChange}
                                min="0"
                                placeholder="0 para ilimitado"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxUsesPerMonth">Limite Mensal</label>
                            <input
                                type="number"
                                id="maxUsesPerMonth"
                                name="maxUsesPerMonth"
                                value={limits.maxUsesPerMonth}
                                onChange={handleChange}
                                min="0"
                                placeholder="0 para ilimitado"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Restrições de Valor</h2>
                    <div className="form-group">
                        <label htmlFor="minimumPurchase">Valor Mínimo de Compra</label>
                        <input
                            type="number"
                            id="minimumPurchase"
                            name="minimumPurchase"
                            value={limits.minimumPurchase}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maximumDiscount">Desconto Máximo</label>
                        <input
                            type="number"
                            id="maximumDiscount"
                            name="maximumDiscount"
                            value={limits.maximumDiscount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Restrições de Produtos</h2>
                    <div className="form-group">
                        <label>Produtos Permitidos</label>
                        <select
                            multiple
                            value={limits.productRestrictions}
                            onChange={(e) => handleMultiSelect('productRestrictions', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableProducts.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Restrições de Usuários</h2>
                    <div className="form-group">
                        <label>Grupos de Usuários Permitidos</label>
                        <select
                            multiple
                            value={limits.userRestrictions}
                            onChange={(e) => handleMultiSelect('userRestrictions', Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {availableUserGroups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
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
                                value={limits.timeRestrictions.startTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeRestrictions.endTime">Horário de Término</label>
                            <input
                                type="time"
                                id="timeRestrictions.endTime"
                                name="timeRestrictions.endTime"
                                value={limits.timeRestrictions.endTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Dias da Semana Permitidos</label>
                        <div className="days-selector">
                            {['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'].map((day, index) => (
                                <label key={day} className="day-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={limits.timeRestrictions.daysOfWeek.includes(index)}
                                        onChange={(e) => {
                                            const newDays = e.target.checked
                                                ? [...limits.timeRestrictions.daysOfWeek, index]
                                                : limits.timeRestrictions.daysOfWeek.filter(d => d !== index);
                                            setLimits(prev => ({
                                                ...prev,
                                                timeRestrictions: {
                                                    ...prev.timeRestrictions,
                                                    daysOfWeek: newDays
                                                }
                                            }));
                                        }}
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Salvar Limites
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => history.push(`/coupons/manage/${id}`)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CouponLimits; 