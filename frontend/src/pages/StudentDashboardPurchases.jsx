import PurchasesList from "../components/StudentDashboardPurchases/PurchasesList"

const StudentDashboardPurchases = () => {
  return (
    <div className="relative w-full">
    {/* Main Container */}
    <div className="w-full">
      <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
          <PurchasesList />
      </div>
    </div>
  </div>
  )
}
export default StudentDashboardPurchases