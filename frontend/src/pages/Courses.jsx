import React, { Suspense, lazy, useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllCourseQuery } from "../features/api/courseApiSlice";
import { setAllCourses } from "../features/courseSlice";
import { useDebounce } from "use-debounce";
import { useNavigate, useLocation } from "react-router-dom";

// Lazy load components
const CourseCard = lazy(() => import("../components/Common/CourseCard"));

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("title");
    const sort = params.get("sort");
    if (name) {
      setSearchTerm(name);
    }
    if (sort) {
      setSortOption(sort);
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (debouncedSearchTerm) {
      params.set("title", debouncedSearchTerm);
    } else {
      params.delete("title");
    }
    if (sortOption) {
      params.set("sort", sortOption);
    } else {
      params.delete("sort");
    }
    navigate({ search: params.toString() });
  }, [debouncedSearchTerm, sortOption, navigate, location.search]);

  const { data, error, isLoading } = useFetchAllCourseQuery({
    title: debouncedSearchTerm,
    sort: sortOption,
  });

  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    if (data) {
      dispatch(setAllCourses(data.data));
    }
  }, [data, dispatch]);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="gap-8 items-center hidden lg:flex">
          <div className="flex justify-center items-center gap-4">
            <div className="text-gray-600 text-sm font-normal leading-6 whitespace-nowrap">
              Sort By :
            </div>

            <select
              className="select select-bordered w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="" disabled>
                Add sorting filter
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-[80vw] grid grid-cols-1 gap-6 minmax-[15.25rem,1fr] md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 place-items-center">
        {courses.map((course, index) => (
          <Link key={index} to={`/courses/${course.slug}`}>
            <Suspense fallback={null}>
              <CourseCard course={course} />
            </Suspense>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Courses;

const options = [
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
  {
    value: "course-rating",
    label: "Rating",
  },
  {
    value: "course-students",
    label: "Number of Students",
  },
];
