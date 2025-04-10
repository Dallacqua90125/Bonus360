import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const ManageCoupons = () => {
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [usageHistory, setUsageHistory] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchCoupon();
        fetchUsageHistory();
    }, [id]);

    const fetchCoupon = async () => {
        try {
            const response = await fetch(`/api/coupons/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCoupon(data);
            } else {
                setError('Erro ao carregar cupom');
            }
        } catch (err) {
            setError('Erro ao carregar cupom');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsageHistory = async () => {
        try {
            const response = await fetch(`/api/coupons/${id}/history`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsageHistory(data);
            }
        } catch (err) {
            console.error('Erro ao carregar histórico de uso');
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await fetch(`/api/coupons/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setCoupon(prev => ({
                    ...prev,
                    status: newStatus
                }));
            } else {
                setError('Erro ao atualizar status do cupom');
            }
        } catch (err) {
            setError('Erro ao atualizar status do cupom');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/coupons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(coupon)
            });

            if (response.ok) {
                history.push('/coupons');
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao atualizar cupom');
            }
        } catch (err) {
            setError('Erro ao atualizar cupom');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!coupon) return <div>Cupom não encontrado</div>;

    return (
        <div className="manage-coupon">
            <h1>Gerenciar Cupom</h1>
            
            <div className="coupon-status-section">
                <h2>Status do Cupom</h2>
                <div className="status-actions">
                    <button
                        className={`status-btn ${coupon.status === 'active' ? 'active' : ''}`}
                        onClick={() => handleStatusChange('active')}
                    >
                        Ativar
                    </button>
                    <button
                        className={`status-btn ${coupon.status === 'inactive' ? 'active' : ''}`}
                        onClick={() => handleStatusChange('inactive')}
                    >
                        Desativar
                    </button>
                    <button
                        className={`status-btn ${coupon.status === 'expired' ? 'active' : ''}`}
                        onClick={() => handleStatusChange('expired')}
                    >
                        Expirado
                    </button>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="coupon-form">
                <div className="form-group">
                    <label htmlFor="code">Código</label>
                    <input
                        type="text"
                        id="code"
                        value={coupon.code}
                        onChange={(e) => setCoupon(prev => ({ ...prev, code: e.target.value }))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipo</label>
                    <select
                        id="type"
                        value={coupon.type}
                        onChange={(e) => setCoupon(prev => ({ ...prev, type: e.target.value }))}
                        required
                    >
                        <option value="percentage">Porcentagem</option>
                        <option value="fixed">Valor Fixo</option>
                        <option value="free_shipping">Frete Grátis</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="value">Valor</label>
                    <input
                        type="number"
                        id="value"
                        value={coupon.value}
                        onChange={(e) => setCoupon(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                        required
                        min="0"
                        step={coupon.type === 'percentage' ? '1' : '0.01'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxUses">Limite de Usos</label>
                    <input
                        type="number"
                        id="maxUses"
                        value={coupon.maxUses}
                        onChange={(e) => setCoupon(prev => ({ ...prev, maxUses: parseInt(e.target.value) }))}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiryDate">Data de Expiração</label>
                    <input
                        type="date"
                        id="expiryDate"
                        value={coupon.expiryDate}
                        onChange={(e) => setCoupon(prev => ({ ...prev, expiryDate: e.target.value }))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="minimumPurchase">Valor Mínimo de Compra</label>
                    <input
                        type="number"
                        id="minimumPurchase"
                        value={coupon.minimumPurchase}
                        onChange={(e) => setCoupon(prev => ({ ...prev, minimumPurchase: parseFloat(e.target.value) }))}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        value={coupon.description}
                        onChange={(e) => setCoupon(prev => ({ ...prev, description: e.target.value }))}
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Salvar Alterações
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => history.push('/coupons')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            <div className="usage-history">
                <h2>Histórico de Uso</h2>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Usuário</th>
                            <th>Pedido</th>
                            <th>Valor Original</th>
                            <th>Desconto</th>
                            <th>Valor Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usageHistory.map(usage => (
                            <tr key={usage.id}>
                                <td>{new Date(usage.date).toLocaleString()}</td>
                                <td>{usage.user}</td>
                                <td>{usage.orderId}</td>
                                <td>R$ {usage.originalValue.toFixed(2)}</td>
                                <td>R$ {usage.discountValue.toFixed(2)}</td>
                                <td>R$ {usage.finalValue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupons; 