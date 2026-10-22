import { Link } from 'react-router-dom';
import summerImage from '../../assets/Images/diversity.jpg';
import eveningImage from '../../assets/Images/WomenFashion.jpg';
import trendingImage from '../../assets/Images/Women/Top1.jpeg';
import topImage from '../../assets/Images/Women/Top.jpg';
import shirtImage from '../../assets/Images/Women/Shirt.jpeg';
import denimImage from '../../assets/Images/Women/Denim.jpeg';
import winterImage from '../../assets/Images/Women/Winter.jpg';

const features = [
  { title: 'Trending now', image: eveningImage, to: '/women/shirts' },
  { title: 'Trending now', image: trendingImage, to: '/women/top' },
];

const categories = [
  { name: 'T-shirts', slug: 'top', image: topImage },
  { name: 'Shirts', slug: 'shirts', image: shirtImage },
  { name: 'Denim', slug: 'denim', image: denimImage },
  { name: 'Winter wear', slug: 'winter-wear', image: winterImage },
];

export default function WomenFashion() {
  return (
    <section id="womens_collection" className="bg-white py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#202320] sm:text-3xl">Women&apos;s Collection</h2>
          <Link to="/women" className="text-xs font-semibold text-stone-600 transition-colors hover:text-[#202320]">View all</Link>
        </div>

        <div className="mb-9 grid gap-4 lg:grid-cols-3 lg:gap-6">
          <Link to="/women" className="group relative block h-[360px] overflow-hidden rounded-xl bg-stone-200 lg:col-span-2 lg:h-[520px]">
            <img src={summerImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <h3 className="text-xl font-semibold sm:text-2xl">Summer Collection</h3>
              <p className="mt-1 text-xs text-white/85 sm:text-sm">Discover our latest summer styles</p>
              <span className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#202320] transition-colors group-hover:bg-[#202320] group-hover:text-white">Shop now</span>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6">
            {features.map((feature) => (
              <Link key={feature.to} to={feature.to} className="group relative block h-[180px] overflow-hidden rounded-xl bg-stone-200 sm:h-[220px] lg:h-[248px]">
                <img src={feature.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white sm:bottom-6 sm:left-6">
                  <h3 className="text-sm font-semibold sm:text-base">{feature.title}</h3>
                  <span className="mt-1 inline-block text-xs text-white/85 group-hover:underline">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.slug} to={`/women/${category.slug}`} className="group text-center">
              <div className="overflow-hidden rounded-xl bg-stone-200">
                <img src={category.image} alt="" loading="lazy" className="aspect-[9/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#202320] sm:text-base">{category.name}</h3>
              <span className="mt-1 inline-block text-xs text-stone-500 group-hover:underline">Shop now →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
