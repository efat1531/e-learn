import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useViewAllApplicationsQuery } from "../../features/api/becomeAnInstructorApi";
import ApplicationItem from "./ApplicationItem";

const ApplicationList = () => {
  const { role } = useSelector((state) => state.auth);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [applications, setApplications] = useState([]);
  const [filterEmail, setFilterEmail] = useState("");

  const { data, isLoading, isError } = useViewAllApplicationsQuery(filterEmail);

  const handleEmailClick = (email) => {
    setFilterEmail(email);
  };

  const handleClearFilter = (e) => {
    e.preventDefault();
    setFilterEmail("");
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      setApplications(data.data);
    }
  }, [data, isLoading, isError]);

  if (isLoading) return "Loading...";

  if (!data) return "Loading...";

  // console.log(transactions);
  console.log(applications);

  return (
    <div className="w-full">
      {filterEmail && (
        <div className="px-14  flex justify-between">
          <div className="flex gap-2 text-CustomGray-600">
            <div className="text-sm">Filter result:</div>
            <div className="text-CustomGray-900 font-medium text-sm">
              {filterEmail}
            </div>
          </div>
          <button className="btn btn-sm" onClick={handleClearFilter}>
            Clear Filter
          </button>
        </div>
      )}
      <div className="w-full p-4">
        {applications.map((application, index) => (
          <ApplicationItem
            key={index}
            application={application}
            expanded={index === expandedIndex}
            auth={role}
            onToggle={() =>
              setExpandedIndex(index === expandedIndex ? -1 : index)
            }
            onEmailClick={handleEmailClick}
          />
        ))}
      </div>
    </div>
  );
};
export default ApplicationList;
