import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HomeProductCard from "./HomeProductCard";

export default function Sale({ products, actions }) {
  if (!products.length) return null;

  return (
    <section id="sale_section" className="bg-rose-50/60 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">Season End Sale</h2>
          <p className="mt-2 text-sm text-gray-600">Selected styles at special prices</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
          {products.map((product) => <HomeProductCard key={product._id} product={product} actions={actions} badge="Sale" />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/sale" className="inline-flex rounded-full bg-gray-900 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700">View all sale items</Link>
        </div>
      </div>
    </section>
  );
}

Sale.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
};
