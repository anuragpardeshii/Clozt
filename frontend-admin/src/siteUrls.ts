const defaultStorefrontUrl = import.meta.env.PROD
  ? 'https://clozt.vercel.app/'
  : 'http://localhost:5173/';

export const storefrontUrl = new URL('/', import.meta.env.VITE_STOREFRONT_URL || defaultStorefrontUrl).href;
