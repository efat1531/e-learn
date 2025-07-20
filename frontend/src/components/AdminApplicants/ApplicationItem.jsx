import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toastManager } from "../../components/ui/toastGeneral";
import { Mail, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} from "../../features/api/becomeAnInstructorApi";

const ApplicationItem = ({
  application,
  auth,
  expanded,
  onToggle,
  onEmailClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptApplication] = useAcceptApplicationMutation();
  const [rejectApplication] = useRejectApplicationMutation();

  if (!auth) return;
  const { status } = application;
  const handleEmailClick = (e) => {
    e.preventDefault();
    onEmailClick(application.user.email);
  };

  const handleApplicationStatus = async (result) => {
    setIsLoading(true);
    try {
      if (result === "accepted") {
        // Accept the application
        await acceptApplication(application._id);
        toastManager.success("Application accepted successfully");
      }
      if (result === "rejected") {
        // Reject the application
        await rejectApplication(application._id);
        toastManager.success("Application rejected successfully");
      }
    } catch (error) {
      const errorMessage =
        error.data.message ?? "Failed to update application status";
      toastManager.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-200 p-8">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex justify-between w-full pr-10 items-center">
          <div>
            <h5>
              {format(application.createdAt, "do MMMM, yyyy 'at' h:mm a")}
            </h5>
            {/* Here applicant id will be added */}
            <div className="">{application.user.name}</div>
          </div>
          <div className="flex gap-3 max-h-6 items-center">
            {status === "rejected" && (
              <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                Rejected
              </span>
            )}
            {status === "approved" && (
              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                Approved
              </span>
            )}
            {status === "pending" && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                Pending
              </span>
            )}
          </div>
        </div>

        <button className="text-orange-500">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {expanded && (
        <>
          {/* Here expanded class will go */}
          <div className="mt-4 flex flex-col border p-4 w-full">
            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" />
                  <div
                    className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200"
                    onClick={handleEmailClick}
                  >
                    {application.user.email}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="text-gray-400" />
                  <div
                    className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200"
                    onClick={() =>
                      window.open(application.resumeLink, "_blank")
                    }
                  >
                    View Resume
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Why I Teach:
                  </h3>
                  <p className="text-gray-600">
                    {application.whyYouWantToTeach}
                  </p>
                </div>
                {application.message && (
                  <div className="mt-4 border border-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                      <MessageCircle className="mr-2 text-gray-400" />
                      Message:
                    </h3>
                    <p className="text-gray-600">{application.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Two button for accept or reject */}
          {status === "pending" && !isLoading && (
            <div className="flex w-full items-center justify-end p-6">
              <label
                className="label cursor-pointer"
                onClick={() => handleApplicationStatus("accepted")}
              >
                <span className="label-text px-4 text-Success-500 font-semibold">
                  Accept
                </span>
                <input type="checkbox" className="toggle toggle-success" />
              </label>
              <label
                className="label cursor-pointer"
                onClick={() => handleApplicationStatus("rejected")}
              >
                <span className="label-text px-4 text-Error-500 font-semibold">
                  Reject
                </span>
                <input type="checkbox" className="toggle toggle-warning" />
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default ApplicationItem;
