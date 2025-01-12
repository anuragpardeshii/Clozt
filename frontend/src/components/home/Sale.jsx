import backgroundImage from "/src/assets/images/sale.jpg"
import Top from "/src/assets/Images/Sale/Top.jpg";
import Shirt from "/src/assets/Images/Sale/Shirt.jpeg";
import Denim from "/src/assets/Images/Sale/Denim.jpeg";
import Winter from "/src/assets/Images/Sale/Winter.jpeg";

export default function Sale() {
  return (
    <>
      <div
        className="bg-white dark:bg-gray-900 w-100 height-wall bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "40vh"
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
        <a href="/men" className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
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
            className="m-5"
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
            className="m-5"
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
            className="m-5"
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
      </div>
    </>
  );
}
