import axiosInstance from './axiosInstance';

export const createData = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/contact', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const getData = async (userId) => {
  try {
    const response = await axiosInstance.get(`/contact`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



export const updateData = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/contact/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/contact/${id}` , {
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