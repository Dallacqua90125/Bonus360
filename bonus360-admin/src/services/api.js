import axios from 'axios';

const API_URL = 'https://api.example.com/campaigns'; // Replace with your actual API endpoint

export const fetchCampaigns = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};

export const fetchCampaignById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching campaign with id ${id}:`, error);
        throw error;
    }
};

export const createCampaign = async (campaignData) => {
    try {
        const response = await axios.post(API_URL, campaignData);
        return response.data;
    } catch (error) {
        console.error('Error creating campaign:', error);
        throw error;
    }
};

export const updateCampaign = async (id, campaignData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, campaignData);
        return response.data;
    } catch (error) {
        console.error(`Error updating campaign with id ${id}:`, error);
        throw error;
    }
};

export const deleteCampaign = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting campaign with id ${id}:`, error);
        throw error;
    }
};