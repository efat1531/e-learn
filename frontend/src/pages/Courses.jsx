import { useState, useEffect } from "react";
// import courses from "../../Data/courseData.json";
import CourseCard from "../components/Common/CourseCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CustomSelect from "../components/ui/CustomSelect";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllCourseQuery } from "../features/api/courseApiSlice";
import { setAllCourses, setSingleCourse } from "../features/courseSlice";

const Courses = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, error, isLoading } = useFetchAllCourseQuery();
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.course);

  const [newCourses, setNewCourses] = useState(courses);

  useEffect(() => {
    if (data) {
      dispatch(setAllCourses(data.data));
      setNewCourses(data.data);
    }
  }, [data, dispatch]);

  const categoryOptions = courses.map((course) => ({
    value: "category",
    label: "Hello My",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  }));

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setNewCourses(
  //       courses.filter(
  //         (course) => course.category.name === selectedCategory.value
  //       )
  //     );
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    setNewCourses((prevCourses) => {
      return [...prevCourses].sort((a, b) => {
        if (selectedOption) {
          switch (selectedOption.value) {
            case "trending":
              return b.rating - a.rating;
            case "newest":
              return b.createAt - a.createAt;
            case "priceHigh":
              return (
                calculatedPrice(b.price, b.discount) -
                calculatedPrice(a.price, a.discount)
              );
            case "priceLow":
              return (
                calculatedPrice(a.price, a.discount) -
                calculatedPrice(b.price, b.discount)
              );
            case "rating":
              return b.rating - a.rating;
            case "students":
              return b.students - a.students;
            default:
              return 0;
          }
        }
        return 0;
      });
    });
  }, [selectedOption]);

  return (
    <section className="inline-flex flex-col justify-center items-center w-screen gap-10 py-14">
      <div className="flex w-[80vw] justify-between items-center border border-gray-200 bg-white p-3">
        <div className="flex justify-center items-center gap-3">
          <div className="icon">
            <FaMagnifyingGlass className="text-gray-600" />
          </div>
          <div>
            <input
              className="text-gray-900 bg-transparent outline-none"
              type="text"
              placeholder="Search for courses"
            />
          </div>
        </div>
        <div className="gap-8 hidden lg:flex">
          <div className="flex justify-center items-center gap-4">
            <div className="text-gray-600 text-sm font-normal leading-6">
              Sort By :
            </div>
            <CustomSelect
              customPlaceholder={"Select an option"}
              options={options}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="text-gray-600 text-sm font-normal leading-6">
              Filter By :
            </div>
            <CustomSelect
              customPlaceholder={"Select an option"}
              options={categoryOptions}
              setSelectedOption={setSelectedCategory}
              selectedOption={selectedCategory}
            />
          </div>
        </div>
      </div>
      <div className="w-[80vw] grid grid-cols-1 gap-6 minmax-[15.25rem,1fr] md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 place-items-center">
        {newCourses.map((course, index) => (
          <Link
            key={index}
            to={`/courses/${course.slug}`}
            onClick={() => handleCourseOnClick(course)}
          >
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Courses;

const options = [
  {
    value: "trending",
    label: "Trending",
    hoverColor: "#F2E8FF",
    textColor: "#334155",
  },
  {
    value: "newest",
    label: "Newest",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "priceLow",
    label: "Price: Low to High",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "priceHigh",
    label: "Price: High to Low",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "rating",
    label: "Rating",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "students",
    label: "Number of Students",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
];

const calculatedPrice = (price, discount) => {
  return price - discount;
};
