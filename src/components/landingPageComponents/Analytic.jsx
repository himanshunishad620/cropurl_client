import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

const Analytic = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.8,
      }}
      className="light-center-gradient grid w-full grid-cols-6 bg-red-200 px-50 py-10 pr-50"
    >
      <div className="col-span-2 flex w-full flex-col justify-center">
        <p className="heading">Turn every scan </p>
        <p className="heading from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
          into useful data.
        </p>

        <p className="text-body body-sm my-2 w-80">
          Create, share, and track your QR codes and short links—all in one
          powerful platform. Get real-time insights into scans, clicks,
          locations, devices, and more.
        </p>
        <div className="flex gap-3">
          <div className="mt-4 w-40">
            <Link to="/dashboard">
              <Button
                label="Start For Free"
                icon={IoArrowForward}
                left={false}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <img src="./ss.png" alt="" className="rounded-lg shadow-sm" />
      </div>
    </motion.section>
  );
};

export default Analytic;
