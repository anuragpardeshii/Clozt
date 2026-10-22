import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/orders/admin')
      .then(({ data }) => setOrders(data.orders))
      .catch(() => setError('Could not load orders.'));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {error && <p role="alert" className="text-red-600">{error}</p>}
      {orders.length === 0 && !error && <p>No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order._id} className="border rounded-lg p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">Order {order._id}</p>
                <p>{order.user?.username || 'Deleted user'} · {order.user?.email}</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p>{order.status}</p>
                <p className="font-semibold">₹{order.totalAmount}</p>
              </div>
            </div>
            <p className="mt-2">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</p>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
