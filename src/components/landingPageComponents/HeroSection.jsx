import axiosApi from "@/config/axios";
import useHandleForm from "@/hooks/useHandleForm";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidCopy } from "react-icons/bi";
import { BsBarChartFill } from "react-icons/bs";
import { FaCircleCheck, FaLink } from "react-icons/fa6";
import { FiPieChart } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import FormContainer from "../core/FormContainer";
import Button from "../UI/Button";
import Counter from "../UI/Counter";
import CustomToast from "../UI/CustomToast";
import LightButton from "../UI/LightButton";
import TextInput from "../UI/TextInput";

// Features displayed in the bottom section of the hero.
const features = [
  {
    icon: BsBarChartFill,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    title: "Track Growth",
    description: "Monitor clicks and scans to understand your audience growth.",
  },
  {
    icon: FaLink,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    title: "Short Links",
    description: "Create clean, short links that are easy to share.",
  },
  {
    icon: AiFillThunderbolt,
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
    title: "Fast & Simple",
    description: "Create QR codes and short links within seconds.",
  },
  {
    icon: FiPieChart,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    title: "Smart Insights",
    description:
      "Discover valuable insights about visitors, devices, and locations.",
  },
];

// Main hero section containing the introduction, URL shortener,
// CTA buttons, statistics, and feature highlights.
const HeroSection = () => {
  const [shorternUrl, setShorternUrl] = useState("");

  // Handles form values, validation, submission state, and errors.
  const { values, errors, handleSubmit, resetForm, handleChange, isLoading } =
    useHandleForm({
      destinationUrl: "",
    });

  // Creates a short URL using the entered destination URL.
  const onSubmit = async (values) => {
    const shortCode = nanoid(7);

    try {
      const res = await axiosApi.post("/data/createFIrstUrl", {
        ...values,
        shortCode,
      });

      // Store the generated short URL so it can be displayed to the user.
      setShorternUrl(res.data.shortUrl);
      resetForm();
    } catch (error) {
      // Display the server error message or a network-related fallback.
      toast.custom(
        <CustomToast
          type={"error"}
          description={
            error?.response?.data?.message ||
            "Please check you internet connection"
          }
        />,
      );
    }
  };

  // Copies the generated short URL to the clipboard.
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shorternUrl);

    toast.custom(<CustomToast type={"success"} description={"URL copied"} />);
  };

  return (
    <motion.section
      // Animate the hero section when it first appears.
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="grid w-full grid-cols-2 bg-[radial-gradient(circle_at_top_center,#b6d1fc_0%,#ffffff_70%)]"
    >
      {/* Hero content and primary call-to-action section. */}
      <div className="py-20 pl-50">
        <p className="heading">Crop URLs.</p>

        <p className="heading from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
          Create Smarter.
          <br /> Track Better
        </p>

        <p className="text-body body-sm my-2 w-100">
          Create, share, and track your QR codes and short links—all in one
          powerful platform. Get real-time insights into scans, clicks,
          locations, devices, and more.
        </p>

        {/* Primary and secondary navigation actions. */}
        <div className="flex gap-3">
          <div className="mt-4 w-40">
            <Link to="/dashboard">
              <Button
                label="Start For Free"
                icon={IoArrowForward}
                left={false}
              />
            </Link>
          </div>

          <div className="mt-4 w-45">
            <a href="#features">
              <LightButton
                label="Explore Features"
                icon={IoArrowForward}
                left={false}
              />
            </a>
          </div>
        </div>

        {/* Highlights showing the benefits of using the platform. */}
        <div className="my-4 flex gap-2">
          <span className="flex items-center gap-1">
            <FaCircleCheck className="text-brand" />
            <p className="body-sm">Totaly Free</p>
          </span>

          <span className="flex items-center gap-1">
            <FaCircleCheck className="text-brand" />
            <p className="body-sm">No credit card required</p>
          </span>

          <span className="flex items-center gap-1">
            <FaCircleCheck className="text-brand" />
            <p className="body-sm">Setup in 30 seconds</p>
          </span>
        </div>

        <hr className="border-brand mb-10" />

        {/* Platform statistics. */}
        <div className="flex">
          <p className="flex w-35 flex-col text-3xl font-bold">
            <Counter end={10} suffix="M+" duration={1000} />
            <span className="label font-medium">Links Created</span>
          </p>

          <p className="flex w-40 flex-col text-3xl font-bold">
            <Counter end={400} suffix="K+" duration={1000} />
            <span className="label font-medium">Happy Users</span>
          </p>

          <p className="flex w-35 flex-col text-3xl font-bold">
            <Counter end={99.9} suffix="%" duration={1000} />
            <span className="label font-medium">Uptime works</span>
          </p>
        </div>
      </div>

      {/* URL shortener form. */}
      <div className="center py-20 pr-30">
        <div>
          <FormContainer
            onSubmit={handleSubmit(onSubmit)}
            className="w-100 items-start gap-3 p-10 shadow-sm"
          >
            <div>
              <p className="title-sm text-left">Crop your first URL</p>
              <p className="label text-body">
                Paste any url and get a shortern url instantly.
              </p>
            </div>

            {/* Destination URL input. */}
            <TextInput
              placeholder="https://example_of_long_url.com"
              name={"destinationUrl"}
              error={errors.destinationUrl}
              onChange={handleChange}
              value={values.destinationUrl}
              label="Enter you destination URL"
              helperText="Enter a valid URL"
            />

            {/* Submit URL shortening request. */}
            <Button
              isLoading={isLoading}
              label="Shorten"
              icon={AiFillThunderbolt}
            />

            {/* Display the generated short URL after successful creation. */}
            {shorternUrl && (
              <div className="w-full">
                <p className="label text-body pb-0.5">Your shortern URL</p>

                <div className="relative w-full">
                  <input
                    type="text"
                    disabled={true}
                    value={shorternUrl}
                    className={`bg-brand-light text-brand w-full rounded-md border-2 p-1.5 pr-0 pl-2.5 text-2xl text-[13px] font-bold placeholder:text-xs`}
                  />

                  {/* Copy generated URL to clipboard. */}
                  <div
                    onClick={handleCopy}
                    className="bg-brand center absolute top-[50%] -right-6 translate-[-50%] cursor-pointer gap-1 rounded-sm p-1 px-2"
                  >
                    <p className="caption text-surface font-bold">Copy</p>
                    <BiSolidCopy className="text-surface text-sm font-bold" />
                  </div>
                </div>

                {/* Success message shown below the generated URL. */}
                <span className="mt-5 flex w-full justify-center gap-1">
                  <FaCircleCheck className="text-success" />
                  <p className="bold-label text-success">
                    Your URL is ready to share!
                  </p>
                </span>
              </div>
            )}
          </FormContainer>
        </div>
      </div>

      {/* Feature highlights displayed below the hero content. */}
      <div className="bg-surface col-span-2 grid w-full grid-cols-4 px-50 py-10">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex w-full items-center justify-center gap-3"
          >
            {/* Separator between feature items. */}
            {index !== 0 && (
              <div className="h-full border border-gray-200"></div>
            )}

            {/* Feature icon. */}
            <div
              className={`${feature.iconBgColor} center aspect-square h-15 rounded-full text-3xl font-bold`}
            >
              <feature.icon className={`${feature.iconColor}`} />
            </div>

            {/* Feature title and description. */}
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

export default HeroSection;
