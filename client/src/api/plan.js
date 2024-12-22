import axiosInstance from './axiosInstance';

export const createPlan = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/plan`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${token}`
          },
        })
        return response.data;
      } catch (error) {
        console.error("Error creating plan:", error);
        throw error;
      }
};

export const getPlans = async () => {
  try {
    const response = await axiosInstance.get(`/plan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const getPlanById = async (id) => {
  try {
    const response = await axiosInstance.get(`/plan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plan by id:", error);
    throw error;
  }
};

export const updatePlan = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/plan/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deletePlan = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/plan/${id}` , {
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