import axiosInstance from './axiosInstance';

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getAllUsers = async (userId) => {
    try {
      const response = await axiosInstance.get(`/auth`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(`/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const login = async (user) => {
    try {
      const response = await axiosInstance.post('/auth/login', user);
      return response.data; 
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
};

export const updateRole = async (id, role, token) => {
  try {
    const response = await axiosInstance.patch(`/auth/${id}`, { role }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  if (!token) {
    throw new Error("Token mövcud deyil, istifadəçi səsilməyəcək");
  }
  try {
    const response = await axiosInstance.delete(`/auth/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};