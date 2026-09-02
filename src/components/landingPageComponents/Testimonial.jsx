import { motion } from "framer-motion";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

// Testimonials displayed on the landing page.
const testimonials = [
  {
    name: "Aarav Sharma",
    position: "Product Designer",
    rating: 3,
    comment:
      "QRPilot makes creating and managing QR codes incredibly easy. I can generate a code in seconds and track scans without dealing with complicated analytics.",
    dpUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Verma",
    position: "Marketing Manager",
    rating: 5,
    comment:
      "The dashboard is clean, fast, and really easy to understand. I especially like being able to see clicks, scans, and performance trends all in one place.",
    dpUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Mehta",
    position: "Startup Founder",
    rating: 4,
    comment:
      "I have been using QRPilot to manage my short links and QR codes, and it has made tracking campaigns much simpler. The analytics are clear and genuinely useful.",
    dpUrl: "https://i.pravatar.cc/150?img=33",
  },
];

// Section displaying user testimonials and ratings.
const Testimonial = () => {
  return (
    <motion.section
      // Animate the testimonial section when it enters the viewport.
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
      className="light-center-gradient px-50 pb-10"
    >
      {/* Section heading. */}
      <p className="section-title mb-10 text-center">
        Loved by <span className="text-brand">thousands of users </span> world
        wide
      </p>

      {/* Render all testimonial cards. */}
      <div className="grid grid-cols-3 gap-10">
        {testimonials.map((testimonial) => {
          return (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          );
        })}
      </div>
    </motion.section>
  );
};

export default Testimonial;

// Individual testimonial card containing user information,
// feedback, and star rating.
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="full v bg-surface flex flex-col gap-4 rounded-lg px-10 py-5">
      {/* User avatar and basic information. */}
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full">
          <img
            src={testimonial.dpUrl}
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>

        <div>
          <p className="body-bold">{testimonial.name}</p>
          <p className="label text-body">{testimonial.position}</p>
        </div>
      </div>

      {/* User's testimonial. */}
      <p className="text-body label">"{testimonial.comment}"</p>

      {/* Display filled and unfilled stars according to the rating. */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((num) =>
          num <= testimonial.rating ? (
            <IoIosStar key={num} className="text-xl text-yellow-400" />
          ) : (
            <IoIosStarOutline key={num} className="text-muted text-xl" />
          ),
        )}
      </div>
    </div>
  );
};
