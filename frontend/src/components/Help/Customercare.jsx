import { Link } from 'react-router-dom';
import careImage from '../../assets/Images/customer-care.jpg';

export default function Customer() {
  return <section className="relative isolate mx-4 mt-8 overflow-hidden rounded-xl bg-[#202320] text-white sm:mx-6 sm:mt-12">
    <img src={careImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#202320]/90 to-[#202320]/30" />
    <div className="mx-auto flex min-h-72 max-w-6xl flex-col justify-center px-6 py-12 sm:min-h-80 sm:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">Clozt / Support</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Customer care</h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-stone-200">Find answers about your orders, delivery, returns, and shopping with Clozt.</p>
      <div className="mt-6 flex flex-wrap gap-3"><a href="#delivery" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#202320]">Browse help topics</a><Link to="/orders" className="rounded-full border border-white/50 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10">View your orders</Link></div>
    </div>
  </section>;
}
