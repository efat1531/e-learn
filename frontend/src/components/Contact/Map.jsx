const Map = () => {
  return (
    <div className="w-full">
      <iframe
        id="map"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        loading="lazy"
        className="w-full h-[400px]"
      ></iframe>
    </div>
  );
};
export default Map;
