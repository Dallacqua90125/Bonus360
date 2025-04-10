import React, { useState } from 'react';

const CreateCampaign = () => {
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        discount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignData({
            ...campaignData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the submission to the API
        console.log('Campaign Created:', campaignData);
    };

    return (
        <div>
            <h2>Create New Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={campaignData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={campaignData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={campaignData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={campaignData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Discount (%):</label>
                    <input
                        type="number"
                        name="discount"
                        value={campaignData.discount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Campaign</button>
            </form>
        </div>
    );
};

export default CreateCampaign;