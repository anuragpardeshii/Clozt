import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const initialState = { products: [], total: 0, loading: true, loadingMore: false, hasMore: true, error: '' };

export default function useInfiniteProducts(path, filters = {}) {
  const filterKey = JSON.stringify(filters);
  const [state, setState] = useState(initialState);
  const sentinelRef = useRef(null);
  const loadRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let page = 0;
    let inFlight = false;
    let hasMore = true;
    setState(initialState);

    const load = async () => {
      if (inFlight || !hasMore || controller.signal.aborted) return;
      inFlight = true;
      setState((current) => ({ ...current, loading: page === 0, loadingMore: page > 0, error: '' }));
      try {
        const { data } = await axios.get(path, {
          params: { ...JSON.parse(filterKey), page: page + 1, limit: 12 },
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        const nextProducts = Array.isArray(data.products) ? data.products : [];
        page += 1;
        hasMore = Boolean(data.hasMore) && nextProducts.length > 0;
        setState((current) => {
          const seen = new Set(current.products.map((product) => product._id));
          const unique = nextProducts.filter((product) => !seen.has(product._id));
          return { products: [...current.products, ...unique], total: data.total ?? current.total, loading: false, loadingMore: false, hasMore, error: '' };
        });
      } catch (error) {
        if (!axios.isCancel(error) && !controller.signal.aborted) {
          setState((current) => ({ ...current, loading: false, loadingMore: false, error: error.response?.data?.message || 'Could not load products. Please try again.' }));
        }
      } finally {
        inFlight = false;
      }
    };

    loadRef.current = load;
    load();
    return () => {
      controller.abort();
      loadRef.current = null;
    };
  }, [path, filterKey]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !state.hasMore || state.loading || state.loadingMore || state.error) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadRef.current?.();
    }, { rootMargin: '450px 0px' });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [state.products.length, state.hasMore, state.loading, state.loadingMore, state.error]);

  return { ...state, sentinelRef, retry: () => loadRef.current?.() };
}
