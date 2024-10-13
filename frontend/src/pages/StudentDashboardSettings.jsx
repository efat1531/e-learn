import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import StudentDashboardSettingsForm from "../components/StudentDashboardSettings/StudentDashboardSettingsForm"

const StudentDashboardSettings = () => {
  return (
    <div className="relative w-full">
      {/* Main Container */}
      <div className="w-full">
        <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
            <StudentDashboardSettingsForm />
        </div>
      </div>
    </div>
  )
}
export default StudentDashboardSettings