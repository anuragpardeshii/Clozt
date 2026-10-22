import { Link } from 'react-router-dom';
import topImage from '../../assets/Images/Category/Top.jpeg';
import shirtImage from '../../assets/Images/Category/Shirt.jpeg';
import denimImage from '../../assets/Images/Category/Denim.jpeg';
import winterImage from '../../assets/Images/Category/Winter.jpeg';

const categories = [
  { name: 'T-shirts', slug: 'top', image: topImage },
  { name: 'Shirts', slug: 'shirts', image: shirtImage },
  { name: 'Denim', slug: 'denim', image: denimImage },
  { name: 'Winter wear', slug: 'winter-wear', image: winterImage },
];

export default function Category() {
  return <section id="featured_categories" className="bg-[#f7f7f4] py-14 sm:py-16">
    <div className="container mx-auto px-4"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Find your fit</p><h2 className="mt-2 text-2xl font-semibold text-[#202320] sm:text-3xl">Shop by category</h2></div><Link to="/new-arrival" className="text-xs font-semibold text-stone-600 hover:text-[#202320]">Explore new arrivals →</Link></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{categories.map((item) => <Link key={item.slug} to={`/all/${item.slug}`} className="group"><div className="overflow-hidden rounded-xl bg-stone-200"><img src={item.image} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105" /></div><h3 className="mt-3 text-sm font-semibold text-[#202320] sm:text-base">{item.name}</h3><span className="mt-1 inline-block text-xs text-stone-500 group-hover:underline">Shop category →</span></Link>)}</div>
    </div>
  </section>;
}
