import axiosInstance from './axiosInstance';

export const createCourse = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/course`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${token}`
          },
        })
        return response.data;
      } catch (error) {
        console.error("Error creating course:", error);
        throw error;
      }
};

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get(`/course`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by id:", error);
    throw error;
  }
};

export const getCourseDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const getCoursesByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by category:", error);
    throw error;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/course/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};


export const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/course/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${token}`
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Delete course error:", error);
      throw error;
    }
};