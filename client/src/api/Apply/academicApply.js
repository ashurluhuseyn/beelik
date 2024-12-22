import axiosInstance from '../axiosInstance';

export const createApply = async (data) => {
  try {
    const response = await axiosInstance.post('/apply/academic', data, {
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
    const response = await axiosInstance.get(`/apply/academic`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateApplyStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.patch(`/apply/academic/${id}/status`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
};

export const deleteApply = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/apply/academic/${id}` , {
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