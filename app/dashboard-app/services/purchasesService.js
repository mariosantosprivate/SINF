import api from '../api';

const getMetrics = async (fiscalYear) => {
  try {
    const response = await api.get('purchases', { params: { fiscalYear } });

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getMetrics,
};
