import backgroundImage from "/src/assets/Images/Sale.jpg";
import Top from "/src/assets/Images/Sale/Top.jpg";
import Shirt from "/src/assets/Images/Sale/Shirt.jpeg";
import Denim from "/src/assets/Images/Sale/Denim.jpeg";
import Winter from "/src/assets/Images/Sale/Winter.jpeg";

export default function Sale() {
  return (
    <>
      {/* <div
        className="bg-white dark:bg-gray-900 w-100 bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "50vh"
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <div className="flex">
            <h1
              className="mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-6xl dark:text-white"
              style={{ color: "red" }}
            >
              SALE IS LIVE
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
        <a href="/sale" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Top}
            alt=""
          />
          <div className="p-2">
            <a href="/sale">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                T-shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/sale" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Shirt}
            alt=""
          />
          <div className="p-2">
            <a href="/sale">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/sale" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Denim}
            alt=""
          />
          <div className="p-2">
            <a href="/sale">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Denim
              </h5>
            </a>
          </div>
        </a>
        <a href="/sale" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Winter}
            alt=""
          />
          <div className="p-2">
            <a href="/sale">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Winter Wear
              </h5>
            </a>
          </div>
        </a>
      </div> */}
      <div id="sale_section" className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-red-600 font-medium mb-2 inline-block"></span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Season End Sale
            </h2>
            <p className="text-gray-600">Up to 70% off on selected items</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group rounded-lg">
              <div className="relative overflow-hidden mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/7b/d2/39/7bd239a21d52404251386526461a82c0.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -40%
                  </span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                    fdprocessedid="k2lm5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <h3 className="font-medium">Denim Jacket</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-600 font-medium">Rs. 1299</span>
                <span className="text-gray-400 line-through text-sm">
                  Rs. 699
                </span>
              </div>
            </div>

            <div className="group rounded-lg">
              <div className="relative overflow-hidden mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/10/95/36/109536cc353bb3ff9e9243295b423787.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -40%
                  </span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                    fdprocessedid="k2lm5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <h3 className="font-medium">Denim Jacket</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-600 font-medium">Rs. 1299</span>
                <span className="text-gray-400 line-through text-sm">
                  Rs. 699
                </span>
              </div>
            </div>

            <div className="group rounded-lg">
              <div className="relative overflow-hidden mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/ff/af/38/ffaf38afd49826c7a48b9a826c436ffc.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -40%
                  </span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                    fdprocessedid="k2lm5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <h3 className="font-medium">Denim Jacket</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-600 font-medium">Rs. 1299</span>
                <span className="text-gray-400 line-through text-sm">
                  Rs. 699
                </span>
              </div>
            </div>

            <div className="group rounded-lg">
              <div className="relative overflow-hidden mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/f4/11/d8/f411d89aef4d0cead9197afaa89897dc.jpg')] h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -40%
                  </span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
                    fdprocessedid="k2lm5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <h3 className="font-medium">Denim Jacket</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-600 font-medium">Rs. 1299</span>
                <span className="text-gray-400 line-through text-sm">
                  Rs. 699
                </span>
              </div>
            </div>
          </div>
            <div className="text-center mt-12">
              <a href="/sale" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">View All Sale Items</a>
            </div>
        </div>
      </div>
    </>
  );
}
