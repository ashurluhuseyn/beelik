import axiosInstance from './axiosInstance';

export const createCategory = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/category', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getCategories = async (userId) => {
  try {
    const response = await axiosInstance.get(`/category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};



export const updateCategory = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/category/${id}` , {
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