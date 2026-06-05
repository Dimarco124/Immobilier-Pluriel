import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Autoriser les cookies
});

// Ajouter le token à toutes les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getHeroSlides = () => api.get('/hero-slides');
export const getStats = () => api.get('/stats');
export const getVision = () => api.get('/vision');
export const getServices = () => api.get('/services');
export const getTerrains = (params = {}) => api.get('/terrains', { params });
export const getTerrain = (id) => api.get(`/terrains/${id}`);
export const getProjects = (params = {}) => api.get('/projects', { params });
export const getProject = (id) => api.get(`/projects/${id}`);
export const getNews = (params = {}) => api.get('/news', { params });
export const getNewsItem = (id) => api.get(`/news/${id}`);
export const getTeam = () => api.get('/team');
export const getCompanyInfo = () => api.get('/company-info');
export const getNavigation = () => api.get('/navigation');
export const getSocialLinks = () => api.get('/social-links');
export const getContactInfo = () => api.get('/contact-info');
export const getSiteSettings = () => api.get('/site-settings');
export const submitContact = (data) => api.post('/contact', data);
export const getTestimonials = () => api.get('/testimonials');
export const getLegalSections = (page) => api.get(`/legal-sections/${page}`);

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
  if (path.startsWith('/storage')) return `${baseUrl}${path}`;
  return path;
};

export default api;
