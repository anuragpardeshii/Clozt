import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Customer from './Customercare';
import Faq from './Faq';

export default function Help() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const frame = window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return <main className="min-h-screen bg-[#f7f7f4]"><div className="mx-auto max-w-7xl"><Customer /><Faq /></div></main>;
}
