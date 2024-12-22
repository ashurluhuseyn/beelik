import axiosInstance from './axiosInstance';

export const createBlog = async (data) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axiosInstance.post('/blog', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/blog`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogsByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/blog/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by category:", error);
    throw error;
  }
};


export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    throw error;
  }
};

export const getBlogDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/blog/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    throw error;
  }
};


export const updateBlog = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/blog/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};


export const deleteBlog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/blog/${id}`, {
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