import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        search: ''
    });

    useEffect(() => {
        fetchCoupons();
    }, [filters]);

    const fetchCoupons = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/coupons?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCoupons(data);
            } else {
                setError('Erro ao carregar cupons');
            }
        } catch (err) {
            setError('Erro ao carregar cupons');
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
        fetchCoupons();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este cupom?')) {
            return;
        }

        try {
            const response = await fetch(`/api/coupons/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setCoupons(prev => prev.filter(coupon => coupon.id !== id));
            } else {
                setError('Erro ao excluir cupom');
            }
        } catch (err) {
            setError('Erro ao excluir cupom');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="coupons">
            <div className="coupons-header">
                <h1>Gerenciamento de Cupons</h1>
                <Link to="/coupons/generate" className="create-btn">
                    Gerar Novo Cupom
                </Link>
            </div>

            <div className="filters-section">
                <form onSubmit={handleSearch} className="filters-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Buscar por código ou nome..."
                            className="search-input"
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Todos os Status</option>
                            <option value="active">Ativos</option>
                            <option value="inactive">Inativos</option>
                            <option value="expired">Expirados</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Todos os Tipos</option>
                            <option value="percentage">Porcentagem</option>
                            <option value="fixed">Valor Fixo</option>
                            <option value="free_shipping">Frete Grátis</option>
                        </select>
                    </div>
                    <button type="submit" className="search-btn">
                        Buscar
                    </button>
                </form>
            </div>

            <div className="coupons-grid">
                {coupons.map(coupon => (
                    <div key={coupon.id} className="coupon-card">
                        <div className="coupon-header">
                            <h3>{coupon.code}</h3>
                            <span className={`status-badge ${coupon.status}`}>
                                {coupon.status}
                            </span>
                        </div>
                        <div className="coupon-details">
                            <p><strong>Tipo:</strong> {coupon.type}</p>
                            <p><strong>Valor:</strong> {
                                coupon.type === 'percentage' 
                                    ? `${coupon.value}%` 
                                    : `R$ ${coupon.value.toFixed(2)}`
                            }</p>
                            <p><strong>Validade:</strong> {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                            <p><strong>Usos:</strong> {coupon.usageCount} / {coupon.maxUses || '∞'}</p>
                        </div>
                        <div className="coupon-actions">
                            <Link to={`/coupons/manage/${coupon.id}`} className="edit-btn">
                                Gerenciar
                            </Link>
                            <Link to={`/coupons/limits/${coupon.id}`} className="limits-btn">
                                Limites
                            </Link>
                            <button
                                onClick={() => handleDelete(coupon.id)}
                                className="delete-btn"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coupons; 