import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const GenerateCoupons = () => {
    const [couponData, setCouponData] = useState({
        code: '',
        type: 'percentage',
        value: 0,
        maxUses: 0,
        expiryDate: '',
        minimumPurchase: 0,
        productRestrictions: [],
        userRestrictions: [],
        description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCouponData(prev => ({
            ...prev,
            code
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(couponData)
            });

            if (response.ok) {
                history.push('/coupons');
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao gerar cupom');
            }
        } catch (err) {
            setError('Erro ao gerar cupom. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="generate-coupon">
            <h1>Gerar Novo Cupom</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="coupon-form">
                <div className="form-group">
                    <label htmlFor="code">Código do Cupom</label>
                    <div className="code-input-group">
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={couponData.code}
                            onChange={handleChange}
                            required
                            placeholder="Digite ou gere um código"
                        />
                        <button
                            type="button"
                            onClick={generateCode}
                            className="generate-code-btn"
                        >
                            Gerar Código
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipo de Desconto</label>
                    <select
                        id="type"
                        name="type"
                        value={couponData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="percentage">Porcentagem</option>
                        <option value="fixed">Valor Fixo</option>
                        <option value="free_shipping">Frete Grátis</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="value">Valor do Desconto</label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        value={couponData.value}
                        onChange={handleChange}
                        required
                        min="0"
                        step={couponData.type === 'percentage' ? '1' : '0.01'}
                    />
                    <span className="value-hint">
                        {couponData.type === 'percentage' ? '%' : 'R$'}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="maxUses">Limite de Usos</label>
                    <input
                        type="number"
                        id="maxUses"
                        name="maxUses"
                        value={couponData.maxUses}
                        onChange={handleChange}
                        min="0"
                        placeholder="0 para ilimitado"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiryDate">Data de Expiração</label>
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={couponData.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="minimumPurchase">Valor Mínimo de Compra</label>
                    <input
                        type="number"
                        id="minimumPurchase"
                        name="minimumPurchase"
                        value={couponData.minimumPurchase}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={couponData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Descreva as condições e restrições do cupom"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Gerando...' : 'Gerar Cupom'}
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
        </div>
    );
};

export default GenerateCoupons; 