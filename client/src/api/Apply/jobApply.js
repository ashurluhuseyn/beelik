import axiosInstance from '../axiosInstance';

export const createApply = async (data) => {
  try {
    const response = await axiosInstance.post('/apply/job', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const getApplies = async (userId) => {
  try {
    const response = await axiosInstance.get(`/apply/job`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getApplicationsByVacancy = async (id) => {
  try {
    const response = await axiosInstance.get(`/apply/job/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

export const updateApplyStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.patch(`/apply/job/${id}/status`, { status }, {
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
      const response = await axiosInstance.delete(`/apply/job/${id}` , {
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