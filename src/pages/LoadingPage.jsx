import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="full light-center-gradient flex flex-col items-center justify-center gap-4 rounded-2xl">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex text-3xl font-bold tracking-tight"
      >
        {["C", "r", "o", "p", "U", "R", "L"].map((letter, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, 8, 0, -8, 0] }}
            transition={{
              duration: 1.2,
              delay: index * 0.1,
              ease: "linear",
              repeat: Infinity,
            }}
            className={`${index > 3 ? "text-body" : "text-brand"}`}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingPage;
