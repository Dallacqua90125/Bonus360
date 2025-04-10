import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from '../services/api';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const data = await fetchCampaigns();
                setCampaigns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCampaigns();
    }, []);

    if (loading) {
        return <div>Loading campaigns...</div>;
    }

    if (error) {
        return <div>Error fetching campaigns: {error}</div>;
    }

    return (
        <div>
            <h2>Campaign List</h2>
            <ul>
                {campaigns.map(campaign => (
                    <li key={campaign.id}>
                        {campaign.name} - {campaign.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampaignList;