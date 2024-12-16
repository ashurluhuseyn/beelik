import axiosInstance from './axiosInstance';

export const createTeacher = async (data) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axiosInstance.post('/teacher', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

export const getTeachers = async () => {
  try {
    const response = await axiosInstance.get(`/teacher`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.get(`/teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher by id:", error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete(`/teacher/${id}`, {
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