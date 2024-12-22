import axiosInstance from './axiosInstance';

export const getData = async () => {
  try {
    const response = await axiosInstance.get(`/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCorporateData = async () => {
  try {
    const response = await axiosInstance.get(`/home/corporate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getHomeDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/home/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCorHomeDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/home/${id}/corporate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateHomeData = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/home/${id}`, data, {
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


export const updateCorHomeData = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/home/${id}/corporate`, data, {
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
