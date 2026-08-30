import { motion } from "framer-motion";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { HiInformationCircle, HiXCircle } from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { MdPending } from "react-icons/md";
import { Link } from "react-router-dom";

const statusConfig = {
  success: {
    icon: BsFillPatchCheckFill,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    ring: "border-green-500/30",
  },
  pending: {
    icon: MdPending,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    ring: "border-indigo-500/50",
  },
  error: {
    icon: HiXCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
    ring: "border-red-500/30",
  },
  warning: {
    icon: HiExclamationTriangle,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-500/10",
    ring: "border-yellow-500/30",
  },
  info: {
    icon: HiInformationCircle,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    ring: "border-blue-500/30",
  },
};

const StatusPage = ({
  type = "success",
  title,
  description,
  redirect,
  primaryText,
  linkText,
}) => {
  const current = statusConfig[type];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="center relative flex-col gap-5 overflow-hidden p-10"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 12,
        }}
        className={`center relative h-40 w-40 rounded-full ${current.iconBg}`}
      >
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute inset-0 rounded-full border-2 border-dashed ${current.ring}`}
        />

        {/* Floating Icon */}
        <motion.div
          animate={{
            scale: [1.1, 1.18, 1.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className={`${current.iconColor} text-7xl`} />
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="center flex-col">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="subheading text-body"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
          }}
          className="body-text text-body w-85 text-center leading-5 md:w-96"
        >
          {description}
        </motion.p>
      </div>
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
        }}
        className="label text-body"
      >
        {primaryText}{" "}
        <Link replace className="link" to={redirect}>
          {linkText}
        </Link>
      </motion.span>
      {/* Progress */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 220 }}
        transition={{
          delay: 0.8,
          duration: 4.5,
          ease: "easeInOut",
        }}
        className={`${current.iconBg} h-1 rounded-full`}
      />
    </motion.div>
  );
};

export default StatusPage;
