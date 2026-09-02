import FormContainer from "@/components/core/FormContainer";
import Button from "@/components/UI/Button";
import CustomToast from "@/components/UI/CustomToast";
import EmailInput from "@/components/UI/EmailInput";
import StatusPage from "@/components/UI/StatusPage";
import axiosApi from "@/config/axios";
import useHandleForm from "@/hooks/useHandleForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Requests a password reset link for the entered email.
const ForgotPassword = () => {
  const { values, errors, handleChange, handleSubmit, isLoading } =
    useHandleForm({
      email: "himanshunishad620@gmail.com",
    });
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Sends the reset link request.
  const onSubmit = async (values) => {
    try {
      const res = await axiosApi.post("/auth/forgotPassword", values);
      console.log(res);
      setFormSubmitted(true);
    } catch (err) {
      console.log(err);
      toast.custom(<CustomToast type={"error"} description={err.message} />, {
        id: "forgotPassword",
      });
    }
  };
  if (formSubmitted)
    return (
      <StatusPage
        type="info"
        title="Verification Link Generated!"
        description="Your reset password link has been sent. Check your email to reset your password securely."
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
          Fortgot Password
        </h1>
        <p className="text-body label mb-3 w-4/5 text-center md:w-3/5">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <EmailInput
          onChange={handleChange}
          name="email"
          label="Email"
          value={values.email}
          placeholder="ex:abc@zyz.com"
          error={errors.email}
          helperText="Valid email"
        />

        <span className="label text-body my-4">
          Remember your password ? Go to{" "}
          <Link className="link" to={"/auth"} replace={true}>
            Login
          </Link>
        </span>
        <Button
          label="Send Reset Link"
          isLoading={isLoading}
          onClick={() => console.log("Form Submisson")}
          left={false}
        />
      </FormContainer>
    </div>
  );
};

export default ForgotPassword;
