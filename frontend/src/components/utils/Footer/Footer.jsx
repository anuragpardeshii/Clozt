import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo/Logo.png';

const linkClass = 'text-sm text-stone-600 transition-colors hover:text-[#202320] hover:underline underline-offset-4';

export default function Footer() {
  return <footer className="border-t border-stone-200 bg-[#eeefeb] text-[#202320]">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:py-16">
      <div><Link to="/" className="inline-flex items-center gap-3"><img src={logo} className="h-9 w-9 object-contain" alt="" /><span className="text-lg font-bold tracking-[0.16em]">CLOZT</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-stone-600">Everyday pieces for a wardrobe that feels like yours.</p></div>
      <nav aria-label="Explore"><h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]">Explore</h2><ul className="grid gap-3"><li><Link to="/men" className={linkClass}>Men</Link></li><li><Link to="/women" className={linkClass}>Women</Link></li><li><Link to="/new-arrival" className={linkClass}>New arrivals</Link></li><li><Link to="/sale" className={linkClass}>Sale</Link></li></ul></nav>
      <nav aria-label="Help and information"><h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]">Help &amp; information</h2><ul className="grid gap-3"><li><Link to="/about" className={linkClass}>About Clozt</Link></li><li><Link to="/customer-care" className={linkClass}>Customer care</Link></li><li><Link to="/customer-care#delivery" className={linkClass}>Delivery help</Link></li><li><Link to="/customer-care#returns" className={linkClass}>Returns help</Link></li></ul></nav>
      <nav aria-label="Your account"><h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]">Your account</h2><ul className="grid gap-3"><li><Link to="/orders" className={linkClass}>Orders</Link></li><li><Link to="/addresses" className={linkClass}>Saved addresses</Link></li><li><Link to="/wishlist" className={linkClass}>Wishlist</Link></li><li><Link to="/cart" className={linkClass}>Your bag</Link></li></ul></nav>
    </div>
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 border-t border-stone-300/70 px-4 py-5 text-xs text-stone-500"><span>© {new Date().getFullYear()} CLOZT</span><span>Made for your everyday.</span></div>
  </footer>;
}
