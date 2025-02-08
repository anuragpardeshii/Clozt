import Top from "/src/assets/Images/New/Top.jpg";
import Shirt from "/src/assets/Images/New/Shirt.jpeg";
import Denim from "/src/assets/Images/New/Denim.jpg";
import Winter from "/src/assets/Images/New/Winter.jpg";
import backgroundImage from "/src/assets/Images/new.jpg"

export default function NewArrival() {
  return (
    <>
      <section id="new_arrivals" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrival</h2>
            <a href="/new-arrival" className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">View All {/* right arrow*/}</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group">
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <div className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg" style={{ backgroundImage: `url(${Top})`}} ></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors" fdprocessedid="5907hd">
                    {/* bag icon */}
                    Add to cart
                  </button>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  {/* Heart icon */}
                </button>
              </div>
              <h3 className="font-medium">Black Tshirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>
            <div className="group">
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <div className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg" style={{ backgroundImage: `url(${Shirt})`}}></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors" fdprocessedid="5907hd">
                    {/* bag icon */}
                    Add to cart
                  </button>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  {/* Heart icon */}
                </button>
              </div>
              <h3 className="font-medium">Black Tshirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <div className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg" style={{ backgroundImage: `url(${Denim})`}}></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors" fdprocessedid="5907hd">
                    {/* bag icon */}
                    Add to cart
                  </button>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  {/* Heart icon */}
                </button>
              </div>
              <h3 className="font-medium">Black Tshirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <div className="h-[400px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500 rounded-lg" style={{ backgroundImage: `url(${Winter})`}}></div>
                <div className="absolute top-4 left-4 rounded-lg">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors" fdprocessedid="5907hd">
                    {/* bag icon */}
                    Add to cart
                  </button>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  {/* Heart icon */}
                </button>
              </div>
              <h3 className="font-medium">Black Tshirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>
            
          </div>
        </div>
      </section>
      {/* <div
        className="bg-white dark:bg-gray-900 w-100 bg-cover flex items-center justify-center"
        style={{
          
          backgroundImage: `url(${backgroundImage})`,
            minHeight: "50vh",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
            Explore New Arrival
          </h1>
          <div className="flex justify-center space-y-2 sm:flex-row sm:justify-center ">
            <a
              href="/new-arrival"
              className="py-2 px-4 sm:ms-4  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Explore New Arrival
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
        <a href="/new-arrival" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Top}
            alt=""
          />
          <div className="p-2">
            <a href="/new-arrival">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                T-shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/new-arrival" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Shirt}
            alt=""
          />
          <div className="p-2">
            <a href="/new-arrival">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Shirts
              </h5>
            </a>
          </div>
        </a>
        <a href="/new-arrival" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Denim}
            alt=""
          />
          <div className="p-2">
            <a href="/new-arrival">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Denim
              </h5>
            </a>
          </div>
        </a>
        <a href="/new-arrival" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className=""
            src={Winter}
            alt=""
          />
          <div className="p-2">
            <a href="/new-arrival">
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
