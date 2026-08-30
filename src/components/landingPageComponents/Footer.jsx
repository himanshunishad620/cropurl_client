import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiNewspaperClippingBold } from "react-icons/pi";
import Button from "../UI/Button";
import CustomToast from "../UI/CustomToast";
import EmailInput from "../UI/EmailInput";
const contactInfo = [
  {
    icon: MdEmail,
    title: "Email",
    value: "support@qrpilot.com",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
  {
    icon: FaClock,
    title: "Response Time",
    value: "We usually respond within 24 hours.",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
  },
  {
    icon: FaLocationDot,
    title: "Location",
    value: "India",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
  },
];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email))
      return toast.custom(
        <CustomToast
          type="error"
          description={"Invalid email. Please enter a valid email!"}
        />,
      );
    if (!email)
      return toast.custom(
        <CustomToast
          type="error"
          description={"Email is requried. Please enter your email!"}
        />,
      );
    setIsLoading(true);
    setTimeout(() => {
      toast.custom(
        <CustomToast
          type="success"
          description={"Message sent successfully! We'll get back to you soon."}
        />,
      );
      setIsLoading(false);
    }, 1000);
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
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
      className="bg-surface px-50 py-10"
    >
      <div className="grid grid-cols-3 pb-5">
        <div className="full flex flex-col justify-between">
          <span className="flex items-center">
            <img src="/inlineqrpilotlogo.png" alt="" className="h-15" />
            <p className="section-title font-bold">QR</p>
            <p className="section-title from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
              Pilot
            </p>
          </span>
          <p className="label w-80">
            QRPilot is an open-source tool designed to generate, manage, and
            track dynamic QR codes instantly. Built for seamless integration, it
            helps developers and businesses automate QR workflows with a
            powerful API and intuitive user interface.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="title-sm text-brand">Get Into Touch</p>
          {contactInfo.map((contact) => (
            <div key={contact.title} className="flex items-center gap-3">
              <div className="border-brand center h-8 w-8 rounded-full border">
                <contact.icon className="text-brand font-bold" />
              </div>
              <div>
                <p className="bold-label">{contact.title}</p>
                <p className="caption">{contact.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="full flex flex-col gap-3">
          <p className="title-sm text-brand">Join a Newsletter</p>
          <EmailInput value={email} onChange={handleChange} />
          <div>
            <Button
              onClick={handleSumbit}
              isLoading={isLoading}
              label="Subscribe"
              icon={PiNewspaperClippingBold}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-sm">
        <span className="flex">
          <p className="body-sm pr-2">© 2026 </p>
          <p className="body-sm font-bold">QR</p>
          <p className="body-sm from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
            Pilot
          </p>
          <p>
            <span className="mx-2">•</span>
            All rights reserved.
          </p>
        </span>

        <p className="text-gray-400">
          Built with <span className="text-red-500">♥</span> for smarter links
        </p>
      </div>
    </motion.section>
  );
};

export default Footer;
