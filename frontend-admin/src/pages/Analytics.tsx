import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import type { Order, Product } from '../types';
import type { TrafficSummary } from '../types';
import { Link } from 'react-router-dom';
import CloztLoader from '../components/CloztLoader';

const colors = ['#254b3d', '#709681', '#c5a471', '#a5b9a0', '#638075', '#d2ddce'];
const formatNumber = (value: number) => new Intl.NumberFormat('en-IN').format(value);
const formatCurrency = (value: number) => `₹${formatNumber(Math.round(value))}`;

function productId(value: Order['items'][number]['product']) {
  return typeof value === 'string' ? value : value?._id;
}

export default function Analytics() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [traffic, setTraffic] = useState<TrafficSummary | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([api.products(), api.allOrders(), api.traffic()])
      .then(([catalog, result, trafficResult]) => {
        if (active) {
          setProducts(catalog);
          setOrders(result);
          setTraffic(trafficResult);
        }
      })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const analytics = useMemo(() => {
    const currentOrders = orders.filter((order) => !['Cancelled', 'Refunded'].includes(order.status));
    const unitsByProduct = new Map<string, number>();
    let orderedUnits = 0;
    for (const order of currentOrders) {
      for (const item of order.items || []) {
        const quantity = Number(item.quantity) || 0;
        orderedUnits += quantity;
        const id = productId(item.product);
        if (id) unitsByProduct.set(id, (unitsByProduct.get(id) || 0) + quantity);
      }
    }

    const categories = new Map<string, { products: number; stock: number }>();
    let stockUnits = 0;
    for (const product of products) {
      const category = product.category.trim() || 'Uncategorized';
      const stock = Object.values(product.sizes).reduce((total, count) => total + Math.max(0, Number(count) || 0), 0);
      stockUnits += stock;
      const current = categories.get(category) || { products: 0, stock: 0 };
      categories.set(category, { products: current.products + 1, stock: current.stock + stock });
    }

    const categoryRows = [...categories].map(([name, values]) => ({ name, ...values })).sort((first, second) => second.products - first.products);
    const visibleCategories = categoryRows.slice(0, 5);
    const otherCategories = categoryRows.slice(5);
    if (otherCategories.length) visibleCategories.push({
      name: 'Other categories',
      products: otherCategories.reduce((total, row) => total + row.products, 0),
      stock: otherCategories.reduce((total, row) => total + row.stock, 0),
    });
    const pieRows = visibleCategories.map((row, index) => ({ ...row, color: colors[index] }));
    let runningPercent = 0;
    const pieGradient = pieRows.map((row) => {
      const start = runningPercent;
      runningPercent += products.length ? row.products / products.length * 100 : 0;
      return `${row.color} ${start}% ${runningPercent}%`;
    }).join(', ');

    const topProducts = products.map((product) => ({
      id: product._id,
      name: product.title,
      image: product.images[0],
      units: unitsByProduct.get(product._id) || 0,
    })).filter((product) => product.units > 0).sort((first, second) => second.units - first.units).slice(0, 6);
    const inventory = categoryRows.sort((first, second) => second.stock - first.stock).slice(0, 6);

    return {
      currentOrders: currentOrders.length,
      orderedUnits,
      stockUnits,
      categoryCount: categoryRows.length,
      orderValue: currentOrders.reduce((total, order) => total + (Number(order.totalAmount) || 0), 0),
      pieRows,
      pieGradient,
      topProducts,
      inventory,
    };
  }, [products, orders]);

  const highlighted = analytics.pieRows.find((row) => row.name === activeCategory);

  return (
    <main className="page">
      <div className="page-heading flex items-end justify-between gap-6"><div><p className="eyebrow">COMMERCE / INSIGHTS</p><h1>Analytics</h1><p>A closer look at your catalog, demand, and available stock.</p></div><span className="heading-count">Live overview</span></div>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <CloztLoader label="Loading analytics" /> : error ? null : (
        <>
          {traffic && <>
            <div className="analytics-kpis grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="panel analytics-kpi"><span>Active customers</span><strong>{formatNumber(traffic.activeUsers)}</strong><small>Signed-in visits in the last 30 minutes</small></article>
              <article className="panel analytics-kpi"><span>New sign-ups</span><strong>{formatNumber(traffic.newSignUps)}</strong><small>Last 7 days</small></article>
              <article className="panel analytics-kpi"><span>Sign-ins</span><strong>{formatNumber(traffic.signIns)}</strong><small>Last 7 days</small></article>
              <article className="panel analytics-kpi"><span>Customers</span><strong>{formatNumber(traffic.totalUsers)}</strong><small><Link to="/users">View customer list →</Link></small></article>
            </div>
            <section className="panel analytics-panel traffic-panel mt-5">
              <div className="chart-heading"><p className="eyebrow">AUDIENCE / LAST 7 DAYS</p><h2>Storefront traffic</h2><p>Page views and unique browser sessions per day.</p></div>
              <div className="traffic-bars">{traffic.days.map((day) => <div className="traffic-day" key={day.date} tabIndex={0} title={`${day.date}: ${day.views} views, ${day.visitors} visitors`}><strong>{formatNumber(day.views)}</strong><div className="traffic-track"><span style={{ height: `${Math.max(3, day.views / Math.max(1, ...traffic.days.map((entry) => entry.views)) * 100)}%` }} /></div><small>{new Date(`${day.date}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'short' })}</small><em>{formatNumber(day.visitors)} unique</em></div>)}</div>
            </section>
          </>}
          <div className="analytics-kpis mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="panel analytics-kpi"><span>Products in catalog</span><strong>{formatNumber(products.length)}</strong><small>Across {formatNumber(analytics.categoryCount)} categories</small></article>
            <article className="panel analytics-kpi"><span>Stock available</span><strong>{formatNumber(analytics.stockUnits)}</strong><small>Units across all sizes</small></article>
            <article className="panel analytics-kpi"><span>Units ordered</span><strong>{formatNumber(analytics.orderedUnits)}</strong><small>From {formatNumber(analytics.currentOrders)} active orders</small></article>
            <article className="panel analytics-kpi"><span>Order value</span><strong>{formatCurrency(analytics.orderValue)}</strong><small>Excludes cancelled and refunded orders</small></article>
          </div>

          <div className="analytics-grid mt-5 grid gap-5 xl:grid-cols-2">
            <section className="panel analytics-panel">
              <div className="chart-heading"><p className="eyebrow">CATALOG MIX</p><h2>Products by category</h2><p>Each slice represents a share of your current catalog.</p></div>
              {analytics.pieRows.length ? (
                <div className="pie-layout">
                  <div className="pie-chart" role="img" aria-label={`Product categories: ${analytics.pieRows.map((row) => `${row.name} ${row.products}`).join(', ')}`} style={{ background: `conic-gradient(${analytics.pieGradient})` }}>
                    <div className="pie-center"><strong>{highlighted ? formatNumber(highlighted.products) : formatNumber(products.length)}</strong><span>{highlighted ? highlighted.name : 'Products'}</span></div>
                  </div>
                  <div className="pie-legend">
                    {analytics.pieRows.map((row) => (
                      <button key={row.name} type="button" className="pie-legend-row" onMouseEnter={() => setActiveCategory(row.name)} onMouseLeave={() => setActiveCategory(null)} onFocus={() => setActiveCategory(row.name)} onBlur={() => setActiveCategory(null)}>
                        <span className="legend-dot" style={{ backgroundColor: row.color }} /><span>{row.name}</span><strong>{Math.round(row.products / products.length * 100)}%</strong>
                      </button>
                    ))}
                  </div>
                </div>
              ) : <p className="chart-empty">Add products to see your category mix.</p>}
            </section>

            <section className="panel analytics-panel">
              <div className="chart-heading"><p className="eyebrow">CUSTOMER DEMAND</p><h2>Most ordered products</h2><p>Current products · excludes cancelled and refunded orders.</p></div>
              {analytics.topProducts.length ? <div className="analytics-bars">
                {analytics.topProducts.map((product, index) => (
                  <div className="analytics-bar-row" key={product.id} tabIndex={0} title={`${product.name}: ${formatNumber(product.units)} units ordered`}>
                    <span className="bar-rank">{String(index + 1).padStart(2, '0')}</span>
                    {product.image ? <img src={product.image} alt="" className="bar-image" /> : <span className="bar-image bar-image-empty" />}
                    <div className="bar-content"><div className="bar-label"><span title={product.name}>{product.name}</span><strong>{formatNumber(product.units)} <small>units</small></strong></div><div className="bar-track"><span className="bar-fill" style={{ width: `${product.units / analytics.topProducts[0].units * 100}%` }} /></div></div>
                  </div>
                ))}
              </div> : <p className="chart-empty">Orders will appear here as customers shop your products.</p>}
            </section>

            <section className="panel analytics-panel xl:col-span-2">
              <div className="chart-heading"><p className="eyebrow">INVENTORY</p><h2>Stock by category</h2><p>Available units summed across every product size.</p></div>
              {analytics.inventory.length ? <div className="analytics-inventory">
                {analytics.inventory.map((category, index) => (
                  <div className="inventory-row" key={category.name} tabIndex={0} title={`${category.name}: ${formatNumber(category.stock)} units in stock`}>
                    <div className="bar-label"><span>{category.name}</span><strong>{formatNumber(category.stock)} <small>units</small></strong></div>
                    <div className="bar-track"><span className="bar-fill" style={{ width: `${analytics.inventory[0].stock ? category.stock / analytics.inventory[0].stock * 100 : 0}%`, backgroundColor: colors[index % colors.length] }} /></div>
                  </div>
                ))}
              </div> : <p className="chart-empty">Add products to see inventory distribution.</p>}
            </section>
          </div>
        </>
      )}
    </main>
  );
}
