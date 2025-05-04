import axios from 'axios';

const LOCAL_API_URL = 'http://192.168.1.4:5000/api';
const PROD_API_URL = 'https://finline-backend.vercel.app/api';

// Function to check if local server is available
const checkLocalServer = async () => {
  try {
    await axios.get(`${LOCAL_API_URL}/health`, { timeout: 2000 });
    return true;
  } catch (error) {
    console.log('Local server not available, using production server');
    return false;
  }
};

// Initialize API_BASE_URL with production URL by default
let API_BASE_URL = PROD_API_URL;

// Set up the base URL based on environment and local server availability
if (process.env.NODE_ENV === 'development') {
  checkLocalServer().then(isLocalAvailable => {
    if (isLocalAvailable) {
      API_BASE_URL = LOCAL_API_URL;
    }
  });
}

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const api = {
  submitForm: async (formData) => {
    try {
      const response = await axiosInstance.post('/forms/submit', formData);
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
      if (!id) {
        throw new Error('ID is required');
      }
      console.log('Fetching submission with ID:', id);
      const response = await axiosInstance.get(`/forms/submission/${id}`);
      console.log('Submission response:', response.data); // Add this line
      return response.data;
    } catch (error) {
      console.error('GetSubmission Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch submission');
    }
  },

  getSubmissions: async () => {
    try {
      console.log('Fetching submissions...');
      const response = await axiosInstance.get('/forms/submissions');
      console.log('Response:', response);
      return response.data;
    } catch (error) {
      console.error('GetSubmissions Error:', error);
      throw new Error(error.response?.data?.error || error.message || 'Network error');
    }
  },

  generateReportPreview: async (id) => {
    try {
      if (!id) {
        throw new Error('Report ID is required');
      }
      console.log('Generating report preview for ID:', id);
      const response = await axiosInstance.get(`/forms/report-data/${id}`);
      console.log('Report preview response:', response.data); // Add this line
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.error || 'Failed to generate report preview');
      }
      return response.data;
    } catch (error) {
      console.error('Report Preview Error:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to generate report preview');
    }
  },

  downloadReport: async (id, settings = {}) => {
    try {
      console.log('Downloading report for ID:', id);
      const response = await axios.post(
        `${API_BASE_URL}/forms/download-report/${id}`,
        { settings },
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (error) {
      console.error('Download Report Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to download report');
    }
  }
};

const downloadReport = async (id) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/api/forms/download-report/${id}`,
      method: 'GET',
      responseType: 'arraybuffer', // Important for receiving binary data
    });
    return response;
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export default api;
