const defaultAdminUrl = import.meta.env.PROD
  ? 'https://frontend-admin-inky.vercel.app/'
  : 'http://localhost:5174/';

export const adminUrl = new URL('/', import.meta.env.VITE_ADMIN_URL || defaultAdminUrl).href;
