import { Link } from 'react-router-dom';

export default function NewsLetter() {
  return <section className="bg-[#202320] px-4 py-16 text-white"><div className="mx-auto max-w-3xl text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">Stay close to style</p><h2 className="mt-3 text-3xl font-semibold">Find your next favorite piece.</h2><p className="mt-4 text-sm leading-6 text-stone-300">Explore new arrivals and considered everyday essentials, curated for the way you dress.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/new-arrival" className="rounded-full bg-white px-6 py-3 text-xs font-semibold text-[#202320] hover:bg-stone-200">Shop new arrivals</Link><Link to="/about" className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold hover:bg-white/10">About Clozt</Link></div></div></section>;
}
