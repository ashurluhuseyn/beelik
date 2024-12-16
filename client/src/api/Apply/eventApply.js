import axiosInstance from '../axiosInstance';

export const createApply = async (data) => {
  try {
    const response = await axiosInstance.post('/apply/event', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const getApplies = async (userId) => {
  try {
    const response = await axiosInstance.get(`/apply/event`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteApply = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/apply/event/${id}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data; 
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
};