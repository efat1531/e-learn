import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { toastManager } from "../ui/toastGeneral";
import { useSelector } from "react-redux";
import { useApplyToBecomeAnInstructorMutation } from "../../features/api/becomeAnInstructorApi";

const BecomeInstructorForm = () => {
  const [resumeLink, setResumeLink] = useState("");
  const [description, setDescription] = useState("");
  const [queries, setQueries] = useState("");
  const [error, setError] = useState("");
  const { authenticated } = useSelector((state) => state.auth);
  const [applyToBecomeAnInstructor] = useApplyToBecomeAnInstructorMutation();

  const timeline = [
    "Apply as instructor",
    "Admin reviews your application",
    "Admin approves your application",
    "You update your profile",
    "Start creating Courses",
    "Publish and Start Teaching",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticated) {
      toastManager("error", "Please login to apply as an instructor.");
      return;
    }
    if (!resumeLink || description.split(" ").length > 250) {
      setError("Please fill in all mandatory fields correctly.");
      return;
    }
    const data = {
      resumeLink,
      whyYouWantToTeach: description,
      message: queries,
    };
    try {
      await applyToBecomeAnInstructor(data).unwrap();
      toastManager.success("Application submitted successfully.");
      setResumeLink("");
      setDescription("");
      setQueries("");
    } catch (error) {
      let message = "Something went wrong";
      if (error.data.httpCode === 403) {
        message = "You are not allowed to apply as an instructor.";
      } else if (error.data.httpCode === 401) {
        message =
          "You are not signed in or sign-in expires. Please sign in again to access.";
      } else {
        message = error?.data?.message ?? message;
      }

      toastManager.error(message);
    }
    setError("");
  };

  const inputClass = "block w-full border border-gray-300 p-2.5 bg-white";

  return (
    <div className="flex items-center justify-center py-20  bg-gray-50 ">
      <div className="flex flex-col md:flex-row w-full gap-[8.5rem] bg-gray-50 items-center md:justify-center">
        <div className=" pb-6 md:pb-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Become an Instructor
          </h2>
          <ol className="relative border-l-2 border-orange-500">
            {timeline.map((step, index) => (
              <li key={index} className="pb-10 pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-Primary-100 rounded-full -left-3 ring-4 ring-white">
                  <span className="text-orange-500">{index + 1}</span>
                </span>
                <p className="text-base font-normal text-CustomGray-600">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-12">
            <div>
              <label
                htmlFor="resumeLink"
                className="block text-sm font-medium text-CustomGray-700 pb-1"
              >
                Resume Link (must be viewable or downloadable)*
              </label>
              <input
                type="url"
                id="resumeLink"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                required
                className={inputClass}
                placeholder="https://example.com/your-resume"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 pb-1"
              >
                Why do you want to become an instructor? (max 250 words)*
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className={inputClass}
                placeholder="Your motivation..."
              />
            </div>
            <div>
              <label
                htmlFor="queries"
                className="block text-sm font-medium text-gray-700 pb-1"
              >
                Any queries? (optional)
              </label>
              <textarea
                id="queries"
                value={queries}
                onChange={(e) => setQueries(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Your questions..."
              />
            </div>
            {error && (
              <div className="alert alert-error">
                <AlertCircle className="h-6 w-6 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 px-4 border border-transparent text-sm font-medium text-white bg-Primary-500 hover:bg-Primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Primary-500"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructorForm;
