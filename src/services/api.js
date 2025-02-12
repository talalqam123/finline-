import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  submitForm: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forms/submit`, formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || 'Server error');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        throw new Error('Error setting up request. Please try again.');
      }
    }
  },

  getSubmission: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forms/submission/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api;
