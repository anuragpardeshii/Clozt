import "./Home.css";
import video from "/src/assets/Videos/video1.mp4";

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
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container mx-auto px-12 h-full flex items-center relative z-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Closer to Style. Closer to You.</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">At CLOZT, we redefine fashion as more than just clothing—it’s your
            confidence, your creativity, and your identity. Discover
            high-quality, sustainable designs that effortlessly blend modern
            trends with timeless essentials. Join a movement that celebrates
            individuality and brings you closer to your best self every day.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/new-arrival" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-300">Shop New Arrival</a>
            <a href="/sale" className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300">Sale</a>
          </div>
        </div>
      </div>


      {/* Foreground Content
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
      </div> */}

      {/* Overlay (Optional for darker background) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
    </section>
  );
}
