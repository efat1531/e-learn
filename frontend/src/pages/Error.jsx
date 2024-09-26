import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Error404 from "../assets/images/Error404.png";
import SkeletonLoader from "../components/ui/SkeletonLoader";

// Lazy load the Button component
const Button = lazy(() => import("../components/ui/Button"));

const MainErrorPage = () => {
  const navigate = useNavigate();
  const gotoPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col gap-8 px-24">
        <div className="flex flex-col gap-4 lg:pt-24">
          <div className="text-CustomGray-100 lg:text-[5rem] lg:font-[600] ">
            Error 404
          </div>
          <div className="lg:text-5xl font-[600] text-CustomGray-900">
            Oops! page not found
          </div>
        </div>
        <div>
          Something went wrong. It&apos;s look that your requested could not be
          found. It&apos;s look like the link is broken or the page is removed.
        </div>
        <Suspense fallback={<SkeletonLoader width="100px" height="40px" />}>
          <Button
            title="Go Back"
            className={"max-w-36"}
            onClick={gotoPreviousPage}
          />
        </Suspense>
      </div>
      <div>
        <img src={Error404} alt="Error" className="aspect-auto" />
      </div>
    </div>
  );
};

export default MainErrorPage;
