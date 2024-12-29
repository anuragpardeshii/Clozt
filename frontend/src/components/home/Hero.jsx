import "./Home.css";

export default function Hero() {
  return (
    <section
      className="bg-center bg-no-repeat adjust-height bg-[url('/src/assets/Videos/video1.mp4')] bg-gray-700 bg-blend-multiply"
      style={{ width: "100%"  }}
    >
      <video
        autoPlay
        loop
        muted
        className="absolute object-cover"
        style={{ width: "100%", height: "100%" }}
      >
        <source
          src="/src/assets/Videos/video1.mp4"
          type="video/mp4"
          style={{ zIndex: "1" }}
        />
        Your browser does not support the video tag.
      </video>
      <div className="flex items-center justify-center adjust-height" style={{height: "100vh"}}>
      <div
        className="px-4 bg-transparent text-center relative"
        style={{ zIndex: "100" }}
      >
        <h1
          className="mb-4 font-extrabold text-white 
             text-3xl xs:text-xl sm:text-2xl md:text-5xl lg:text-6xl"
          style={{ zIndex: "100" }}
        >
          We invest in the world’s potential
        </h1>
        <p
          className="mb-8 text-base sm:text-lg md:text-xl font-normal text-gray-300 
             sm:px-8 md:px-16 lg:px-48"
          style={{ zIndex: "100" }}
        >
          Here at Flowbite, we focus on markets where technology, innovation,
          and capital can unlock long-term value and drive economic growth.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <div>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          </div>
          <div>
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Learn more
          </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
