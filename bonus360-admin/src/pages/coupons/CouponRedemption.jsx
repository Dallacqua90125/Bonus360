import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const CouponRedemption = () => {
    const [redemptions, setRedemptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: 'all',
        search: ''
    });
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchRedemptions();
    }, [filters]);

    const fetchRedemptions = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/coupons/${id}/redemptions?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRedemptions(data);
            } else {
                setError('Erro ao carregar resgates');
            }
        } catch (err) {
            setError('Erro ao carregar resgates');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRedemptions();
    };

    const handleRefund = async (redemptionId) => {
        if (!window.confirm('Tem certeza que deseja reembolsar este resgate?')) {
            return;
        }

        try {
            const response = await fetch(`/api/coupons/${id}/redemptions/${redemptionId}/refund`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                fetchRedemptions();
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao reembolsar resgate');
            }
        } catch (err) {
            setError('Erro ao reembolsar resgate');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="coupon-redemption">
            <h1>Histórico de Resgates</h1>
            
            <div className="filters-section">
                <form onSubmit={handleSearch} className="filters-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Buscar por usuário ou pedido..."
                            className="search-input"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Data Inicial</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Data Final</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Todos os Status</option>
                            <option value="completed">Concluído</option>
                            <option value="refunded">Reembolsado</option>
                            <option value="failed">Falhou</option>
                        </select>
                    </div>
                    <button type="submit" className="search-btn">
                        Buscar
                    </button>
                </form>
            </div>

            <div className="redemptions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Usuário</th>
                            <th>Pedido</th>
                            <th>Valor Original</th>
                            <th>Desconto</th>
                            <th>Valor Final</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redemptions.map(redemption => (
                            <tr key={redemption.id}>
                                <td>{new Date(redemption.date).toLocaleString()}</td>
                                <td>{redemption.user}</td>
                                <td>{redemption.orderId}</td>
                                <td>R$ {redemption.originalValue.toFixed(2)}</td>
                                <td>R$ {redemption.discountValue.toFixed(2)}</td>
                                <td>R$ {redemption.finalValue.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${redemption.status}`}>
                                        {redemption.status}
                                    </span>
                                </td>
                                <td>
                                    {redemption.status === 'completed' && (
                                        <button
                                            onClick={() => handleRefund(redemption.id)}
                                            className="refund-btn"
                                        >
                                            Reembolsar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {redemptions.length === 0 && (
                <div className="no-results">
                    Nenhum resgate encontrado com os filtros selecionados.
                </div>
            )}
        </div>
    );
};

export default CouponRedemption; 