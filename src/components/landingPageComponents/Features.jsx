import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiLink,
  FiMapPin,
  FiTrendingUp,
  FiUpload,
} from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";

const features = [
  {
    icon: FiLink,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    title: "Short Links",
    description:
      "Create clean, memorable short links that are easy to share, manage, and track from one centralized dashboard.",
  },
  {
    icon: LuQrCode,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    title: "QR Codes",
    description:
      "Generate unique QR codes for your links and manage all your active codes from one simple and organized dashboard.",
  },
  {
    icon: FiBarChart2,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    title: "Real-Time Analytics",
    description:
      "Monitor clicks and scans in real time with detailed analytics that help you understand how your links are performing.",
  },
  {
    icon: FiTrendingUp,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    title: "Growth Tracking",
    description:
      "Track performance over time and compare your results to understand growth trends across your links and QR codes.",
  },
  {
    icon: FiMapPin,
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100",
    title: "Location Insights",
    description:
      "Discover where your audience is interacting with your links and QR codes through detailed location-based insights.",
  },
  {
    icon: FiUpload,
    iconColor: "text-cyan-600",
    iconBgColor: "bg-cyan-100",
    title: "Import & Export",
    description:
      "Easily import multiple links and QR codes or export your data whenever you need to manage and analyze it.",
  },
];

const Features = () => {
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
      className="light-center-gradient w-full px-50 py-10"
      id="features"
    >
      <p className="section-title mb-10 text-center">
        Powerful <span className="text-brand">Features</span>
      </p>
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface flex w-full items-center justify-center gap-8 rounded-xl px-10 py-10"
          >
            <div
              className={`${feature.iconBgColor} center aspect-square h-15 rounded-lg text-3xl font-bold`}
            >
              <feature.icon className={`${feature.iconColor}`} />
            </div>
            <div className="grow">
              <p className="title-sm">{feature.title}</p>
              <p className="label">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;
