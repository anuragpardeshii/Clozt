export default function MenFashion() {
  return (
    <>
      <div
        className="bg-white dark:bg-gray-900 w-100 height-wall bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/048/986/963/large_2x/trendy-male-fashion-model-in-sandy-beige-suit-elegant-portrait-with-fashionable-lifestyle-background-suitable-for-modern-fashion-campaigns-free-photo.jpg')",
            minHeight: "40vh",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
            Explore Men Fashion
          </h1>
          <div className="flex justify-center space-y-2 sm:flex-row sm:justify-center ">
            <a
              href="#"
              className="py-2 px-4 sm:ms-4  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Explore Men Fashion
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
        <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            className="m-5"
            src="/src/assets/Images/Men/Top.jpeg"
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
            src="/src/assets/Images/Men/Shirt2.jpeg"
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
            src="/src/assets/Images/Men/Denim.jpg"
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
            src="/src/assets/Images/Men/Winter.jpg"
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
