import { motion } from "framer-motion";
import { BsBarChartFill } from "react-icons/bs";
import { FiEdit3, FiShare2 } from "react-icons/fi";

// Steps explaining how QRPilot works.
const steps = [
  {
    icon: FiEdit3,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    title: "Create",
    description: "Create QR codes and short links in seconds.",
  },
  {
    icon: FiShare2,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    title: "Share",
    description: "Share your links and QR codes anywhere instantly.",
  },
  {
    icon: BsBarChartFill,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    title: "Track",
    description: "Track clicks, scans, and audience engagement effortlessly.",
  },
];

// Section describing the three main steps of using QRPilot.
const HowWorks = () => {
  return (
    <motion.section
      // Animate the section when it enters the viewport.
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
      className="light-center-gradient w-full px-50 pt-10"
    >
      {/* Section heading. */}
      <p className="section-title mb-10 text-center">
        How <span className="text-brand">QRPilot</span> Works
      </p>

      {/* Display each step in the workflow. */}
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="bg-surface relative flex w-full items-center justify-center gap-8 rounded-xl px-10 py-10"
          >
            {/* Step number indicator. */}
            <div
              className={`${step.iconBgColor} center absolute top-5 right-5 h-8 w-8 rounded-full p-1`}
            >
              <p className={`${step.iconColor} title-sm`}>{index + 1}</p>
            </div>

            {/* Step icon. */}
            <div
              className={`${step.iconBgColor} center aspect-square h-15 rounded-3xl text-3xl font-bold`}
            >
              <step.icon className={`${step.iconColor}`} />
            </div>

            {/* Step title and description. */}
            <div className="grow">
              <p className="title-sm">{step.title}</p>
              <p className="label">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowWorks;
