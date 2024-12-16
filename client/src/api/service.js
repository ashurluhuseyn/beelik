import axiosInstance from './axiosInstance';

export const createService = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/service', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const getServices = async () => {
  try {
    const response = await axiosInstance.get(`/service`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getServicesByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/services/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by category:", error);
    throw error;
  }
};


export const getServiceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/service/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by id:", error);
    throw error;
  }
};

export const getServiceDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/service/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by id:", error);
    throw error;
  }
};



export const updateService = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/service/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};


export const deleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
};