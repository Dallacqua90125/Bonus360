import React from 'react';

const CampaignDetails = ({ campaign }) => {
    if (!campaign) {
        return <div>No campaign selected.</div>;
    }

    return (
        <div className="campaign-details">
            <h2>{campaign.name}</h2>
            <p><strong>Description:</strong> {campaign.description}</p>
            <p><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
            <h3>Parameters</h3>
            <ul>
                {campaign.parameters.map((param, index) => (
                    <li key={index}>{param.name}: {param.value}</li>
                ))}
            </ul>
            <h3>Rules</h3>
            <ul>
                {campaign.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                ))}
            </ul>
        </div>
    );
};

export default CampaignDetails;