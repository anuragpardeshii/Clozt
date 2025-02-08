import Top from "/src/assets/Images/Women/Top.jpg";
import Shirt from "/src/assets/Images/Women/Shirt.jpeg";
import Denim from "/src/assets/Images/Women/Denim.jpeg";
import Winter from "/src/assets/Images/Women/Winter.jpg";
import backgroundImage from "/src/assets/Images/WomenFashion.jpg";

export default function WomenFashion() {
  return (
    <>
      {/* <div
        className="bg-white dark:bg-gray-900 w-100 bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "50vh",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
            Explore Women Fashion
          </h1>
          <div className="flex justify-center space-y-2 sm:flex-row sm:justify-center ">
            <a
              href="/women"
              className="py-2 px-4 sm:ms-4  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Explore Men Fashion
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
        <a href="/women" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Top}
            alt=""
          />
          <div className="p-2">
            <a href="/women">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                T-shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/women" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Shirt}
            alt=""
          />
          <div className="p-2">
            <a href="/women">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/women" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Denim}
            alt=""
          />
          <div className="p-2">
            <a href="/women">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Denim
              </h5>
            </a>
          </div>
        </a>
        <a href="/women" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Winter}
            alt=""
          />
          <div className="p-2">
            <a href="/women">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Winter Wear
              </h5>
            </a>
          </div>
        </a>
      </div> */}
      <section id="womens_collection" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Women's Collection</h2>
            <a
              href="/women"
              className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
            >
              View All
            </a>
          </div>
          {/* Main categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative group overflow-hidden rounded-lg col-span-2">
              <div className="bg-[url('https://placehold.co/800x600')] h-[600px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Sumer Collection
                </h3>
                <p className="text-white/80 mb-4">
                  Discover our latest summer styles
                </p>
                <a
                  href="/women/summer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative group overflow-hidden rounded-lg">
                <div className="bg-[url('https://placehold.co/400x285')] h-[285px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    Trending Now
                  </h3>
                  <a
                    href="/women/trending"
                    className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <div className="bg-[url('https://placehold.co/400x285')] h-[285px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    Trending Now
                  </h3>
                  <a
                    href="/women/trending"
                    className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tops Category */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${Top})` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-center">Tops</h3>
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
                  style={{ backgroundImage: `url(${Shirt})` }}
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
                  className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${Winter})` }}
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
    </>
  );
}
