import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';
import timewareLogo from '../assets/Logo-timeware.png';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, user } = useAuth();

    // Se o usuário já estiver autenticado, redireciona para o dashboard
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!credentials.email || !credentials.password) {
                throw new Error('Email e senha são obrigatórios');
            }

            const success = await login(credentials.email, credentials.password);
            if (!success) throw new Error('Credenciais inválidas');
            // Não é necessário navegar aqui, o login já faz isso
        } catch (err) {
            setError(err.message || 'Falha no login. Por favor, verifique suas credenciais.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginWrapper}>
                <div className={styles.illustrationSection}>
                    <img src={timewareLogo} alt="Timeware Logo" className={styles.logoImage} />
                </div>

                <div className={styles.formSection}>
                    <div className={styles.loginBox}>
                        <h1>LOGIN</h1>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Username</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="@mail.com"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="password"
                                />
                            </div>

                            <div className={styles.options}>
                                <div className={styles.rememberMe}>
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                    <label htmlFor="rememberMe">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                                    Esqueceu a Senha?
                                </Link>
                            </div>

                            <button type="submit" className={styles.loginButton}>
                                Entrar
                            </button>
                        </form>

                        <div className={styles.signupLink}>
                            Não Tem Uma Conta? <Link to="/signup">Inscrever-se</Link>
                        </div>

                        <div className={styles.socialLogin}>
                            <p>Logar Com</p>
                            <div className={styles.socialIcons}>
                                <div className={styles.socialIcon}>F</div>
                                <div className={styles.socialIcon}>G</div>
                                <div className={styles.socialIcon}>A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
