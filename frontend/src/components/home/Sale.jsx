export default function Sale() {
  return (
    <>
      <div
        className="bg-white dark:bg-gray-900 w-100 height-wall bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('/src/assets/images/sale.jpg')",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <div className="flex">
            <h1
              className="mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-6xl dark:text-white"
              style={{ color: "red" }}
            >
              SALE
            </h1>
            <div className="py-3 px-4">
              <span
                className="mb-4 leading-none text-white dark:text-white text-md font-bold"
                style={{
                  color: "white",
                  background: "red",
                  padding: ".2rem .8rem",
                  borderRadius: "2rem",
                  letterSpacing: "initial",
                }}
              >
                LIVE <sup>&#x2022;</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-4 p-8">
        <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
            src="/src/assets/Images/Category/Top.jpeg"
            alt=""
          />
          <div className="p-2">
            <a href="#">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                T-shirts
              </h5>
            </a>
          </div>
        </a>
        <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
            src="/src/assets/Images/Category/Shirt.jpeg"
            alt=""
          />
          <div className="p-2">
            <a href="#">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Shirts
              </h5>
            </a>
          </div>
        </a>
        <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
            src="/src/assets/Images/Category/Denim.jpeg"
            alt=""
          />
          <div className="p-2">
            <a href="#">
              <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Denim
              </h5>
            </a>
          </div>
        </a>
        <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
            src="/src/assets/Images/Category/Winter.jpeg"
            alt=""
          />
          <div className="p-2">
            <a href="#">
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
