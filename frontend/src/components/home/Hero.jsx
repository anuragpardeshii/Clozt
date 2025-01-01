import "./Home.css";

export default function Hero() {
  return (
    <section className="relative adjust-height w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/src/assets/Videos/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="flex items-center justify-center w-full h-full text-center relative z-10">
        <div className="px-4 bg-transparent">
          <h1 className="mb-4 font-extrabold text-white text-3xl xs:text-xl sm:text-2xl md:text-5xl lg:text-6xl">
            Closer to Style. Closer to You.
          </h1>
          <p className="mb-8 text-base sm:text-lg md:text-xl font-normal text-gray-300 sm:px-8 md:px-16 lg:px-48">
            At CLOZT, we redefine fashion as more than just clothing—it’s your
            confidence, your creativity, and your identity. Discover
            high-quality, sustainable designs that effortlessly blend modern
            trends with timeless essentials. Join a movement that celebrates
            individuality and brings you closer to your best self every day.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
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

      {/* Overlay (Optional for darker background) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
    </section>
  );
}
