import axiosInstance from './axiosInstance';

export const getApplyCounts = async () => {
  try {
    const response = await axiosInstance.get('stat/apply-counts');
    return response.data;
  } catch (error) {
    console.error("Error fetching counts:", error);
    throw error;
  }
};

export const getCourseViews = async () => {
  try {
    const response = await axiosInstance.get('stat/course/views');
    return response.data;
  } catch (error) {
    console.error("Error fetchin views:", error);
    throw error;
  }
};

export const getHourlyViews = async () => {
  try {
    const response = await axiosInstance.get('stat/visits');
    return response.data;
  } catch (error) {
    console.error("Error fetchin views:", error);
    throw error;
  }
};