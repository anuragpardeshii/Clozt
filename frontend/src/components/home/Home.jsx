import Category from "./Category";
import Hero from "./Hero";
import MenFashion from "./MenFashion";
import NewArrival from "./NewArrival";
import Sale from "./Sale";
import WomenFashion from "./WomenFashion";
import "./Home.css"
import Trending from "./Trending";
import NewsLetter from "./NewsLetter";

export default function Home() {
  return (
    <>
      <Hero />
      <Category/>
      <NewArrival />
      <MenFashion />
      <WomenFashion />
      <Sale/>
      <Trending/>
      <NewsLetter/>
    </>
  );
}
