import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HomeProductCard from "./HomeProductCard";

export default function NewArrival({ products, actions }) {
  if (!products.length) return null;

  return (
    <section id="new_arrivals" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">New Arrival</h2>
          <Link to="/new-arrival" className="text-xs font-semibold text-gray-600 transition-colors hover:text-rose-500">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
          {products.map((product) => <HomeProductCard key={product._id} product={product} actions={actions} badge="New" />)}
        </div>
      </div>
    </section>
  );
}

NewArrival.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
};
