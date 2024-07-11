import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/effect-flip";
import "swiper/css/pagination";
import { Autoplay, EffectFlip, Pagination } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Sundar Pichai",
    text: "Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.",
    company: "Chief Chairman of Google",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Edugaurd responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.",
    company: "CEO of Microsoft",
  },
  {
    id: 3,
    name: "Ted Sarandos",
    text: "In total, it was a big success, I would get emails about what a fantastic resource it was.",
    company: "Chief Executive Officer of Netflix",
  },
];

const TestimonialSection = () => {
  return (
    <section className="container !py-24">
      <Swiper
        effect={"ease"}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        grabCursor={true}
        loop={true}
        modules={[EffectFlip, Autoplay, Pagination]}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {testimonials &&
          testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial?.id}>
              <TestimonialCard data={testimonial} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
export default TestimonialSection;

// import required modules
