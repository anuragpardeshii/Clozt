import React from "react";

export default function NewsLetter() {
  return (
    <>
      <section id="newsletter" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              {/* fa-regular fa-envelope text-4xl mb-4 envelope */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to our Newsletter
              </h2>
              <p className="text-gray-400 mb-8">
                Stay updated with our latest trends, style tips and exclusive
                offers.
              </p>
            </div>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    required
                    fdprocessedid="xn4o5s"
                  />
                </div>
                <button
                  type="submit"
                  fdprocessedid="eko5f7"
                  className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  {/* <i className='fa-solid fa-arrow-right'></i> */}
                </button>
              </div>
            </form>
            <div className="mt-8 text-sm text-gray-400">
              <p>By subscribing you agree to our
                <a href="/privacy" className="underline hover:text-white"></a> </p>
            </div>
            <div className="mt-12 flex justify-center space-x-6">
                <a href="" className="text-gray-400 hover:text-white transition-colors">i </a>
                <a href="" className="text-gray-400 hover:text-white transition-colors">f </a>
                <a href="" className="text-gray-400 hover:text-white transition-colors">X </a>
                <a href="" className="text-gray-400 hover:text-white transition-colors">P </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
