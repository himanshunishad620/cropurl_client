import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SelectInput = ({ onChange, label, options, width, selectedIndex }) => {
  const selectRef = useRef(null);
  const [currOption, setCurrOption] = useState(options[selectedIndex]);
  const [opened, setOpened] = useState(false);
  // Close the dropdown when clicking outside it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync the displayed option with the selected index.
  useEffect(() => {
    setCurrOption(options[selectedIndex]);
  }, [selectedIndex]);

  // Toggle the dropdown visibility.
  const handleDrawer = () => {
    setOpened((pre) => !pre);
  };
  const handleChange = (index) => {
    setCurrOption(options[index]);
    onChange(index);
    setOpened((pre) => !pre);
  };
  return (
    <div className="flex w-full items-center gap-2">
      <p className="label text-body">{label} </p>
      <div
        ref={selectRef}
        className="bg-page relative flex w-full flex-nowrap items-center rounded-sm border p-1.5"
      >
        <span
          onClick={handleDrawer}
          className={`flex w-17 cursor-pointer items-center justify-between px-1 ${width}`}
        >
          <p className="label text-body">{currOption}</p>
          {opened ? (
            <IoIosArrowUp className="label text-body" />
          ) : (
            <IoIosArrowDown className="label text-body" />
          )}
        </span>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`bg-page absolute top-6 right-0 z-40 w-17 rounded-sm shadow-sm ${width}`}
            >
              {options.map((option, index) => {
                if (option !== currOption) {
                  return (
                    <p
                      onClick={() => handleChange(index)}
                      className="label text-body hover:bg-surface cursor-pointer px-2 py-1 duration-100"
                      key={index}
                    >
                      {option}
                    </p>
                  );
                }

                return null;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectInput;
