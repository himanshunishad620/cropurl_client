import useHandleForm from "@/hooks/useHandleForm";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import FormContainer from "../core/FormContainer";
import Button from "../UI/Button";
import CustomToast from "../UI/CustomToast";
import EmailInput from "../UI/EmailInput";
import TextArea from "../UI/TextArea";
import TextInput from "../UI/TextInput";
import config from "./../../config/config";

// Contact information displayed alongside the contact form.
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

// Contact section containing contact details and the message form.
const GetIntoTouch = () => {
  // Sends the submitted contact form data using EmailJS.
  const sendEmail = async (values) => {
    try {
      await emailjs.send(
        config.emailJsServiceKey,
        config.emailJsTemplateKey,
        values,
        {
          publicKey: config.emailJsPublicKey,
        },
      );

      // Clear the form after a successful submission.
      resetForm();

      toast.custom(
        <CustomToast
          type="success"
          description={"Message sent successfully! We'll get back to you soon."}
        />,
      );
    } catch (error) {
      // Show an error notification if the email could not be sent.
      toast.custom(
        <CustomToast
          type="error"
          description={"Failed to send your message. Please try again."}
        />,
      );
    }
  };

  // Handles form state, validation, submission, and resetting.
  const { values, isLoading, errors, handleChange, handleSubmit, resetForm } =
    useHandleForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });

  return (
    <motion.section
      // Fade and slide the section into view when it enters the viewport.
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
      className="light-center-gradient px-50 py-10"
    >
      {/* Section heading. */}
      <p className="section-title mb-10 text-center">
        Get Into <span className="text-brand">Touch</span>
      </p>

      <div className="grid grid-cols-2">
        {/* Contact information and introductory text. */}
        <div className="full flex flex-col items-start justify-center">
          <p className="heading">Shorten URLs.</p>

          <p className="heading from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
            Create Smarter.
          </p>

          <p className="text-body body-sm my-5 w-100">
            Create, share, and track your QR codes and short links—all in one
            powerful platform. Get real-time insights into scans, clicks,
            locations, devices, and more.
          </p>

          {/* Display available contact information. */}
          <div className="flex flex-col gap-3">
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
        </div>

        {/* Contact form. */}
        <div>
          <FormContainer
            onSubmit={handleSubmit(sendEmail)}
            className="w-full p-10"
          >
            {/* First and last name fields. */}
            <div className="flex w-full gap-3">
              <TextInput
                name="firstName"
                value={values.firstName}
                error={errors.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                label="First Name"
                helperText="Please enter your first name"
              />

              <TextInput
                name="lastName"
                label="Last Name"
                value={values.lastName}
                error={errors.lastName}
                placeholder="e.g. Doe"
                onChange={handleChange}
                helperText="Please enter your last name"
              />
            </div>

            {/* Email field. */}
            <EmailInput
              name="email"
              value={values.email}
              error={errors.email}
              placeholder="e.g. johndoe@xyz.com"
              label="Email"
              onChange={handleChange}
              helperText="Please enter your email"
            />

            {/* Message field. */}
            <TextArea
              name="message"
              onChange={handleChange}
              value={values.message}
              error={errors.message}
              placeholder="e.g. type you message"
              label="Message"
              helperText="Please enter your message"
            />

            {/* Submit button. */}
            <div className="mt-3 w-full">
              <Button label="Send" isLoading={isLoading} icon={IoMdSend} />
            </div>
          </FormContainer>
        </div>
      </div>
    </motion.section>
  );
};

export default GetIntoTouch;
