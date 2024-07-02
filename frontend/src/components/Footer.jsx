import { Facebook, Linkedin, Youtube } from "lucide-react";
import Logo from "../assets/svg/GraduationCap.svg";

const Footer = () => {
  return (
    <footer id="footer" className="bg-zinc-800 text-white">
      {/* <!-- Footer CTA start --> */}
      <div className="px-8">
        <div className="lg:flex justify-between items-center py-16">
          <div className="py-8 ">
            <h1>
              Start learning with 67.1k <br /> students around the world.
            </h1>
            <div className="footer-btns flex gap-4 mt-2">
              <button className="btn-primary">Join The Family</button>
              <button className="btn-secondary">Browse All Courses</button>
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <h2>6.3k</h2>
              <span className="text-gray-400 font-semibold">
                Online Courses
              </span>
            </div>
            <div>
              <h2>99.9%</h2>
              <span className="text-gray-400 font-semibold">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer CTA end --> */}
      {/* <!-- Main Footer Start --> */}
      <div className="border-t border-zinc-700 py-16">
        <div className="px-8">
          <div className="grid sm:grid-cols-5">
            {/* <!-- Footer Col-1 --> */}
            <div className="col-span-3">
              <div className="footer-img-box w-40">
                <a href="#">
                  <div className="flex items-center select-none">
                    <img src={Logo} alt="Logo" className="mx-2" />
                    <div className="text-[32px] font-semibold text-white">
                      Sonorous
                    </div>
                  </div>
                </a>
              </div>
              <p className="max-w-xs mt-4 text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis, in.
              </p>
              <div className="footer-social-links flex gap-2 mt-4">
                <a href="">
                  <Facebook className="fill-white stroke-none" />
                </a>
                <a href="" className="highlight">
                  <Linkedin className="fill-white stroke-none" />
                </a>
                <a href="">
                  <Youtube />
                </a>
              </div>
            </div>
            {/* <!-- Footer Col-2 --> */}
            <div className="mt-8 sm:mt-0">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            {/* <!-- Footer Col-3 --> */}
            <div className="mt-8 sm:mt-0">
              <h4>Support</h4>
              <ul>
                <li>
                  {" "}
                  <a href="">Help Center</a>
                </li>
                <li>
                  <a href="">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Main Footer End --> */}
      {/* <!-- Footer Copyright Start --> */}
      <div className="border-t border-zinc-700 py-8">
        <div className="px-8">
          <p className="text-gray-400">
            &copy; 2023 -{" "}
            <span className="text-white">Sonorus English Learning</span>.
            Designed by <span className="text-orange-500">Alpha Coders</span>.
            All rights reserved.
          </p>
        </div>
      </div>
      {/* <!-- Footer Copyright End --> */}
    </footer>
  );
};

export default Footer;
