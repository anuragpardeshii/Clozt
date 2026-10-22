import PropTypes from "prop-types";
import HomeProductCard from "./HomeProductCard";

export default function Trending({ products, actions }) {
  if (!products.length) return null;

  return (
    <section id="trending_items" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">More to Explore</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 md:gap-6">
          {products.map((product) => (
            <div key={product._id} className="w-[220px] shrink-0 sm:w-[260px]">
              <HomeProductCard product={product} actions={actions} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Trending.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
};
