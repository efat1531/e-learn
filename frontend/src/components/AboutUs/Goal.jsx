import MissionBanner from "../../assets/images/missionBanner.png";

const Goal = () => {
  return (
    <section className="bg-Primary-100 py-16 lg:py-0 lg:pt-4">
      <div className="container flex flex-col lg:flex-row gap-4 items-center">
        {/* Image */}
        <div className="justify-start w-full mt-8 lg:mt-0">
          <div>
            <img src={MissionBanner} alt="" />
          </div>
        </div>
        {/* Text */}
        <div className="max-w-[550px] xl:max-w-[600px] space-y-4 text-center lg:text-start mt-8 lg:mt-0">
          <h4 className="text-Primary-500">OUR ONE BILLION MISSION</h4>
          <h1>Our one billion mission sounds bold, We agree.</h1>
          <p className="text-gray-600">
            &quot;We cannot solve our problems with the same thinking we used
            when we created them.&quot;—Albert Einstein. Institutions are slow
            to change. Committees are where good ideas and innovative thinking
            go to die. Choose agility over dogma. Embrace and drive change. We
            need to wipe the slate clean and begin with bold, radical thinking.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Goal;
