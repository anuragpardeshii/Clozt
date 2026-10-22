import { Link } from 'react-router-dom';
import casualImage from '../../assets/Images/Men/pexels-luis-felipe-perez-817377805-20509483.jpg';
import streetwearImage from '../../assets/Images/Men/pexels-amar-20508967.jpg';
import topImage from '../../assets/Images/Men/Top.jpeg';
import shirtImage from '../../assets/Images/Men/Shirt2.jpeg';
import denimImage from '../../assets/Images/Men/Denim.jpg';
import winterImage from '../../assets/Images/Men/Winter.jpeg';

const features = [
  { title: 'Casual Collection', image: casualImage, to: '/men/top' },
  { title: 'Streetwear Edit', image: streetwearImage, to: '/men/shirts' },
];

const categories = [
  { name: 'T-shirts', slug: 'top', image: topImage },
  { name: 'Shirts', slug: 'shirts', image: shirtImage },
  { name: 'Denim', slug: 'denim', image: denimImage },
  { name: 'Winter wear', slug: 'winter-wear', image: winterImage },
];

export default function MenFashion() {
  return (
    <section id="mens_collection" className="bg-[#f7f7f4] py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#202320] sm:text-3xl">Men&apos;s Collection</h2>
          <Link to="/men" className="text-xs font-semibold text-stone-600 transition-colors hover:text-[#202320]">View all</Link>
        </div>

        <div className="mb-9 grid gap-4 md:grid-cols-2 md:gap-6">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.to} className="group relative block h-[280px] overflow-hidden rounded-xl bg-stone-200 sm:h-[340px]">
              <img src={feature.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
                <h3 className="text-xl font-semibold sm:text-2xl">{feature.title}</h3>
                <span className="mt-3 inline-flex rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#202320] transition-colors group-hover:bg-[#202320] group-hover:text-white">Shop now</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.slug} to={`/men/${category.slug}`} className="group text-center">
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
