const API_ENDPOINT = '/api/github';

export const getActivity = async (username = 'HaskaZuki') => {
  try {
    const response = await fetch(`${API_ENDPOINT}?username=${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub activity');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GitHub service error:', error);
    return {
      success: false,
      events: [],
      error: error.message,
    };
  }
};

export default {
  getActivity,
};
