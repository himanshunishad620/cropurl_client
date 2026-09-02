import { motion } from "framer-motion";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { HiInformationCircle, HiXCircle } from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";

import { MdPending } from "react-icons/md";
// Map each toast type to its icon and styles.
const statusConfig = {
  success: {
    icon: BsFillPatchCheckFill,
    iconColor: "text-green-500",
    iconBg: "bg-green-100 shadow-black-100",
  },
  pending: {
    icon: MdPending,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-100 shadow-black-100",
  },
  error: {
    icon: HiXCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100 shadow-black-100",
  },
  warning: {
    icon: HiExclamationTriangle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100 shadow-black-100",
  },
  info: {
    icon: HiInformationCircle,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 shadow-black-100",
  },
};
const CustomToast = ({ type, description }) => {
  // Get the UI configuration for the selected toast type.
  const current = statusConfig[type];
  const Icon = current.icon;
  return (
    <motion.div
      initial={{ opacity: 0, top: 0, scale: 0 }}
      animate={{ opacity: 1, top: 65, scale: 1 }}
      transition={{ duration: 0.4, ease: "" }}
      exit={{ opacity: 0 }}
      className={`${current.iconBg} relative flex items-center gap-2 overflow-hidden rounded-md p-2 px-3 shadow-sm`}
    >
      <Icon className={`${current.iconColor} text-2xl`} />
      <p className={`bold-label ${current.iconColor}`}>{description}</p>
    </motion.div>
  );
};

export default CustomToast;
