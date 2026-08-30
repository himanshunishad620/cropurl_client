import FormContainer from "@/components/core/FormContainer";
import Button from "@/components/UI/Button";
import CustomToast from "@/components/UI/CustomToast";
import PasswordInput from "@/components/UI/PasswordInput";
import PasswordRequirement from "@/components/UI/PasswordRequirement";
import StatusPage from "@/components/UI/StatusPage";
import axiosApi from "@/config/axios";
import useHandleForm from "@/hooks/useHandleForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { values, errors, handleChange, handleSubmit, isLoading } =
    useHandleForm({
      password: "",
      confirmPassword: "",
    });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onSubmit = async (values) => {
    try {
      const res = await axiosApi.post("/auth/resetPassword", {
        ...values,
        rawToken: token,
      });
      console.log(res);
      setFormSubmitted(true);
    } catch (err) {
      toast.custom(
        <CustomToast type={"error"} description={err.response.data.message} />,
      );
    }
  };
  const hasLength = /^.{8,}$/.test(values.password);
  const hasNumber = /\d/.test(values.password);
  const hasSpecial = /[@$!%*?&#]/.test(values.password);
  const hasLowercase = /[a-z]/.test(values.password);
  const hasUppercase = /[A-Z]/.test(values.password);
  if (formSubmitted)
    return (
      <StatusPage
        type="success"
        title="Password Reset Successful!"
        description="Your password has been changed. Please try to login with your new password. "
        primaryText="Go to"
        linkText="Login"
        redirect={"/auth"}
      />
    );
  return (
    <div className="full center">
      <FormContainer
        className={"w-90 p-4 md:w-120 md:p-10"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 role="h1" className="text-brand subheading mb-1">
          Reset Password
        </h1>
        <p className="text-body label mb-3 w-4/5 text-center md:w-3/5">
          Create a new password to regain access to your account.
        </p>

        <PasswordInput
          onChange={handleChange}
          name="password"
          label="New Password"
          value={values.password}
          placeholder="ex:Abcd@123"
          error={errors.password}
          helperText="Valid password"
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
        <PasswordInput
          onChange={handleChange}
          name="confirmPassword"
          label="Repeat Password"
          value={values.confirmPassword}
          placeholder="ex:Abcd@123"
          error={errors.confirmPassword}
          helperText="Repeat new password"
        />
        <div className="my-3 w-full">
          <Button
            label="Reset Password"
            isLoading={isLoading}
            onClick={() => console.log("Form Submisson")}
            // Icon={<MdSubject className="text-xl text-white" />}
            left={false}
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default ResetPassword;
