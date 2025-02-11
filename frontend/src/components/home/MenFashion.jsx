import Top from "/src/assets/Images/Men/Top.jpeg";
import Shirt from "/src/assets/Images/Men/Shirt2.jpeg";
import Denim from "/src/assets/Images/Men/Denim.jpg";
import Winter from "/src/assets/Images/Men/Winter.jpeg";

export default function MenFashion() {
  return (
    <>
      {/* <div
        className="bg-white dark:bg-gray-900 w-100 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/048/986/963/large_2x/trendy-male-fashion-model-in-sandy-beige-suit-elegant-portrait-with-fashionable-lifestyle-background-suitable-for-modern-fashion-campaigns-free-photo.jpg')",
            minHeight: "50vh",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
            Explore Men Fashion
          </h1>
          <div className="flex justify-center space-y-2 sm:flex-row sm:justify-center ">
            <a
              href="/men"
              className="py-2 px-4 sm:ms-4  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Explore Men Fashion
            </a>
          </div>
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
        <a 
        href="/men"
        className="bg-white dark:bg-gray-800 dark:border-gray-700">
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
      <section id="mens_collection" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Men's Collection</h2>
            <a
              href="/men"
              className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
            >
              View All
              {/* Right arrow */}
            </a>
          </div>
          {/* Featured Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative group overflow-hidden rounded-lg">
              <div className="bg-[url('https://images.pexels.com/photos/30186077/pexels-photo-30186077/free-photo-of-stylish-man-with-tattoos-wearing-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Casual Collection
                </h3>
                <a
                  href="/men"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <div className="bg-[url('https://images.pexels.com/photos/10264891/pexels-photo-10264891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Casual Collection
                </h3>
                <a
                  href="/men"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tops Category */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <div
                  className="bg-[url('https://i.pinimg.com/736x/dc/ae/b1/dcaeb15360561a657016a9003731d097.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
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
                  className="bg-[url('https://images.pexels.com/photos/19461514/pexels-photo-19461514/free-photo-of-back-view-of-man-in-shirt-and-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  // style={{ backgroundImage: `url(${Shirt})` }}
                  // https://images.pexels.com/photos/19461514/pexels-photo-19461514/free-photo-of-back-view-of-man-in-shirt-and-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
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
                  className="bg-[url('https://i.pinimg.com/736x/d1/03/93/d1039330aa936dcfe83a46da257f4c19.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  // style={{ backgroundImage: `url(${Denim})` }}
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
                  className="bg-[url('https://i.pinimg.com/736x/79/de/84/79de84bea14c182a521b437408355437.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
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
    </>
  );
}
