import { useCreateQRMutation } from "@/api/qrApi";
import Button from "@/components/UI/Button";
import CustomToast from "@/components/UI/CustomToast";
import IconButton from "@/components/UI/IconButton";
import LightButton from "@/components/UI/LightButton";
import SelectInput from "@/components/UI/SelectInput";
import TextInput from "@/components/UI/TextInput";
import { formatDate } from "@/helper/Date";
import { downloadAsPDF, downloadImage } from "@/helper/QR";
import useHandleForm from "@/hooks/useHandleForm";
import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import { FaLink, FaRegFilePdf } from "react-icons/fa6";
import { FiDownload, FiImage } from "react-icons/fi";
import {
  IoIosGlobe,
  IoMdArrowBack,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import {
  MdFlipToBack,
  MdOutlineDateRange,
  MdOutlineFlipToFront,
  MdOutlineOpacity,
} from "react-icons/md";
import { RiQrCodeLine, RiShapesLine } from "react-icons/ri";
import {
  TbBoxPadding,
  TbDimensions,
  TbHash,
  TbWorldDownload,
} from "react-icons/tb";
import QRCode, { generateDataURL } from "react-qrcode-logo";
import config from "../../config/config";
const PADDING_SHAPES = ["circle", "square"];
const ImportCSV = lazy(() => import("@/components/core/ImportCSV"));

// Keeps generated QR values within supported limits.
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const initialValues = {
  bgColor: "#000000",
  fgColor: "#ffffff",
  height: 50,
  width: 50,
  padding: 20,
  opacity: 1,
  size: 150,
  qrPadding: 10,
};

// Manages QR design, creation, and CSV import.
const CreateQRPage = () => {
  const fileInputRef = useRef();
  const [createQR, { isLoading: creating }] = useCreateQRMutation();
  const { values, handleChange, resetForm, handleSubmit, isLoading, errors } =
    useHandleForm({ name: "", destinationUrl: "" });
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showImport, setShowImport] = useState(false);
  const [value, setValue] = useState({
    ...initialValues,
  });

  const handleImportShow = () => {
    setShowImport((pre) => !pre);
  };

  // Creates a temporary URL for the selected logo.
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.custom(
        <CustomToast
          type={"warning"}
          description={"Please select a PNG or JPEG image."}
        />,
        { id: "file_upload" },
      );
      e.target.value = "";
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      toast.custom(
        <CustomToast
          type={"warning"}
          description={"File size limit exceded, Max 2MB"}
        />,
        { id: "file_upload" },
      );
      e.target.value = "";
      return;
    }

    setFile(URL.createObjectURL(selectedFile));
  };

  const handleSelectChange = (index) => {
    setSelectedIndex(index);
  };

  const handleValueChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const handleColorChange = (name, color) => {
    setValue((prev) => ({ ...prev, [name]: color }));
  };

  // Restores the QR designer to its default values.
  const handleReset = () => {
    setValue({ ...initialValues });
    setFile("");
    setSelectedIndex(0);
    resetForm();
    fileInputRef.current.value = "";
  };

  // Builds the current QR configuration from the design state.
  const getQROptions = () => ({
    size: clamp(value.size, 100, 500),
    logoPadding: clamp(value.padding, 10, 50),
    logoPaddingStyle: PADDING_SHAPES[selectedIndex],
    logoHeight: clamp(value.height, 50, 250),
    logoWidth: clamp(value.width, 50, 250),
    logoOpacity: value.opacity,
    logoImage: file,
    ecLevel: "H",
    fgColor: value.bgColor,
    bgColor: value.fgColor,
    removeQrCodeBehindLogo: true,
    quietZone: clamp(value.qrPadding, 10, 50),
    style: {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
    },
  });

  // Generates the QR image and creates the QR record.
  const handleFormSubmit = async () => {
    const shortCode = nanoid(6);
    try {
      const imgUrl = await generateDataURL(
        { ...getQROptions(), value: `${config.baseUrl}/q/${shortCode}` },
        "png",
      );
      const data = await createQR({ ...values, imgUrl, shortCode }).unwrap();
      setResponse(data);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  return (
    <div className="full bg-page col-span-3 grid grid-cols-3 gap-3 p-3 pl-0">
      <Suspense fallback={null}>
        <AnimatePresence>
          {showImport && <ImportCSV handleImportShow={handleImportShow} />}
        </AnimatePresence>
      </Suspense>
      <AnimatePresence>
        {show && <SuccessPage data={response} handleShow={handleShow} />}
      </AnimatePresence>

      <div className="full bg-surface rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="subheading">Design QR</p>
          <span className="flex items-center gap-5">
            <IconButton icon={TbWorldDownload} onClick={handleImportShow} />
            <IconButton icon={LuRefreshCcw} onClick={handleReset} />
          </span>
        </div>
        <p className="body-bold text-body my-1">Logo Dimension</p>
        <div className="flex flex-col gap-1">
          <div>
            <div className="flex w-full items-center gap-2">
              <span className="flex gap-1">
                <FiImage className="text-body body-text" />
                <p className="label text-body">Logo:</p>
              </span>
              <input
                ref={fileInputRef}
                type="file"
                placeholder="H"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="label text-body bg-page cursor-pointer rounded-sm border p-1.5"
              />
            </div>
            <p className="text-muted caption">
              JPG, PNG, WEBP formate only. Max size 2MB only.
            </p>
          </div>

          <div className="flex justify-between gap-2">
            <NumberRangeInput
              icon={AiOutlineColumnHeight}
              label="Height"
              caption="Min:50px, Max:250px"
              value={value.height}
              handleValueChange={handleValueChange}
              name="height"
            />
            <NumberRangeInput
              icon={AiOutlineColumnWidth}
              label="Width"
              caption="Min:50px, Max:250px"
              value={value.width}
              handleValueChange={handleValueChange}
              name="width"
            />
          </div>

          <div className="flex justify-between gap-2">
            <NumberRangeInput
              icon={TbBoxPadding}
              label="Padding"
              caption="Min:10px, Max:50px"
              value={value.padding}
              handleValueChange={handleValueChange}
              name="padding"
            />
            <NumberRangeInput
              icon={MdOutlineOpacity}
              label="Opacity"
              caption="Between 0 to 1"
              value={value.opacity}
              handleValueChange={handleValueChange}
              name="opacity"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="flex gap-1">
              <RiShapesLine className="text-body body-text" />
              <p className="label text-body">Padding Shape:</p>
            </span>
            <div className="w-55">
              <SelectInput
                options={PADDING_SHAPES}
                width="w-full"
                selectedIndex={selectedIndex}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>

        <p className="body-bold text-body my-1">QR Dimension</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-2">
            <NumberRangeInput
              label="Size"
              icon={TbDimensions}
              caption="Min:100px, Max:500px"
              value={value.size}
              handleValueChange={handleValueChange}
              name="size"
            />
            <NumberRangeInput
              icon={TbBoxPadding}
              label="Padding"
              caption="Min:10px, Max:50px"
              value={value.qrPadding}
              handleValueChange={handleValueChange}
              name="qrPadding"
            />
          </div>

          <div className="flex justify-between gap-2">
            <ColorInput
              label="BgColor"
              icon={MdFlipToBack}
              value={value.bgColor}
              handleColorChange={handleColorChange}
              name="bgColor"
            />
            <ColorInput
              icon={MdOutlineFlipToFront}
              label="FgColor"
              value={value.fgColor}
              handleColorChange={handleColorChange}
              name="fgColor"
            />
          </div>
        </div>

        <p className="body-bold text-body my-1">Details</p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex w-full flex-col"
        >
          <TextInput
            name="name"
            placeholder="e.g. Survey form url"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            helperText="Enter you QR name"
            label="Name"
          />
          <TextInput
            name="destinationUrl"
            label="Destination URL"
            placeholder="e.g. https://mysurveyform.com"
            value={values.destinationUrl}
            onChange={handleChange}
            error={errors.destinationUrl}
            helperText="Your destination url"
          />
          <div className="mt-2 w-full pb-3">
            <Button label="Create" isLoading={isLoading} />
          </div>
        </form>
      </div>
      <div className="full center bg-surface col-span-2 rounded-lg shadow-sm">
        <QRCode {...getQROptions()} />
      </div>
    </div>
  );
};

export default CreateQRPage;

const NumberRangeInput = ({
  label,
  name,
  value,
  handleValueChange,
  caption = "",
  icon: Icon,
}) => {
  return (
    <div>
      <div className="justfiy-between flex items-center gap-2">
        <span className="flex gap-1">
          <Icon className="text-body body-text" />
          <p className="label text-body">{label}:</p>
        </span>
        <input
          className="text-body bg-page outline-brand-hover w-full rounded-sm border p-1 px-1.5 text-sm text-[13px]"
          type="number"
          name={name}
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <p className="caption text-muted">{caption}</p>
    </div>
  );
};

const ColorInput = ({ label, value, name, handleColorChange, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    handleColorChange(e.target.name, e.target.value);
  };
  const handleColorInput = (color) => {
    handleColorChange(name, color);
  };

  return (
    <div
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
      className="relative"
    >
      <div className="relative flex items-center gap-2">
        <span className="flex gap-1">
          <Icon className="text-body body-text" />
          <p className="label text-body">{label}:</p>
        </span>
        <input
          name={name}
          className="bg-page text-body outline-brand-hover w-full rounded-sm border p-1 pr-5 pl-1.5 text-sm text-[13px]"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <div
          className="absolute top-[50%] right-0 h-3 w-3 translate-[-50%] transform rounded-[5px]"
          style={{ backgroundColor: value }}
        ></div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-10 right-10 z-30 w-full"
          >
            <HexColorPicker color={value} onChange={handleColorInput} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SuccessPage = ({ handleShow, data }) => {
  const ref = useRef(null);
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
        className="full center rounded-lg"
        ref={ref}
      >
        <div className="bg-surface grid h-6/7 w-4/5 grid-cols-2 grid-rows-5 gap-3 rounded-lg p-3">
          <div className="full bg-surface col-span-2 flex items-center justify-between rounded-lg px-5">
            <div className="flex items-center gap-3">
              <IoCheckmarkDoneCircleOutline className="text-success bg-success-bg rounded-full p-2 text-7xl" />
              <div>
                <p className="subheading text-success">
                  QR Code created successfully!
                </p>
                <p className="label text-body leading-3">
                  Your QR code is ready to engage
                </p>
              </div>
            </div>
            <div>
              <IconButton onClick={handleShow} icon={IoMdArrowBack} />
            </div>
          </div>
          <div
            style={{ boxShadow: "0 0  10px 1px rgb(0,0,0,0.1)" }}
            className="full center row-span-4 flex flex-col justify-between rounded-lg p-3"
          >
            <p className="title-sm mt-2">QR Code Preview</p>
            <img
              style={{ boxShadow: "0 0  10px 1px rgb(0,0,0,0.1)" }}
              className="border-brand h-60 w-60 rounded-lg border-2 p-2"
              src={data.imgUrl}
              alt=""
            />
            <div className="flex w-full gap-3">
              <Button
                onClick={() =>
                  downloadImage(data.imgUrl, data.name, data.shortCode)
                }
                label="Download PNG"
                icon={FiDownload}
              />
              <LightButton
                label="Download PDF"
                onClick={() =>
                  downloadAsPDF(data.imgUrl, data.name, data.shortCode)
                }
                icon={FaRegFilePdf}
              />
            </div>
          </div>

          <div
            style={{ boxShadow: "0 0  10px 1px rgb(0,0,0,0.1)" }}
            className="full row-span-4 flex flex-col justify-around rounded-lg p-3"
          >
            <p className="title-sm">QR Code Details</p>
            <ListItem
              label="Name"
              type={"text"}
              value={data.name}
              icon={CgRename}
            />
            <ListItem
              label="Short Code"
              type={"tag"}
              value={data.shortCode}
              icon={TbHash}
            />
            <ListItem
              label="Destination Url"
              type={"url"}
              value={data.destinationUrl}
              icon={IoIosGlobe}
            />

            <ListItem
              label="Click Url"
              type={"url"}
              value={`${config.clickUrl}/${data.shortCode}`}
              icon={FaLink}
            />
            <ListItem
              label="QR Url"
              type={"url"}
              value={`${config.clickUrl}/q/${data.shortCode}`}
              icon={RiQrCodeLine}
            />
            <ListItem
              label="Created At"
              type={"text"}
              value={formatDate(data.createdAt)}
              icon={MdOutlineDateRange}
            />
            <ListItem
              label="Status"
              type={"tag"}
              value={data.isActive ? "Active" : "Inactive"}
              icon={IoMdCheckmarkCircleOutline}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ListItem = ({ label, icon: Icon, type, value }) => {
  return (
    <div className="flex items-center">
      <div className="flex w-1/2 items-center gap-3">
        <Icon className="text-info bg-info-bg rounded-sm p-2 text-4xl" />
        <p className="bold-label text-body">{label}</p>
      </div>
      <div className="w-1/2 overflow-hidden">
        {type === "text" ? (
          <p className="bold-label truncate">{value}</p>
        ) : type === "url" ? (
          <a href={value} className="bold-label link full block truncate">
            {value}
          </a>
        ) : (
          <p
            className={`inline-block ${value === "Active" ? "bg-success-bg text-success" : "bg-error-bg text-error"} bold-label truncate rounded-sm px-2 py-1`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
};
