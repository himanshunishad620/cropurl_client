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

// import { motion } from "framer-motion";
// import { TbQrcode } from "react-icons/tb";

// const qrVariants = {
//   animate: {
//     scale: [0.8, 1, 0.8],
//     opacity: [0.3, 1, 0.3],
//     rotate: [0, 90, 180, 270, 360],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// // Shows a loading screen while the app is preparing.
// const LoadingPage = () => {
//   return (
//     <div className="full light-center-gradient flex flex-col items-center justify-center overflow-hidden">
//       <div className="relative flex h-40 w-40 items-center justify-center">
//         <motion.div
//           variants={qrVariants}
//           animate="animate"
//           className="absolute text-blue-500"
//         >
//           <TbQrcode size={110} strokeWidth={1.5} />
//         </motion.div>

//         <motion.div
//           animate={{
//             scale: [1, 1.15, 1],
//             opacity: [0.2, 0.6, 0.2],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute text-indigo-500"
//         >
//           <TbQrcode size={75} strokeWidth={1.5} />
//         </motion.div>

//         <motion.div
//           animate={{
//             scale: [1, 1.25, 1],
//           }}
//           transition={{
//             duration: 1.2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="h-4 w-4 rounded-sm bg-blue-500"
//         />
//       </div>

//       <motion.h1
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mt-6 text-2xl font-bold tracking-tight"
//       >
//         QR<span className="text-blue-500">Pilot</span>
//       </motion.h1>

//       <motion.p
//         animate={{ opacity: [0.4, 1, 0.4] }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//         }}
//         className="mt-2 text-sm text-gray-500"
//       >
//         Preparing your QR experience...
//       </motion.p>

//       <div className="mt-5 flex gap-1.5">
//         {[0, 1, 2].map((item) => (
//           <motion.span
//             key={item}
//             animate={{
//               y: [0, -6, 0],
//               opacity: [0.3, 1, 0.3],
//             }}
//             transition={{
//               duration: 0.8,
//               repeat: Infinity,
//               delay: item * 0.15,
//             }}
//             className="h-1.5 w-1.5 rounded-full bg-blue-500"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;
