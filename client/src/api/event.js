import axiosInstance from './axiosInstance';

export const createEvent = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post('/event', data, {
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

export const getEvents = async () => {
  try {
    const response = await axiosInstance.get(`/event`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventsByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/event/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events by category:", error);
    throw error;
  }
};


export const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};

export const getEventDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/event/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};

export const updateEvent = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.patch(`/event/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};


export const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete('/event', {
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