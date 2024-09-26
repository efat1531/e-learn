import React, { Suspense, lazy } from "react";
import SkeletonLoader from "../components/ui/SkeletonLoader";

// Lazy load components
const PageHeader = lazy(() => import("../components/Common/PageHeader"));
const FAQBody = lazy(() => import("../components/FAQ/FAQBody"));
const Select = lazy(() => import("../components/ui/Select"));

const FAQ = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonLoader width="100%" height="50px" />}>
        <PageHeader
          title="FAQs"
          breadcrumb={[
            { name: "Home /", link: "/" },
            { name: " FAQs", link: null },
          ]}
        />
      </Suspense>
      <section className="container py-24">
        {/* Title */}
        <div className="lg:flex justify-between text-center lg:text-start">
          <h1>Frequently asked questions</h1>
          <div className="max-w-[200px] w-full mx-auto lg:mx-0 mt-8 lg:mt-0">
            <Suspense fallback={<SkeletonLoader width="100%" height="40px" />}>
              <Select items={[{ value: "Student", label: "Student" }]} />
            </Suspense>
          </div>
        </div>
        {/* Main */}
        <Suspense fallback={<SkeletonLoader width="100%" height="200px" />}>
          <FAQBody />
        </Suspense>
      </section>
    </div>
  );
};

export default FAQ;
