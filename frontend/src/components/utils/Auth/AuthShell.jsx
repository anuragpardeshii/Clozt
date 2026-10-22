import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImage from '../../../assets/Images/about.jpg';

export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return <main className="min-h-screen bg-[#f7f7f4] px-4 py-6 text-[#202320] sm:px-6 lg:py-10">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between"><Link to="/" className="text-2xl font-semibold tracking-[-0.08em]">CLOZT</Link><Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 transition-colors hover:text-[#202320]"><ArrowLeft size={14} aria-hidden="true" /> Back to shop</Link></div>
      <div className="grid overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_70px_rgba(32,35,32,0.06)] lg:min-h-[690px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-[#202320] lg:block"><img src={aboutImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" /><div className="absolute inset-0 bg-gradient-to-t from-[#202320]/95 via-[#202320]/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-10 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Closer to style</p><p className="mt-4 max-w-sm text-3xl font-medium leading-tight">A wardrobe that feels like you.</p><p className="mt-3 max-w-xs text-sm leading-6 text-white/75">Thoughtful pieces, easy shopping, and a space for your own point of view.</p></div></div>
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 lg:py-14"><div className="w-full max-w-md"><p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64776a]">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><p className="mt-3 text-sm leading-6 text-stone-500">{description}</p><div className="mt-8">{children}</div><div className="mt-8 border-t border-stone-100 pt-6 text-sm text-stone-600">{footer}</div></div></div>
      </div>
      <p className="mt-5 text-center text-[11px] text-stone-400">CLOZT · Style made personal</p>
    </div>
  </main>;
}

AuthShell.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};
