import { useCreateQRsMutation } from "@/api/qrApi";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import {
  IoIosDoneAll,
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { IoCloudDoneOutline, IoCloudUploadOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { PiFileCsv } from "react-icons/pi";
import { RiResetLeftFill } from "react-icons/ri";
import Button from "../UI/Button";
import LightButton from "../UI/LightButton";
import Stepper from "../UI/Stepper";
import config from "./../../config/config";

const options = {
  size: 150,
  ecLevel: "H",
  bgColor: "#ffffff",
  fgColor: "#000000",
  quietZone: 10,
  style: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
  },
};

const steps = ["Import CSV", "Overview", "Create QRs"];

const ImportCSV = ({ handleImportShow }) => {
  const [createQRs, { isLoading, isSuccess, isError, reset }] =
    useCreateQRsMutation();

  const [file, setFile] = useState(null);
  const [errorData, setErrorData] = useState([]);
  const [validData, setValidData] = useState([]);
  const [currStep, setCurrStep] = useState(1);

  const ref = useRef(null);

  // Close the import modal when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (e.target && e.target.contains(ref.current)) {
        handleImportShow();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleStepInc = () => {
    if (currStep < steps.length) {
      setCurrStep((pre) => pre + 1);
    }
  };

  const handleStepDec = () => {
    if (currStep > 1) {
      setCurrStep((pre) => pre - 1);
    }
  };

  // Submit the validated QR data
  const handleCreate = async () => {
    await createQRs({ qr: validData }).unwrap();
  };

  // Reset the import flow
  const handleReset = () => {
    setFile("");
    setValidData([]);
    setErrorData([]);
    setCurrStep(1);
    reset();
  };

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
        <div className="bg-surface flex h-2/3 w-1/2 flex-col gap-5 rounded-lg px-10 py-5">
          <Stepper currStep={currStep} steps={steps} />

          <div className="flex grow flex-col gap-3">
            {currStep === 1 && (
              <FileUpload
                file={file}
                setErrorData={setErrorData}
                setFile={setFile}
                setValidData={setValidData}
                handleNext={handleStepInc}
              />
            )}

            {currStep === 2 && (
              <ImportPreview
                file={file}
                errorData={errorData}
                totalRows={validData.length + errorData.length}
                validData={validData}
                setValidData={setValidData}
                validRows={validData.length}
                handleNext={handleStepInc}
                handlePre={handleStepDec}
              />
            )}

            {currStep === 3 && (
              <CreateQRs
                loading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                validData={validData}
                handleCreate={handleCreate}
                fileName={file.name}
                handleNext={handleStepInc}
                handlePre={handleStepDec}
                handleReset={handleReset}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImportCSV;

const FileUpload = ({
  handleNext,
  file,
  setFile,
  setValidData,
  setErrorData,
}) => {
  // Parse and validate the imported CSV data
  const prepareData = async () => {
    const { default: Papa } = await import("papaparse");

    const textRegex = /^(?=.{4,16}$)[A-Za-z ]+$/;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const isValidUrl = (value) => {
          try {
            const url = new URL(value);

            return ["http:", "https:"].includes(url.protocol);
          } catch {
            return false;
          }
        };

        const validData = [];
        const errorData = [];
        const arr = results.data;

        arr.forEach((row, ind) => {
          const { name, destinationUrl } = row;

          const isValidName = textRegex.test(name?.trim() || "");

          const isValidDestination = isValidUrl(destinationUrl?.trim());

          if (isValidName && isValidDestination) {
            validData.push(row);
          } else {
            errorData.push({
              ...row,
              row: ind + 1,
            });
          }
        });

        setValidData([...validData]);
        setErrorData([...errorData]);
        handleNext();
      },

      error: (error) => {
        console.error(error);
      },
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2 MB
  });

  return (
    <React.Fragment>
      <div
        className={`center cursor-pointer ${
          isDragActive && "bg-page"
        } border-muted grow flex-col rounded-lg border-2 border-dashed duration-100`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <IoCloudUploadOutline className="text-body text-7xl" />

        <p className="title-sm text-body">Drag and Drop file to upload</p>

        <p className="title-sm text-body">or</p>

        <p className="title-sm text-body">Browse</p>

        <p className="bold-label text-body">
          {file ? file.name : "Supported files : CSV, Max size : 2MB"}
        </p>
      </div>

      <div className="flex w-full justify-between">
        <span>
          <p className="bold-label text-body">Note:</p>

          <p className="label text-body">
            name and destinationUrl are the required field.
          </p>
        </span>

        <div className="w-25">
          <Button
            label="Next"
            left={false}
            disabled={!file}
            onClick={prepareData}
            icon={IoMdArrowRoundForward}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const ImportPreview = ({
  file,
  totalRows,
  validRows,
  validData,
  setValidData,
  errorData,
  handleNext,
  handlePre,
}) => {
  const [preparing, setPreparing] = useState(false);

  // Generate short codes and QR images for valid rows
  const handleFinalData = async () => {
    setPreparing(true);

    const { generateDataURL } = await import("react-qrcode-logo");

    const finalData = await Promise.all(
      validData.map(async (row) => {
        const shortCode = nanoid(7);

        const imgUrl = await generateDataURL(
          {
            ...options,
            value: `${config.clickUrl}/qr/${shortCode}`,
          },
          "png",
        );

        return {
          ...row,
          shortCode,
          imgUrl,
        };
      }),
    );

    setValidData(finalData);
    setPreparing(false);
    handleNext();
  };

  return (
    <React.Fragment>
      <p className="title-sm text-body">{file.name}</p>

      <div className="flex grow flex-col gap-3">
        {/* Row summary */}
        <div className="flex justify-between">
          <span className="text-info flex items-center gap-1">
            <p className="body-sm flex items-center">
              <LuClipboardList className="text-md" />
              Total Rows :{" "}
            </p>

            <p className="body-bold">{totalRows}</p>
          </span>

          <span className="text-success flex items-center gap-1">
            <p className="body-sm flex items-center">
              <IoIosDoneAll className="text-2xl" />
              Valid Rows :{" "}
            </p>

            <p className="body-bold">{validRows}</p>
          </span>

          <span className="text-error flex items-center gap-1">
            <p className="body-sm flex items-center">
              <BiError className="text-lg" />
              Invalid Rows :{" "}
            </p>

            <p className="body-bold">{errorData.length}</p>
          </span>
        </div>

        <p className="body-bold text-body">Invalid rows</p>

        {/* Invalid rows list */}
        {!errorData.length && (
          <div className="bg-page center max-h-50 grow flex-col rounded-lg px-3">
            <IoCloudDoneOutline className="text-info text-7xl" />

            <p className="text-body body-sm">No invalid row found</p>
          </div>
        )}

        {!!errorData.length && (
          <div className="bg-page relative max-h-50 grow scrollbar-none overflow-scroll rounded-lg px-3">
            <div className="bg-page sticky top-0 left-0 flex gap-4 border-b border-gray-300 p-2">
              <p className="body-bold w-20 truncate">Row</p>

              <p className="body-bold w-70 truncate">Name</p>

              <p className="body-bold w-full truncate">Destination URL</p>
            </div>

            {errorData.map((row, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-gray-300 p-2"
              >
                <p className="body-sm w-20 truncate">{row.row}</p>

                <p className="body-sm w-70 truncate">{row.name || "<empty>"}</p>

                <p className="body-sm w-full truncate">
                  {row.destinationUrl || "<empty>"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex w-full justify-between">
        <div className="w-25">
          <LightButton
            label="Back"
            onClick={handlePre}
            icon={IoMdArrowRoundBack}
          />
        </div>

        <div className="w-25">
          <Button
            label="Next"
            disabled={!validRows}
            left={false}
            isLoading={preparing}
            onClick={handleFinalData}
            icon={IoMdArrowRoundForward}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const CreateQRs = ({
  handleCreate,
  validData,
  loading,
  isSuccess,
  isError,
  fileName,
  handlePre,
  handleReset,
}) => {
  return (
    <React.Fragment>
      <p className="title-sm text-body">Ready to upload</p>

      <div className="flex grow flex-col items-center justify-around">
        <p className="title-sm text-body">Ready to Create QR's</p>

        <p className="body-sm text-body">
          You're about to create QR codes from your imported data.
        </p>

        {!loading && !isSuccess && !isError && (
          <div className="center bg-page my-3 w-100 grow flex-col gap-1 rounded-lg">
            <PiFileCsv className="text-body text-7xl" />

            <p className="body-sm text-body">{fileName}</p>

            <p className="text-body body-bold">
              {validData.length} QR codes will be created
            </p>
          </div>
        )}

        {loading && (
          <motion.div
            key={49}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="center bg-page my-3 w-100 grow flex-col gap-3 rounded-lg"
          >
            <p className="title-sm text-body">Creating QR's</p>

            <ImSpinner3 className="text-brand animate-spin text-2xl" />

            <p className="text-body body-bold">
              Creating {validData.length} QR codes...
            </p>

            <p className="text-body label">Please wait a moment</p>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            key={93}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="center bg-page my-3 w-100 grow flex-col gap-1 rounded-lg"
          >
            <span className="flex flex-col items-center gap-1">
              <IoCloudDoneOutline className="text-success text-7xl" />

              <p className="body-bold text-body">{fileName}</p>
            </span>

            <p className="text-body body-sm">
              {validData.length} QR's created succesfully
            </p>

            <div className="w-1/3">
              <Button
                label="Upload More"
                icon={AiOutlineCloudUpload}
                onClick={handleReset}
              />
            </div>
          </motion.div>
        )}

        {isError && (
          <motion.div
            key={93}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="center bg-page my-3 w-100 grow flex-col gap-1 rounded-lg"
          >
            <span className="flex flex-col items-center gap-1">
              <MdErrorOutline className="text-error text-7xl" />

              <p className="body-bold text-body">Upload failed</p>
            </span>

            <p className="text-body body-sm">Something went wrong</p>

            <div className="w-1/3">
              <Button
                label="Retry!"
                icon={RiResetLeftFill}
                onClick={handleReset}
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between">
        <div className="w-25">
          <LightButton
            label="Back"
            onClick={handlePre}
            icon={IoMdArrowRoundBack}
          />
        </div>

        <div className="w-25">
          <Button
            label="Next"
            left={false}
            isLoading={loading}
            disabled={isSuccess || loading || isError}
            onClick={handleCreate}
            icon={IoMdArrowRoundForward}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
