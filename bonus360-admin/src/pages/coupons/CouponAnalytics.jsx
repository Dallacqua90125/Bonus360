import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CouponAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const { id } = useParams();

    useEffect(() => {
        fetchAnalytics();
    }, [dateRange]);

    const fetchAnalytics = async () => {
        try {
            const queryParams = new URLSearchParams(dateRange).toString();
            const response = await fetch(`/api/coupons/${id}/analytics?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            } else {
                setError('Erro ao carregar análises');
            }
        } catch (err) {
            setError('Erro ao carregar análises');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!analytics) return <div>Nenhum dado disponível</div>;

    return (
        <div className="coupon-analytics">
            <h1>Análise de Desempenho</h1>

            <div className="date-filters">
                <div className="form-group">
                    <label htmlFor="startDate">Data Inicial</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={dateRange.startDate}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Data Final</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={dateRange.endDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="metrics-summary">
                <div className="metric-card">
                    <h3>Total de Resgates</h3>
                    <p>{analytics.totalRedemptions}</p>
                </div>
                <div className="metric-card">
                    <h3>Taxa de Conversão</h3>
                    <p>{(analytics.conversionRate * 100).toFixed(2)}%</p>
                </div>
                <div className="metric-card">
                    <h3>Desconto Médio</h3>
                    <p>R$ {analytics.averageDiscount.toFixed(2)}</p>
                </div>
                <div className="metric-card">
                    <h3>Receita Gerada</h3>
                    <p>R$ {analytics.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-container">
                    <h3>Resgates por Dia</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.redemptionsByDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="redemptions"
                                stroke="#8884d8"
                                name="Resgates"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Distribuição por Canal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={analytics.distributionByChannel}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Valor Médio por Faixa de Desconto</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.averageValueByDiscount}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill="#82ca9d"
                                name="Valor Médio"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Horários de Resgate</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.redemptionsByHour}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="count"
                                fill="#ffc658"
                                name="Quantidade"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="insights-section">
                <h3>Insights</h3>
                <ul>
                    {analytics.insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CouponAnalytics; 