import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { HiExclamationTriangle } from "react-icons/hi2";
import Button from "./Button";
import LightButton from "./LightButton";
const Dialog = ({ handleShow, isLoading, onClick, title, message }) => {
  const ref = useRef(null);
  // Close the dialog when clicking outside its content.
  useEffect(() => {
    const handler = (e) => {
      if (e.target && e.target.contains(ref.current)) handleShow();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <motion.div
      name="Upper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="full absolute top-0 left-0 z-40 bg-black/20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.9 }}
        className="full center"
        ref={ref}
      >
        <div className="bg-surface flex w-90 flex-col items-center justify-between gap-8 rounded-lg p-5">
          <HiExclamationTriangle className="rounded-full bg-yellow-500/10 p-4 text-6xl text-yellow-500" />
          <div className="-mt-4">
            <p className="subheading text-body w-full text-center">{title}</p>
            <p className="label wi-full text-body text-center">{message}</p>
          </div>
          <div className="flex w-full gap-5">
            <LightButton onClick={handleShow} label="Cancel" />
            <Button label="Delete" isLoading={isLoading} onClick={onClick} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dialog;
