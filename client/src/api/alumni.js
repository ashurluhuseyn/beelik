import axiosInstance from './axiosInstance';

export const createData = async (data) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axiosInstance.post('/alumni', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const getData = async () => {
  try {
    const response = await axiosInstance.get(`/alumni`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDataByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/alumni/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data by category:", error);
    throw error;
  }
};

export const getDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/alumni/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data by id:", error);
    throw error;
  }
};

export const updateData = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/alumni/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/alumni/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
};