import axiosInstance from './axiosInstance';

export const createAdvantage = async (data) => {
  try {
    const response = await axiosInstance.post('/advantage', data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating advantage:", error);
    throw error;
  }
};

export const getAdvantages = async (userId) => {
  try {
    const response = await axiosInstance.get(`/advantage`);
    return response.data;
  } catch (error) {
    console.error("Error fetching advantages:", error);
    throw error;
  }
};

export const getAdvantageById = async (id) => {
  try {
    const response = await axiosInstance.get(`/advantage/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching advantage:", error);
    throw error;
  }
};

export const updateAdvantage = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/advantage/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating advantage:", error);
    throw error;
  }
};

export const deleteAdvantage = async (id) => {
    try {
      const response = await axiosInstance.delete(`/advantage/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  };