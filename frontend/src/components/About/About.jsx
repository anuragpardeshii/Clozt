export default function About() {
  return (
    <>
      <div className="mx-auto px-8" style={{ maxWidth: "90rem", marginTop: "6rem" }}>
        <div
          className="rounded-lg mx-auto"
          style={{
            backgroundImage: `url("/src/assets/Images/about.jpg")`,
            backgroundSize: "cover", // Optional: To ensure the image covers the div
            backgroundPosition: "center", // Optional: To center the image
            height: "22rem",
            marginBottom: "3rem",
          }}
        >
          <div
            className="flex  flex-col gap-8 justify-center"
            style={{ height: "22rem" }}
          >
            <h1
              className="mb-4 font-extrabold text-white 
             text-3xl xs:text-xl sm:text-2xl md:text-5xl text-center lg:text-6xl"
            >
              About us
            </h1>
            <div>
              <h1
                className="mb-4 font-medium max-w-4xl mx-auto text-white 
             text-xl xs:text-md sm:text-lg md:text-xl text-center lg:text-xl"
              >
                We are a worldwide network of brands and businesses, empowering
                customers across the globe to express their individuality
                through fashion and design with a focus on sustainability.
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center" style={{ maxWidth: "70rem", margin: "5rem auto" }}>
          <h1 className="mb-4 text-3xl text-gray-900 md:text-5xl lg:text-5xl dark:text-white text-center">
            Who we are?
          </h1>
          <img
            className="mx-auto mx-4"
            src="/src/assets/Images/we.png"
            alt=""
            style={{ margin: "3rem auto" }}
          />
          <p className="mb-4 mx-4 text-gray-700">
            CLOZT was created to empower individuals to express their unique
            style effortlessly. The name reflects being "close" to wardrobe
            essentials and modern trends. At CLOZT, fashion goes beyond
            clothing—it's about confidence, creativity, and identity. We blend
            high-quality apparel with accessible, sustainable designs for all
            occasions, from casual to elegant.
          </p>
          <p className="mb-4 mx-4 text-gray-700">
            Our mission is to celebrate individuality, foster inclusivity, and
            embrace change. CLOZT is more than a brand; it's a movement to bring
            you closer to your best self every day.
          </p>
          <div style={{ margin: "3rem" }}>
            <a className="border border-gray-300 p-4 m-4" href="">
              Read more about our business
            </a>
          </div>
        </div>
        <div className="mx-auto" style={{ maxWidth: "70rem" }}>
          <div
            className="flex flex-row gap-4 flex-wrap items-center p-8 mx-auto"
            style={{ background: "#FCF4DA", justifyContent: "space-evenly", margin: "4rem auto" }}
          >
            <div className="" style={{maxWidth: "33rem"}}>
              <h1 className="mb-6 text-3xl mx-4 text-gray-700">
                This is our way
              </h1>
              <p className="mb-4 mx-4 text-gray-700">
                We are dedicated to upholding all external regulations in the
                regions where we operate and to always doing the right thing.
                Maintaining consistency and a strong ethical foundation is
                essential for CLOZT to remain a trusted company and
                partner—valued by customers, respected by society, and a
                workplace we can all take pride in.
              </p>
              <p className="mb-4 mx-4 text-gray-700">
                The "Our Way" document encapsulates CLOZT's culture, values,
                policies, and guidelines. It defines who we are, what we stand
                for, and how we operate.
              </p>
            </div>
            <div className="">
              <div className="p-2">
                <img
                  src="/src/assets/Images/way.jpg"
                  alt="Way"
                  style={{ width: "20rem" }}
                />
              </div>
              <div
                className="border border-gray-300 p-4 px-8 text-center"
                style={{ margin: "1rem" }}
              >
                <a className="" href="">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-4" style={{ maxWidth: "70rem", margin: "3rem auto" }}>
          <div>
            <img src="/src/assets/Images/History.jpg" alt="" />
            <h1 className="mb-6 mt-6 text-2xl text-gray-700">Our Story</h1>
            <p className="mb-6 text-gray-700">From a single store in 1947 we became a family of brands, offering fashion and design to customers worldwide.</p>
            <p className="mb-6 text-gray-700 font-medium"><a href="">Our history &gt; </a></p>
          </div>
          <div>
            <img src="/src/assets/Images/values.jpg" alt="" />
            <h1 className="mb-6 mt-6 text-2xl text-gray-700">Living our values</h1>
            <p className="mb-6 text-gray-700">At H&M Group, we are guided by shared values. They are part of who we are, what we stand for and how we act.</p>
            <p className="mb-6 text-gray-700 font-medium"><a href="">Our values &gt; </a></p>
          </div>
          <div>
            <img src="/src/assets/Images/diversity.jpg" alt="" />
            <h1 className="mb-6 mt-6 text-2xl text-gray-700">Inclusion & Diversity</h1>
            <p className="mb-6 text-gray-700">We are a value-driven company that wants to lead the way to a more inclusive and diverse fashion industry.</p>
            <p className="mb-6 text-gray-700 font-medium"><a href="">Inclusion & diversity &gt; </a></p>
          </div>
        </div>
        <div className="border text-center border-gray-100 px-2 mx-auto" style={{  margin: "3rem auto", backgroundColor: "#f5f5f5" }}>
            <h1 className="mb-6 mt-6 text-2xl text-gray-700">Read more in our Annual and Sustainability Report 2023</h1>
            <div style={{ margin: "3rem" }}>
            <a className="border border-gray-100 md:text-lg bg-white p-4 m-4" href="">
              Read more about our business
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
