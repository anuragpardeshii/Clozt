export type AdminUser = {
  _id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin';
};

export type Customer = AdminUser & { createdAt: string; lastLoginAt?: string; lastActiveAt?: string };
export type TrafficSummary = { activeUsers: number; newSignUps: number; totalUsers: number; signIns: number; days: { date: string; views: number; visitors: number }[] };

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  salePrice: number | null;
  discount: number | null;
  color: string;
  gender: string;
  category: string;
  listings: string[];
  sizes: Record<string, number>;
  images: string[];
};

export type Order = {
  _id: string;
  createdAt: string;
  user?: { username: string; email: string } | null;
  status: string;
  statusHistory?: { status: string; changedAt: string }[];
  paymentMethod?: string;
  totalAmount: number;
  subtotalAmount?: number;
  discountAmount?: number;
  couponCode?: string;
  items: { _id?: string; product?: string | { _id: string }; name?: string; size?: string; quantity: number; price: number; image?: string }[];
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

export type Coupon = {
  _id: string;
  code: string;
  kind: 'percent' | 'fixed';
  value: number;
  minimumSpend: number;
  maxDiscount: number | null;
  expiresAt: string;
  active: boolean;
};

export type CouponInput = Omit<Coupon, '_id'>;
