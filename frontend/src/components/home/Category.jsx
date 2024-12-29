import "./Home.css";

export default function Category() {
  return (
    <>
      <div
        className="font-bold marquee-container"
        style={{
          backgroundColor: "yellow",
          color: "black",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div >
          <marquee>
            FLAT Rs 500 OFF* &nbsp; USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* &nbsp;
            USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* &nbsp;
            USE CODE : FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            FLAT Rs 500 OFF* USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF* USE CODE: FIRST500
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; FLAT Rs 500 OFF*
            USE CODE: FIRST500 &nbsp;&nbsp;&nbsp;&nbsp;
            </marquee>
        </div>
      </div>

      <div
        className="bg-white dark:bg-gray-900 bg-cover flex flex-wrap items-center justify-center"
        style={{backgroundColor: "#f5f5f5"}}
      >
        <div className="py-8 px-4 mx-auto text-center">
          <h1
            className="mb-4 font-extrabold text-black 
             text-3xl xs:text-xl sm:text-2xl md:text-5xl lg:text-6xl"
          >
            Shop by Category
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 justify-around gap-6 p-8">
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
