import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/Common/PageHeader";
import BannerBecomeAnInstructor from "../components/BecomeAnInstructor/Banner.jsx";
import FunFact from "../components/BecomeAnInstructor/FunFact.jsx";
import WhyTeach from "../components/BecomeAnInstructor/WhyTeach.jsx";
import ProcessSection from "../components/BecomeAnInstructor/ProcessSection.jsx";
import RulesSection from "../components/BecomeAnInstructor/RulesSection.jsx";
import HelpSection from "../components/BecomeAnInstructor/HelpSection.jsx";
import BecomeInstructorForm from "../components/BecomeAnInstructor/ApplicationForm.jsx";

const breadcrumb = [
  {
    name: "Home /",
    link: "/home",
  },
  {
    name: " Become an Instructor",
    link: "",
  },
];

const BecomeAnInstructor = () => {
  return (
    <section className="w-full">
      <PageHeader title="Become an Instructor" breadcrumb={breadcrumb} />
      <BannerBecomeAnInstructor />
      <FunFact />
      <WhyTeach />
      <ProcessSection />
      <RulesSection />
      <HelpSection />
      <BecomeInstructorForm />
    </section>
  );
};

export default BecomeAnInstructor;
