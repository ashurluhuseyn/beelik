import axiosInstance from './axiosInstance';

export const createVacancy = async (data) => {
  try {
    const response = await axiosInstance.post('/vacancy', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating vacancy:", error);
    throw error;
  }
};

export const getVacancies = async (userId) => {
  try {
    const response = await axiosInstance.get(`/vacancy`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    throw error;
  }
};

export const getVacancyById = async (id) => {
  try {
    const response = await axiosInstance.get(`/vacancy/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancy by id:", error);
    throw error;
  }
};

export const getVacancyDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/vacancy/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancy by id:", error);
    throw error;
  }
};


export const updateVacancy = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/vacancy/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating vacancy:", error);
    throw error;
  }
};



export const deleteVacancy = async (id, data) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axiosInstance.delete(`/vacancy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    throw error;
  }
};
