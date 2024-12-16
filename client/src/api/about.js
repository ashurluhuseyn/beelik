import axiosInstance from './axiosInstance';

export const createAbout = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axiosInstance.patch('/about', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error creating about:", error);
    throw error;
  }
};

export const getAbout = async (userId) => {
  try {
    const response = await axiosInstance.get(`/about`);
    return response.data;
  } catch (error) {
    console.error("Error fetching about:", error);
    throw error;
  }
};

export const getDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/about/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateAbout = async (id, data) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axiosInstance.patch(`/about/${id}`, data, {
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
