import { useDeleteAllQrsMutation } from "@/api/qrApi";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/api/settingApi";
import FormContainer from "@/components/core/FormContainer";
import Avatar from "@/components/UI/Avatar";
import Button from "@/components/UI/Button";
import CustomToast from "@/components/UI/CustomToast";
import Dialog from "@/components/UI/Dialog";
import EmailInput from "@/components/UI/EmailInput";
import PasswordInput from "@/components/UI/PasswordInput";
import PasswordRequirement from "@/components/UI/PasswordRequirement";
import Skeleton from "@/components/UI/Skeleton";
import TextInput from "@/components/UI/TextInput";
import axiosApi from "@/config/axios";
import { formatDate } from "@/helper/Date";
import useAuthHook from "@/hooks/useAuthHook";
import useHandleForm from "@/hooks/useHandleForm";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { GrShieldSecurity } from "react-icons/gr";

import { MdOutlineDelete, MdOutlineManageAccounts } from "react-icons/md";

// Loads and updates the user's profile information.
const Profile = () => {
  const { data, isFetching } = useGetUserProfileQuery();
  const user = data ?? JSON.parse(localStorage.getItem("user"));
  const [updateProfile] = useUpdateProfileMutation();
  const { values, handleSubmit, setValues, errors, isLoading, handleChange } =
    useHandleForm({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });

  // Saves the updated profile details.
  const onSubmit = async () => {
    try {
      const res = await updateProfile(values).unwrap();
      toast.custom(<CustomToast type={"success"} description={res.message} />);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // Keeps form values in sync with the latest user data.
  useEffect(() => {
    setValues({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }, [user]);
  if (isFetching) return <ProfileSkeleton />;
  return (
    <div className="full flex flex-col gap-3 p-3">
      <div className="bg-surface flex w-full items-center gap-3 rounded-lg p-3 shadow-sm">
        <div className="h-15 w-15">
          <Avatar name={user?.firstName + " " + user?.lastName} />
        </div>
        <div className="flex flex-col justify-around">
          <p className="title-sm">{user?.firstName + " " + user?.lastName}</p>
          <p className="label text-body">{user?.email}</p>
          <p className="caption text-body">
            Since {formatDate(user?.createdAt)}
          </p>
        </div>
      </div>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        className="grow border-none px-20 shadow-sm"
      >
        <p className="subheading text-brand">Update Profile</p>
        <p className="label text-body w-80 text-center">
          Make changes to your personal information and keep your profile
          details updated
        </p>
        <TextInput
          label="First Name"
          name="firstName"
          helperText="Enter you first name"
          value={values.firstName}
          error={errors.firstName}
          onChange={handleChange}
          placeholder="e.g. John"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          helperText="Enter you last name"
          value={values.lastName}
          error={errors.lastName}
          onChange={handleChange}
          placeholder="e.g. Doe"
        />
        <EmailInput
          label="Email"
          name="email"
          helperText="Enter you email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          placeholder="e.g. johndoe@xyz.com"
        />
        <div className="my-3 w-full">
          <Button label="Save Changes" isLoading={isLoading} />
        </div>
      </FormContainer>
    </div>
  );
};
// Handles password and account security settings.
const Security = () => {
  const { values, resetForm, handleSubmit, errors, isLoading, handleChange } =
    useHandleForm({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  const onSubmit = async () => {
    try {
      const res = await axiosApi.patch("/auth/updatePassword", {
        password: values.password,
        currentPassword: values.currentPassword,
      });
      resetForm();
      toast.custom(
        <CustomToast type={"success"} description={res.data.message} />,
      );
    } catch (err) {
      toast.custom(<CustomToast type={"error"} description={err.message} />);
    }
  };
  const hasLength = /^.{8,}$/.test(values.password);
  const hasNumber = /\d/.test(values.password);
  const hasSpecial = /[@$!%*?&#]/.test(values.password);
  const hasLowercase = /[a-z]/.test(values.password);
  const hasUppercase = /[A-Z]/.test(values.password);
  return (
    <div className="full flex flex-col gap-3 p-3">
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        className="grow border-none px-20 shadow-sm"
      >
        <p className="subheading text-brand">Change Password</p>
        <p className="label text-body w-80 text-center">
          Update your password regularly to help keep your account secure and
          protect your personal information
        </p>
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          helperText="It must be valid password"
          value={values.currentPassword}
          error={errors.currentPassword}
          onChange={handleChange}
        />
        <PasswordInput
          label="New Password"
          name="password"
          helperText="It must be valid password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          helperText="It must be valid password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
        <div className="w-full py-1">
          <PasswordRequirement
            text={"Minimum 8 characters"}
            isValid={hasLength}
          />
          <PasswordRequirement
            text={"Minimum one number"}
            isValid={hasNumber}
          />
          <PasswordRequirement
            text={"Minimum one uppercase letter"}
            isValid={hasUppercase}
          />
          <PasswordRequirement
            text={"Minimum one lowercase letter"}
            isValid={hasLowercase}
          />
          <PasswordRequirement
            text={"Minimum one special character"}
            isValid={hasSpecial}
          />
        </div>

        <div className="my-3 w-full">
          <Button label="Save Changes" isLoading={isLoading} />
        </div>
      </FormContainer>
    </div>
  );
};
const Account = () => {
  const [showAccountDelete, setShowAccountDelete] = useState(false);
  const [showQrDelete, setShowQrDelete] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const { setAuth } = useAuthHook();
  const [deleteAllQrs, { isLoading: deleting }] = useDeleteAllQrsMutation();
  const handleDeleteAllQrs = async () => {
    setShowQrDelete(true);
    try {
      const res = await deleteAllQrs().unwrap();
      toast.custom(<CustomToast type={"success"} description={res.message} />);
    } finally {
      setShowQrDelete(false);
    }
  };
  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await axiosApi.delete("/data/deleteAccount");
      setAuth(false, null);
      window.location.replace("/");
    } catch (error) {
      toast.custom(<CustomToast type={"error"} description={error?.message} />);
    } finally {
      setDeletingAccount(false);
    }
  };

  const handleAccountShow = () => {
    setShowAccountDelete((pre) => !pre);
  };
  const handleDeleteShow = () => {
    setShowQrDelete((pre) => !pre);
  };
  return (
    <div className="full p-3">
      <AnimatePresence>
        {showAccountDelete && (
          <Dialog
            onClick={handleDeleteAccount}
            handleShow={handleAccountShow}
            isLoading={deletingAccount}
            message={
              "This action cannot be undone. All your QR codes, links, analytics, and associated data will be permanently deleted."
            }
            title={"Delete Account?"}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showQrDelete && (
          <Dialog
            onClick={handleDeleteAllQrs}
            handleShow={handleDeleteShow}
            isLoading={deleting}
            message={
              "This action cannot be undone. The QR code and its associated data may no longer be available after deletion."
            }
            title={"Delete QR Code?"}
          />
        )}
      </AnimatePresence>
      <div className="bg-surface rounded-lg p-3 shadow-sm">
        <p className="title-sm text-body">QR Code Data</p>
        <p className="label text-body">
          Manage the QR codes associated with your account.
        </p>
        <p className="body-bold text-body mt-5">Delete all qr codes</p>
        <p className="label text-body">
          Permanently delete all QR codes created in your account.
        </p>
        <div className="mt-3 w-30">
          <Button
            icon={MdOutlineDelete}
            onClick={handleDeleteShow}
            label="Delete"
          />
        </div>
        <p className="body-bold text-body mt-5">Delete Account</p>
        <p className="text-body label max-w-84">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <div className="mt-3 w-30">
          <Button
            icon={MdOutlineDelete}
            onClick={handleAccountShow}
            isLoading={deletingAccount}
            label="Delete"
          />
        </div>
      </div>
    </div>
  );
};
const tabs = [
  {
    name: "Profile",
    icon: CgProfile,
    component: Profile,
  },
  {
    name: "Security",
    icon: MdOutlineManageAccounts,
    component: Security,
  },
  {
    name: "Account",
    icon: GrShieldSecurity,
    component: Account,
  },
];

const Setting = () => {
  const [currTab, setCurrTab] = useState(0);
  return (
    <div className="full p-3 pl-0">
      <div className="full bg-surface flex flex-col rounded-lg p-5 shadow-sm">
        <p className="subheading">Settings</p>
        <div className="grid grow grid-cols-3 gap-5">
          <div className="full pt-5">
            {tabs.map((tab, ind) => (
              <div
                onClick={() => setCurrTab(ind)}
                key={tab.name}
                className={`body-sm flex w-full cursor-pointer gap-2 rounded-md p-3 px-8 duration-100 ${currTab === ind ? "bg-brand-light text-brand" : "bg-surface text-body"}`}
              >
                <tab.icon className="text-xl" />
                {tab.name}
              </div>
            ))}
          </div>
          <div className="full bg-page col-span-2 rounded-lg">
            {tabs.map(
              (tab, ind) => currTab === ind && <tab.component key={tab.name} />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

const ProfileSkeleton = () => {
  return (
    <div className="full flex flex-col gap-3 p-3">
      <div className="bg-surface flex w-full items-center gap-3 rounded-lg p-3 shadow-sm">
        <Skeleton className={"h-15 w-15 rounded-full"} />
        <div>
          <Skeleton className={"h-3 w-40 rounded-full"} />
          <Skeleton className={"my-2 h-3 w-40 rounded-full"} />
          <Skeleton className={"h-3 w-40 rounded-full"} />
        </div>
      </div>
      <div className="bg-surface grow rounded-2xl p-20 shadow-sm">
        <Skeleton className={"full"} />
      </div>
    </div>
  );
};
