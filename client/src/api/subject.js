import axiosInstance from './axiosInstance';

export const createSubject = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/training/plan', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};

export const getSubjects = async () => {
  try {
    const response = await axiosInstance.get(`/plan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

export const getSubjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`/training/plan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subject:", error);
    throw error;
  }
};

export const getSubjectsByCourseId = async (id) => {
  try {
    const response = await axiosInstance.get(`/training/plan/${id}/course`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subject:", error);
    throw error;
  }
};

export const updateSubject = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/training/plan/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/training/plan/${id}` , {
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