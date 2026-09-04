import { useDeleteQRsMutation, useGetQRsQuery } from "@/api/qrApi";
import QRList from "@/components/core/QRList";
import CustomToast from "@/components/UI/CustomToast";
import Dialog from "@/components/UI/Dialog";
import IconButton from "@/components/UI/IconButton";
import SelectInput from "@/components/UI/SelectInput";
import StatusPage from "@/components/UI/StatusPage";
import { exportCSV } from "@/helper/CSV";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuRefreshCw } from "react-icons/lu";
import {
  MdOutlineAddBox,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

const statusOptions = ["All", "Active", "Inactive"];
// const limitOptions = [5, 10];
const orderOptions = ["Ascending", "Descending"];
const sortOptions = ["Date", "Engagement"];

// Manages the QR list, filters, search, and pagination.
const QRListPage = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const [statusIndex, setStatusIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [orderIndex, setOrderIndex] = useState(0);
  const [limitIndex, setLimitIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetches QR codes using the current list filters.
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetQRsQuery({
      order: orderOptions[orderIndex],
      status: statusOptions[statusIndex],
      // page: pageIndex,
      search: searchQuery,
      sort: sortOptions[sortIndex],
      // limit: limitOptions[limitIndex],
    });
  const [deleteQRs, { isLoading: deleting }] = useDeleteQRsMutation();
  // Debounces search input before updating the API query.
  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      setSearchQuery(debounceValue);
    }, 1000);
    return () => clearTimeout(ref.current);
  }, [debounceValue]);

  // Adds or removes a QR from the current selection.
  const handleSelectChange = (shortCode) => {
    if (selected.includes(shortCode)) {
      setSelected((pre) => pre.filter((sCode) => sCode !== shortCode));
    } else {
      setSelected((pre) => [...pre, shortCode]);
    }
  };
  const handleQueryChange = (e) => {
    setDebounceValue(e.target.value);
  };
  const handleStatusChange = (index) => {
    setStatusIndex(index);
  };
  // const handleLimitChange = (index) => {
  //   setLimitIndex(index);
  // };
  const handleSortChange = (index) => {
    setSortIndex(index);
  };

  const handleOrderChange = (index) => {
    setOrderIndex(index);
  };
  // const handlePageChange = (index) => {
  //   setPageIndex(index);
  // };

  // Exports the currently filtered QR data.
  const handleExport = () => exportCSV(data?.arr);
  const handleShowDialog = () => {
    if (!selected.length)
      return toast.custom(
        <CustomToast
          type={"warning"}
          description={"No QR selected. Please select QR."}
        />,
      );
    setShowDeleteDialog((pre) => !pre);
  };
  // Deletes the selected QR codes after confirmation.
  const handleDelete = async () => {
    try {
      await deleteQRs({ shortCodes: selected }).unwrap();
      toast.custom(<CustomToast type={"success"} description={res.message} />);
    } finally {
      setSelected([]);
      setShowDeleteDialog((pre) => !pre);
    }
  };

  return (
    <div className="full p-3 pl-0">
      <div className="full bg-surface flex flex-col justify-start gap-5 rounded-lg p-5 shadow-sm">
        <AnimatePresence>
          {showDeleteDialog && (
            <Dialog
              onClick={handleDelete}
              isLoading={deleting}
              handleShow={handleShowDialog}
              message={
                "This action cannot be undone. The QR code and its associated data may no longer be available after deletion."
              }
              title={"Delete QR Code?"}
            />
          )}
        </AnimatePresence>
        <div className="flex w-full justify-between pb-4">
          <p className="subheading">QR Codes</p>
          <div className="flex gap-5">
            <IconButton icon={LuRefreshCw} onClick={refetch} />
            <IconButton icon={RiDeleteBin6Line} onClick={handleShowDialog} />
            <IconButton icon={TbWorldUpload} onClick={handleExport} />
            <IconButton
              icon={MdOutlineAddBox}
              onClick={() => navigate("/dashboard/create")}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex w-full items-center gap-2">
            <p className="label text-body">Search:</p>
            <input
              type="text"
              value={debounceValue}
              onChange={handleQueryChange}
              placeholder="Search for query"
              className="label text-body bg-page w-full rounded-sm border p-1.5 outline-none"
            />
          </div>

          <SelectInput
            label={"Status:"}
            options={statusOptions}
            width={"w-full"}
            selectedIndex={statusIndex}
            onChange={handleStatusChange}
          />

          <SelectInput
            label={"Sort:"}
            options={sortOptions}
            width={"w-full"}
            selectedIndex={sortIndex}
            onChange={handleSortChange}
          />
          <SelectInput
            label={"Order:"}
            options={orderOptions}
            width={"w-full"}
            selectedIndex={orderIndex}
            onChange={handleOrderChange}
          />
        </div>
        {/* <div className="flex w-full justify-between py-3">
          <p className="label text-body">
            Total no of QR's : <span className="bold-label">{data?.total}</span>
          </p>
          <p className="label text-body">
            No of QR's : <span className="bold-label">{data?.currCount}</span>
          </p>
          <p className="label text-body">
            Selected QR's :{" "}
            <span className="bold-label">{selected.length}</span>
          </p>
          <p className="label text-body">
            Page <span className="bold-label">{data?.pageNo}</span> of{" "}
            <span className="bold-label">{data?.totalPages || 1}</span>
          </p>
        </div> */}
        <div className="bg-page scrollbar-hide h-[calc(100vh-300px)] grow overflow-scroll rounded-lg px-3 pt-3">
          {isFetching && <LoadingPage />}
          {isError && !data?.arr?.length && (
            <StatusPage
              key="info"
              type="error"
              title={error.status}
              description={error.message}
              primaryText="Create"
              linkText="QR"
              redirect="/dashboard/create"
            />
          )}
          {!isError && !isLoading && !data?.arr?.length && (
            <StatusPage
              key="info"
              type="info"
              title="No Data Found!"
              description="There is not any QR data to show you. Please create QR."
              primaryText="Create"
              linkText="QR"
              redirect="/dashboard/create"
            />
          )}
          {data?.arr?.map((qr) => (
            <QRList
              handleSelectChange={handleSelectChange}
              isSelected={selected.includes(qr.shortCode)}
              qr={qr}
              key={qr._id}
            />
          ))}
        </div>
        {/* <Pagination
          onClick={handlePageChange}
          pageNo={data?.pageNo}
          totalPages={data?.totalPages}
          next={data?.hasNextPage}
          pre={data?.hasPreviousPage}
        /> */}
      </div>
    </div>
  );
};

export default QRListPage;

const Pagination = ({ onClick, totalPages, pageNo, next, pre }) => {
  const checkRange = (num) => num >= 1 && num <= totalPages;
  return (
    <div className="flex w-full items-center justify-center">
      <button
        disabled={!pre}
        onClick={() => onClick(pageNo - 1)}
        className="bg-brand center label mx-0.5 aspect-square w-6 rounded-sm p-1 text-white disabled:bg-gray-300"
      >
        <MdOutlineArrowBackIos className="font-bold" />
      </button>
      {checkRange(pageNo - 3) && <p>...</p>}
      {checkRange(pageNo - 2) && (
        <>
          <button
            onClick={() => onClick(pageNo - 2)}
            className="center bg-brand-light label mx-0.5 aspect-square w-6 rounded-sm p-1"
          >
            {pageNo - 2}
          </button>
        </>
      )}
      {checkRange(pageNo - 1) && (
        <>
          <button
            onClick={() => onClick(pageNo - 1)}
            className="center bg-brand-light label mx-0.5 aspect-square w-6 rounded-sm p-1"
          >
            {pageNo - 1}
          </button>
        </>
      )}
      <button className="center bg-brand label mx-0.5 aspect-square w-6 rounded-sm p-1 text-white">
        {pageNo}
      </button>
      {checkRange(pageNo + 1) && (
        <>
          <button
            onClick={() => onClick(pageNo + 1)}
            className="center bg-brand-light label mx-0.5 aspect-square w-6 rounded-sm p-1"
          >
            {pageNo + 1}
          </button>
        </>
      )}
      {checkRange(pageNo + 2) && (
        <>
          <button
            onClick={() => onClick(pageNo + 2)}
            className="center bg-brand-light label mx-0.5 aspect-square w-6 rounded-sm p-1"
          >
            {pageNo + 2}
          </button>
        </>
      )}
      {checkRange(pageNo + 3) && <p>...</p>}
      <button
        disabled={!next}
        onClick={() => onClick(pageNo + 1)}
        className="bg-brand center label mx-0.5 aspect-square w-6 rounded-sm p-1 text-white disabled:bg-gray-300"
      >
        <MdOutlineArrowForwardIos className="font-bold" />
      </button>
    </div>
  );
};
