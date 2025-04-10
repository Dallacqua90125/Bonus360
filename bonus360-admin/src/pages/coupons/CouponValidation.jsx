import React, { useState } from 'react';

const CouponValidation = () => {
    const [couponCode, setCouponCode] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleValidation = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setValidationResult(null);

        try {
            const response = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ code: couponCode })
            });

            const data = await response.json();

            if (response.ok) {
                setValidationResult(data);
            } else {
                setError(data.message || 'Erro ao validar cupom');
            }
        } catch (err) {
            setError('Erro ao validar cupom. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="coupon-validation">
            <h1>Validação de Cupons</h1>
            
            <form onSubmit={handleValidation} className="validation-form">
                <div className="form-group">
                    <label htmlFor="couponCode">Código do Cupom</label>
                    <input
                        type="text"
                        id="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Digite o código do cupom"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="validate-btn"
                    disabled={loading}
                >
                    {loading ? 'Validando...' : 'Validar Cupom'}
                </button>
            </form>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {validationResult && (
                <div className="validation-result">
                    <h2>Resultado da Validação</h2>
                    <div className="result-details">
                        <div className="result-item">
                            <span className="label">Status:</span>
                            <span className={`value status-${validationResult.status}`}>
                                {validationResult.status}
                            </span>
                        </div>
                        <div className="result-item">
                            <span className="label">Tipo:</span>
                            <span className="value">{validationResult.type}</span>
                        </div>
                        <div className="result-item">
                            <span className="label">Valor:</span>
                            <span className="value">
                                {validationResult.type === 'percentage'
                                    ? `${validationResult.value}%`
                                    : `R$ ${validationResult.value.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="result-item">
                            <span className="label">Validade:</span>
                            <span className="value">
                                {new Date(validationResult.expiryDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="result-item">
                            <span className="label">Usos:</span>
                            <span className="value">
                                {validationResult.usageCount} / {validationResult.maxUses || '∞'}
                            </span>
                        </div>
                        {validationResult.minimumPurchase > 0 && (
                            <div className="result-item">
                                <span className="label">Valor Mínimo de Compra:</span>
                                <span className="value">
                                    R$ {validationResult.minimumPurchase.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {validationResult.description && (
                            <div className="result-item description">
                                <span className="label">Descrição:</span>
                                <span className="value">{validationResult.description}</span>
                            </div>
                        )}
                    </div>

                    {validationResult.restrictions && (
                        <div className="restrictions">
                            <h3>Restrições</h3>
                            <ul>
                                {validationResult.restrictions.map((restriction, index) => (
                                    <li key={index}>{restriction}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CouponValidation; 