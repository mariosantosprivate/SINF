import api from '../api';

const getFiscalYears = async () => {
  try {
    const response = await api.get('metadata/fiscal-years');

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getFiscalYears,
};
