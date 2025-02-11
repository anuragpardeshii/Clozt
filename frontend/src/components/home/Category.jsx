import Top from "/src/assets/Images/Category/Top.jpeg";
import Shirt from "/src/assets/Images/Category/Shirt.jpeg";
import Denim from "/src/assets/Images/Category/Denim.jpeg";
import Winter from "/src/assets/Images/Category/Winter.jpeg";
import "./Home.css";

export default function Category() {
  return (
    <>
      <div
        className="font-bold marquee-container"
        style={{
          backgroundColor: "yellow",
          color: "black",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div>
          <marquee>
            FLAT Rs 500 OFF* &nbsp; USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* &nbsp;
            USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* &nbsp;
            USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
          </marquee>
        </div>
      </div>

      <section id="featured_categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tops Category */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="bg-[url('https://i.pinimg.com/736x/8b/b1/80/8bb1806f674cc13a0e636615c3712020.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  // style={{ backgroundImage: `url(${Top})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-center">T-shirts</h3>
              <div className="flex justify-center mt-2">
                <a
                  href=""
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  Shop Now {/*right arrow*/}{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="bg-[url('https://i.pinimg.com/736x/c0/48/78/c04878e6254d3d0d166102fbf242904e.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  // style={{ backgroundImage: `url(${Shirt})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-center">Shirts</h3>
              <div className="flex justify-center mt-2">
                <a
                  href=""
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  Shop Now {/*right arrow*/}{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${Denim})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-center">Denim</h3>
              <div className="flex justify-center mt-2">
                <a
                  href=""
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  Shop Now {/*right arrow*/}{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="bg-[url('https://i.pinimg.com/736x/25/b3/d1/25b3d152aba0c3490240aa69fb3cc664.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  // style={{ backgroundImage: `url(${Winter})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-center">Winter Wear</h3>
              <div className="flex justify-center mt-2">
                <a
                  href=""
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  Shop Now {/*right arrow*/}{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div
        className="bg-white dark:bg-gray-900 bg-cover flex flex-wrap items-center justify-center"
        style={{backgroundColor: "#f5f5f5", height: "30vh"}}
      >
        <div className="py-8 px-4 mx-auto text-center">
          <h1
            className="mb-4 font-extrabold text-black 
             text-4xl xs:text-xl sm:text-2xl md:text-5xl lg:text-6xl"
          >
            Shop by Category
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
        <a href="/men" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Top}
            alt=""
          />
          <div className="p-2">
            <a href="/men">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                T-shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/men" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Shirt}
            alt=""
          />
          <div className="p-2">
            <a href="/men">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/men" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Denim}
            alt=""
          />
          <div className="p-2">
            <a href="/men">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Denim
              </h5>
            </a>
          </div>
        </a>
        <a href="/men" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Winter}
            alt=""
          />
          <div className="p-2">
            <a href="/men">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Winter Wear
              </h5>
            </a>
          </div>
        </a>
      </div> */}
    </>
  );
}
