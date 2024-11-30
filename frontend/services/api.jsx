import axios from 'axios';

// Gunakan IP komputer Anda
// Contoh: jika IP komputer Anda 192.168.56.1, maka:
const BASE_URL = 'http://192.168.53.61/aldifar_project/backend';

// Atau jika folder backend ada di dalam htdocs:
// const BASE_URL = 'http://192.168.56.1/backend';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login.php', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/signup.php', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/get_categories.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getMaterials = async (categoryId) => {
  try {
    const response = await api.get(`/get_materials.php?category_id=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw error;
  }
};

export const getMaterialDetail = async (materialId) => {
  try {
    const response = await api.get(`/get_material_detail.php?id=${materialId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching material detail:', error);
    throw error;
  }
};


export default api;