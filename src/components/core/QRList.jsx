import { formatDate } from "@/helper/Date";
import { FaRegDotCircle } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { LuMousePointerClick } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CheckBox from "../UI/CheckBox";

const QRList = ({ qr, isSelected, handleSelectChange }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${isSelected ? "border-brand " : "border-surface"} bg-surface mb-3 grid w-full grid-cols-[20px_80px_1fr_1.5fr_1fr_100px_100px] items-center gap-4 rounded-md border-2 p-2 px-7 shadow-sm`}
    >
      {/* Select QR */}
      <CheckBox
        checked={isSelected}
        onChange={() => handleSelectChange(qr.shortCode)}
      />

      {/* QR Image */}
      <img className="h-20 w-20 object-contain" src={qr.imgUrl} alt="" />

      {/* Name and creation date */}
      <div className="min-w-0">
        <p className="title-sm truncate">{qr.name}</p>

        <p className="label text-body flex items-center gap-1">
          <MdDateRange className="text-md shrink-0" />
          {formatDate(qr.createdAt)}
        </p>
      </div>

      {/* Destination URL and update date */}
      <div className="min-w-0">
        <a
          href={qr.destinationUrl}
          className="label link block truncate"
          title={qr.destinationUrl}
        >
          {qr.destinationUrl}
        </a>

        <p className="label text-body mt-1 flex items-center gap-1">
          <RiEditLine className="text-md shrink-0" />
          {formatDate(qr.updatedAt)}
        </p>
      </div>

      {/* Short code */}
      <p className="subheading text-body flex items-center gap-2">
        <LuMousePointerClick /> {qr.totalEngagement}
      </p>

      {/* QR status */}
      <span className="flex items-center gap-1">
        <FaRegDotCircle
          className={`${
            qr.isActive
              ? "bg-success-bg text-success"
              : "bg-error-bg text-error"
          } title-sm shrink-0 rounded-full p-0.5`}
        />

        <p
          className={`${
            qr.isActive ? "text-success" : "text-error"
          } bold-label`}
        >
          {qr.isActive ? "Active" : "Inactive"}
        </p>
      </span>

      {/* View QR details */}
      <div className="bg-brand-light text-brand border-brand rounded-xs border py-0.5">
        <button
          onClick={() => navigate(`/dashboard/allqrs/details/${qr.shortCode}`)}
          className="full label center cursor-pointer gap-1"
        >
          <GrFormView className="text-xl" />
          Details
        </button>
      </div>
    </div>
  );
};

export default QRList;
