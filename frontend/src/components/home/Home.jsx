import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import Hero from "./Hero";
import MenFashion from "./MenFashion";
import NewArrival from "./NewArrival";
import Sale from "./Sale";
import WomenFashion from "./WomenFashion";
import "./Home.css"
import Trending from "./Trending";
import NewsLetter from "./NewsLetter";
import useProductActions from "../Products/useProductActions";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [catalogError, setCatalogError] = useState("");
  const actions = useProductActions();

  useEffect(() => {
    let active = true;
    axios.get("/api/products")
      .then(({ data }) => {
        if (active) setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setCatalogError("Could not load products right now.");
      });
    return () => { active = false; };
  }, []);

  const recentProducts = [...products].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
  const hasListing = (product, listing) => product.listings?.some((value) => value.toLowerCase() === listing);
  const newArrivals = recentProducts.filter((product) => hasListing(product, "new arrivals"));
  const saleProducts = products.filter((product) => hasListing(product, "sale"));
  const featuredProducts = products.filter((product) => hasListing(product, "trending"));

  return (
    <>
      <Hero />
      <Category/>
      {catalogError && <p role="alert" className="mx-auto max-w-6xl px-4 py-6 text-sm text-rose-600">{catalogError}</p>}
      <NewArrival products={newArrivals.slice(0, 5)} actions={actions} />
      <MenFashion />
      <WomenFashion />
      <Sale products={saleProducts.slice(0, 5)} actions={actions} />
      <Trending products={(featuredProducts.length ? featuredProducts : products).slice(0, 8)} actions={actions} />
      <NewsLetter/>
    </>
  );
}
