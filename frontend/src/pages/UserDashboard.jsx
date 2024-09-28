import React, { Suspense, lazy } from "react";
import { FaCommentDots, FaRegUserCircle } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { formatDistance } from "date-fns";

// Lazy load components
const DashboardCard = lazy(() =>
  import("../components/Dashboard/Cards/DashboardCard")
);
const OverallReviewCard = lazy(() =>
  import("../components/Dashboard/Cards/OverallReviewCard")
);

const UserDashboard = () => {
  return (
    <div className="container py-8 px-2">
      {/* Dashboard Cards */}
      <section className="flex gap-8 flex-wrap">
        {/* Dashboard Card  */}
        <Suspense fallback={null}>
          <DashboardCard
            color="Primary"
            icon={
              <IoPlayCircleOutline className="text-4xl stroke-Primary-500 fill-Primary-400" />
            }
            title="57"
            text="Total Courses"
          />
        </Suspense>
        {/* Dashboard Card  */}
        <Suspense fallback={null}>
          <DashboardCard
            color="blue"
            icon={
              <FaRegUserCircle className="text-4xl stroke-blue-500 fill-blue-400" />
            }
            title="957"
            text="Total Students"
          />
        </Suspense>
      </section>

      <section className="mt-8 flex flex-col lg:flex-row items-start gap-8">
        {/* All Activities */}
        <div className="bg-white w-full">
          <div className="p-4 border-b">
            <h4 className="m-0">Recent Activity</h4>
          </div>
          {/* Activities */}
          <div className="p-4 max-h-[] overflow-y-scroll grid gap-8">
            {/* Single Activity */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-Primary-500 rounded-full">
                <FaCommentDots className="fill-white" />
              </div>
              <div className="grid gap-2">
                <p>
                  <b>Kevin</b> Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Praesentium corporis odio, est quo nostrum
                  fuga!
                </p>
                <span className="text-gray-500">
                  {formatDistance(new Date(), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Overall Course Rating */}
        <div className="bg-white w-full">
          <div className="p-4 border-b">
            <h4 className="m-0">Overall Course Rating</h4>
          </div>
          <Suspense fallback={null}>
            <OverallReviewCard />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
