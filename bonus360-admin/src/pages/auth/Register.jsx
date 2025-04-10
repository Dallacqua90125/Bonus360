import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (userData.password !== userData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        try {
            // Aqui será implementada a chamada à API de registro
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                })
            });

            if (response.ok) {
                // Redirecionar para o login após registro bem-sucedido
                history.push('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao registrar usuário');
            }
        } catch (err) {
            setError('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Cadastro de Usuário</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register; 