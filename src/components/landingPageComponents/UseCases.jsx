import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMail,
  FiMonitor,
  FiShare2,
  FiShoppingBag,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

// Use cases displayed in the "Perfect for every use case" section.
const useCases = [
  {
    icon: FiShoppingBag,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    title: "Marketing Campaigns",
  },
  {
    icon: FiBriefcase,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    title: "Business Promotion",
  },
  {
    icon: FiShare2,
    iconColor: "text-pink-600",
    iconBgColor: "bg-pink-100",
    title: "Social Media",
  },
  {
    icon: FiMail,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    title: "Email Campaigns",
  },
  {
    icon: FiUsers,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    title: "Events & Networking",
  },
  {
    icon: FiMonitor,
    iconColor: "text-cyan-600",
    iconBgColor: "bg-cyan-100",
    title: "Digital Content",
  },
  {
    icon: FiTarget,
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100",
    title: "Performance Tracking",
  },
];

const UseCases = () => {
  return (
    // Animate the section when it enters the viewport.
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
      className="bg-surface w-full px-50 py-10"
    >
      {/* Section heading */}
      <p className="section-title mb-10 text-center">
        <span className="text-brand">Perfect</span> for every use case
      </p>

      {/* Display all supported use cases in a seven-column grid. */}
      <div className="grid grid-cols-7 gap-4">
        {useCases.map((useCase, index) => (
          // Individual use case item.
          <div
            key={useCase.title}
            className="bg-surface flex flex-col items-center-safe gap-3"
          >
            {/* Colored icon representing the use case. */}
            <div
              className={`${useCase.iconBgColor} center aspect-square h-15 rounded-3xl text-3xl font-bold`}
            >
              <useCase.icon className={`${useCase.iconColor}`} />
            </div>

            {/* Use case title */}
            <p className="title-sm w-full text-center">{useCase.title}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default UseCases;
