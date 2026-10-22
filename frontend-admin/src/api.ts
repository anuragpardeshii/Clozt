import type { AdminUser, Coupon, CouponInput, Customer, Order, Product, TrafficSummary } from './types';

const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function numberValue(value: unknown): number | null {
  const number = typeof value === 'number' || (typeof value === 'string' && value.trim())
    ? Number(value) : NaN;
  return Number.isFinite(number) ? number : null;
}

function normalizeProduct(value: unknown): Product {
  if (!isRecord(value) || typeof value._id !== 'string') {
    throw new Error('Invalid product response');
  }

  const sizes: Record<string, number> = {};
  if (isRecord(value.sizes)) {
    for (const [size, rawQuantity] of Object.entries(value.sizes)) {
      const quantity = numberValue(rawQuantity);
      if (quantity !== null) sizes[size] = quantity;
    }
  }

  return {
    _id: value._id,
    title: stringValue(value.title),
    description: stringValue(value.description),
    price: numberValue(value.price) ?? 0,
    salePrice: numberValue(value.salePrice),
    discount: numberValue(value.discount),
    color: stringValue(value.color),
    gender: stringValue(value.gender),
    category: stringValue(value.category),
    listings: Array.isArray(value.listings) ? value.listings.filter((item): item is string => typeof item === 'string') : [],
    sizes,
    images: Array.isArray(value.images) ? value.images.filter((image): image is string => typeof image === 'string') : [],
  };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { credentials: 'include', ...options });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data && typeof data === 'object' && 'message' in data
      ? String(data.message)
      : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data as T;
}

export const api = {
  checkAuth: () => request<{ loggedIn: boolean; user?: AdminUser }>('/api/users/auth/check'),
  login: (email: string, password: string) => request<{ user: AdminUser }>('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }),
  logout: () => request<{ message: string }>('/api/users/logout', { method: 'POST' }),
  products: async () => {
    const products = await request<unknown>('/api/products');
    if (!Array.isArray(products)) throw new Error('Invalid product response');
    return products.map(normalizeProduct);
  },
  productsPage: async (page: number, search: string) => {
    const result = await request<{ products: unknown[]; total: number; page: number; pages: number }>(`/api/products/admin/list?page=${page}&limit=12&search=${encodeURIComponent(search)}`);
    return { ...result, products: result.products.map(normalizeProduct) };
  },
  product: async (id: string) => normalizeProduct(await request<unknown>(`/api/products/admin/${encodeURIComponent(id)}`)),
  createProduct: (form: FormData) => request<{ product: Product }>('/api/products/newproduct', {
    method: 'POST', body: form,
  }),
  updateProduct: (id: string, form: FormData) => request<Product>(`/api/products/${id}`, {
    method: 'PUT', body: form,
  }),
  deleteProduct: (id: string) => request<{ message: string }>(`/api/products/${id}`, {
    method: 'DELETE',
  }),
  orders: (page = 1, status = '') => request<{ orders: Order[]; total: number; page: number; pages: number }>(`/api/orders/admin?page=${page}&limit=12&status=${encodeURIComponent(status)}`),
  allOrders: async () => {
    const first = await request<{ orders: Order[]; pages: number }>('/api/orders/admin?page=1&limit=50');
    const remaining = await Promise.all(Array.from({ length: first.pages - 1 }, (_, index) => request<{ orders: Order[] }>(`/api/orders/admin?page=${index + 2}&limit=50`)));
    return first.orders.concat(...remaining.map((result) => result.orders));
  },
  updateOrderStatus: (id: string, status: string) => request<{ order: Order }>(`/api/orders/admin/${id}/status`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }),
  }),
  users: (page: number, search: string) => request<{ users: Customer[]; total: number; page: number; pages: number }>(`/api/users/admin?page=${page}&limit=12&search=${encodeURIComponent(search)}`),
  traffic: () => request<TrafficSummary>('/api/analytics/admin/traffic'),
  coupons: () => request<{ coupons: Coupon[] }>('/api/coupons/admin'),
  createCoupon: (coupon: CouponInput) => request<{ coupon: Coupon }>('/api/coupons/admin', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(coupon),
  }),
  updateCoupon: (id: string, coupon: CouponInput) => request<{ coupon: Coupon }>(`/api/coupons/admin/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(coupon),
  }),
  deleteCoupon: (id: string) => request<{ message: string }>(`/api/coupons/admin/${id}`, { method: 'DELETE' }),
};
