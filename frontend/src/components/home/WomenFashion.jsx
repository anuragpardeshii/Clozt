export default function WomenFashion() {
    return (
      <>
        <div
          className="bg-white dark:bg-gray-900 h-screen bg-cover flex items-center justify-center"
          style={{
            
            backgroundImage:
              "url('/src/assets/images/WomenFashion.jpg')",
          }}
        >
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
              Explore Women Fashion
            </h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="#"
                className="py-3 px-5 sm:ms-4  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Explore Men Fashion
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-around gap-8 p-8">
          <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-5"
              src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/oct-2024/28-brands-update/ww/promo_bau_hp_ww_01.jpg"
              alt=""
            />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
            </div>
          </a>
          <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-5"
              src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/oct-2024/28-brands-update/ww/promo_bau_hp_ww_01.jpg"
              alt=""
            />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
            </div>
          </a>
          <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-5"
              src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/oct-2024/28-brands-update/ww/promo_bau_hp_ww_01.jpg"
              alt=""
            />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
            </div>
          </a>
          <a className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-5"
              src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/oct-2024/28-brands-update/ww/promo_bau_hp_ww_01.jpg"
              alt=""
            />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
            </div>
          </a>
        </div>
      </>
    );
  }
  