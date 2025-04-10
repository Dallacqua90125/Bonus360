import React, { useEffect, useState } from 'react';
import CampaignList from '../components/CampaignList';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            // Simulate an API call to fetch campaigns
            const response = await fetch('/api/campaigns'); // Adjust the API endpoint as needed
            const data = await response.json();
            setCampaigns(data);
        };

        fetchCampaigns();
    }, []);

    return (
        <div>
            <h1>Campaigns</h1>
            <CampaignList campaigns={campaigns} />
        </div>
    );
};

export default Campaigns;