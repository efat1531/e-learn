import AboutUsGallery from "../../assets/images/aboutUsGallery.png";
import Button from "../ui/Button";

const Gallery = () => {
  return (
    <section className="bg-gray-100 py-24">
      <div className="container flex flex-col lg:flex-row gap-4 items-center">
        {/* Text */}
        <div className="max-w-[500px] space-y-6 text-center lg:text-start">
          <h4 className="text-Primary-500">OUR GALLERY</h4>
          <h1>We’ve been here almost 17 years</h1>
          <p className="text-gray-600">
            Fusce lobortis leo augue, sit amet tristique nisi commodo in.
            Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
            libero. Curabitur in urna ligula. torquent per conubia nostra.
          </p>
          <Button title="Join Our Team" secondary />
        </div>
        {/* Image */}
        <div className="justify-end w-full mt-8 lg:mt-0">
          <div>
            <img src={AboutUsGallery} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Gallery;
