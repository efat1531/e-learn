const Instructor = () => {
  return (
    <section id="instructor" className="py-16">
      <div className="container">
        {/* <!-- Section Header Start --> */}
        <div className="section-header">
          <h2>Instructor</h2>
        </div>
        {/* <!-- Section Header End --> */}
        {/* <!-- Instructor Item Start --> */}
        <div className="w-72 mx-auto bg-white border">
          {/* <!-- Instructor Image Box --> */}
          <div className="course-img-box">
            <img
              src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
            />
          </div>
          {/* <!-- Instructor Details --> */}
          <div className="grid">
            <div className="text-center p-4">
              <p className="font-semibold">Mahdi Ahmed</p>
              <p className="text-gray-400 mt-1">English Lecturer</p>
            </div>
            <div className="flex justify-between px-4 py-2 border-t">
              {/* <!-- Course Rating --> */}
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-star text-yellow-500"></i>
                <span>5.0</span>
              </div>
              {/* <!-- Course Statistics --> */}
              <div className="flex gap-1">
                <span className="font-semibold">216k</span>
                <span className="text-gray-500">students</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Instructor Item End --> */}
      </div>
    </section>
  );
};

export default Instructor;
