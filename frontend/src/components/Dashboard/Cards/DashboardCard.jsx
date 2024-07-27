// eslint-disable-next-line react/prop-types
const DashboardCard = ({color, icon, title, text}) => {
  return (
    <div className="bg-white max-w-[300px] w-full p-4 flex items-center gap-4">
          {/* Icon */}
          <div className={`bg-${color}-100 flex justify-center items-center p-3`}>
            {icon}
          </div>
          {/* Details */}
          <div>
            <p className="text-2xl">{title}</p>
            <p>{text}</p>
          </div>
        </div>
  )
}
export default DashboardCard