import {
  useDeleteQRMutation,
  useGetAnalyticsQuery,
  useGetQRQuery,
  useUpdateQRMutation,
} from "@/api/qrApi";
import PieCharts from "@/components/core/PieCharts";
import TopNDataList from "@/components/core/TopNDataList";
import Button from "@/components/UI/Button";
import CountCard from "@/components/UI/CountCard";
import CustomToast from "@/components/UI/CustomToast";
import Dialog from "@/components/UI/Dialog";
import IconButton from "@/components/UI/IconButton";
import LightButton from "@/components/UI/LightButton";
import Skeleton from "@/components/UI/Skeleton";
import StatusPage from "@/components/UI/StatusPage";
import SwitchInput from "@/components/UI/SwitchInput";
import TextInput from "@/components/UI/TextInput";
import { downloadAsPDF, downloadImage } from "@/helper/QR";
import useHandleForm from "@/hooks/useHandleForm";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuDownload, LuUsers } from "react-icons/lu";
import { MdContentCopy, MdOutlineQrCode2, MdQrCode2 } from "react-icons/md";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { TbFileTypePdf, TbHandClick } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config/config";

// Loads analytics for the selected QR code.
const QRDetailsPage = () => {
  const { shortCode } = useParams();
  const {
    data,
    isLoading: dataFetching,
    isError,
    error,
  } = useGetAnalyticsQuery(shortCode);
  // Displays the server error when analytics cannot be loaded.
  if (isError)
    return (
      <div className="full center">
        <StatusPage
          key="error"
          type="error"
          title={error?.data?.status}
          description={error?.data?.message}
        />
      </div>
    );
  return (
    <div className="grid h-full w-full grid-cols-3 gap-3">
      <div className="col-span-2 grid h-full w-full grid-cols-1 grid-rows-16 gap-3 py-3">
        <QRDetailsSection dataFetching={dataFetching} shortCode={shortCode} />
        <div className="row-span-3 grid h-full w-full grid-cols-3 gap-3">
          <CountCard
            icon={TbHandClick}
            isLoading={dataFetching}
            title={"Total Clicks"}
            caption={"in last 30 days"}
            growth={data?.totalClicksInLast30Days}
            suffix={"+"}
            value={data?.totalClicks}
            color={"text-purple-500"}
            bgColor={"bg-purple-500/10"}
          />
          <CountCard
            suffix={"+"}
            icon={MdOutlineQrCode2}
            isLoading={dataFetching}
            title={"Total Scans"}
            caption={"in last 30 days"}
            growth={data?.totalScansInLast30Days}
            value={data?.totalScans}
            color={"text-emerald-500"}
            bgColor={"bg-emerald-500/10"}
          />
          <CountCard
            icon={LuUsers}
            suffix={"%"}
            isLoading={dataFetching}
            title={"Unique Clicks"}
            caption={"rate of unique user"}
            growth={data?.uniqueClicksRate}
            value={data?.uniqueClicks}
            color={"text-lime-500"}
            bgColor={"bg-lime-500/10"}
          />
        </div>

        <div className="row-span-4 grid h-full w-full grid-cols-2 gap-3">
          <TopNDataList
            isLoading={dataFetching}
            data={data?.topNCities?.value}
            title={"Cities"}
            caption={"Top 3 cities by no of request"}
          />
          <TopNDataList
            isLoading={dataFetching}
            data={data?.topNBrowsers?.value}
            title={"Browsers"}
            caption={"Top 3 browsers by no of request"}
          />
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 grid-rows-2 gap-3 py-3 pr-3">
        <div className="bg-surface h-full w-full rounded-lg shadow-sm">
          <PieCharts
            isLoading={dataFetching}
            datas={data?.topNCities?.percentage}
            caption={"Top 3 cities"}
            title="Cities"
          />
        </div>
        <div className="bg-surface h-full w-full rounded-lg shadow-sm">
          <PieCharts
            isLoading={dataFetching}
            datas={data?.topNBrowsers?.percentage}
            caption={"Top 3 Browsers used"}
            title="Browsers"
          />
        </div>
      </div>
    </div>
  );
};

export default QRDetailsPage;

// Manages QR details, editing, downloads, and deletion.
const QRDetailsSection = ({ dataFetching, shortCode }) => {
  const navigate = useNavigate();
  const { data, isFetching, isError, error } = useGetQRQuery(shortCode);
  const [updateQR, { isLoading: updating }] = useUpdateQRMutation(shortCode);
  const [deleteQR, { isLoading: deleting }] = useDeleteQRMutation(shortCode);
  const { values, errors, handleChange, handleSubmit, isLoading } =
    useHandleForm({
      destinationUrl: data?.destinationUrl,
      name: data?.name,
    });

  const [status, setStatus] = useState(data?.isActive);
  const [show, setShow] = useState(false);

  // Deletes the QR and returns to the QR list.
  const handleDelete = async () => {
    try {
      await deleteQR(shortCode).unwrap();
      toast.custom(
        <CustomToast
          type={"success"}
          description={"QR deleted succesfully!"}
        />,
      );
      navigate("/dashboard/allqrs");
    } finally {
      setShow((pre) => !pre);
    }
  };

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  const handleEnabledChange = () => {
    setStatus((pre) => !pre);
  };

  // Saves the edited QR details and status.
  const handleUpdate = async () => {
    try {
      await updateQR({ shortCode, ...values, status }).unwrap();
      toast.custom(
        <CustomToast
          type={"success"}
          description={"QR updated succesfully!"}
        />,
      );
    } catch (error) {}
  };

  // Copies the tracking URL to the clipboard.
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${config.clickUrl}/${data?.shortCode}`,
    );
    toast.custom(<CustomToast type={"success"} description={"URL copied"} />);
  };

  const handleQRClick = () => {
    window.open(`${config.clickUrl}/q/${data.shortCode}`, "_blank");
  };
  const handleUrlClick = () => {
    window.open(`${config.clickUrl}/${data.shortCode}`, "_blank");
  };

  useEffect(() => {
    values.name = data?.name;
    values.destinationUrl = data?.destinationUrl;
    setStatus(data?.isActive);
  }, [data]);

  if (error)
    return (
      <div className="full row-span-9">
        <StatusPage
          key="error"
          type="error"
          title={error?.data?.status}
          description={error?.data?.message}
        />
      </div>
    );
  if (dataFetching || isFetching) return <LoadingSkeleton />;
  return (
    <div className="full bg-surface row-span-9 flex flex-col rounded-lg px-5 pt-5 shadow-sm">
      <AnimatePresence>
        {show && (
          <Dialog
            onClick={handleDelete}
            isLoading={deleting}
            handleShow={handleShow}
            message={
              "This action cannot be undone. The QR code and its associated data may no longer be available after deletion."
            }
            title={"Delete QR Code?"}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-between">
        <p className="subheading text-body">QR Details</p>
        <div className="flex gap-5">
          <IconButton icon={MdContentCopy} onClick={handleCopy} />
          <IconButton icon={TbHandClick} onClick={handleUrlClick} />
          <IconButton icon={MdQrCode2} onClick={handleQRClick} />
          <IconButton icon={RiDeleteBin6Line} onClick={handleShow} />
        </div>
      </div>
      <div className="border-muted grid grow grid-cols-3 gap-3">
        <div className="aspect-square">
          <img className="full aspect-square" src={data?.imgUrl} alt="" />
        </div>
        <div className="full col-span-2">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <TextInput
              name="name"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              label="Name"
            />
            <TextInput
              name="destinationUrl"
              onChange={handleChange}
              value={values.destinationUrl}
              error={errors.destinationUrl}
              label="Destination URL"
            />
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-2">
                <p className="label text-body">Status :</p>
                <p
                  className={` ${status ? "bg-success-bg text-success" : "bg-error-bg text-error"} bold-label w-15 rounded-sm px-2 py-1 text-center`}
                >
                  {status ? "Active" : "Inactive"}
                </p>
              </span>
              <SwitchInput value={status} handleChange={handleEnabledChange} />
            </div>
            <Button label="Update" isLoading={updating} icon={RiEditLine} />
          </form>
        </div>
      </div>
      <div className="mb-3 flex gap-5">
        <LightButton
          label="Download PNG"
          icon={LuDownload}
          onClick={() => downloadImage(data.imgUrl, data.name, data.shortCode)}
        />
        <LightButton
          label="Download PDF"
          icon={TbFileTypePdf}
          onClick={() => downloadAsPDF(data.imgUrl, data.name, data.shortCode)}
        />
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="full bg-surface row-span-9 flex flex-col justify-between rounded-lg p-5">
      <div className="flex justify-between">
        <Skeleton className={"h-9 w-40"} />

        <div className="flex gap-3">
          {[1, 2, 3, 4].map((num) => (
            <Skeleton key={num} className={"h-9 w-9"} />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-50 w-50" />
        <Skeleton className="h-50 w-130" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
