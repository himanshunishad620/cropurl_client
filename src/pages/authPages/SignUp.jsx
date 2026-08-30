import FormContainer from "@/components/core/FormContainer";
import Button from "@/components/UI/Button";
import CustomToast from "@/components/UI/CustomToast";
import EmailInput from "@/components/UI/EmailInput";
import PasswordInput from "@/components/UI/PasswordInput";
import PasswordRequirement from "@/components/UI/PasswordRequirement";
import StatusPage from "@/components/UI/StatusPage";
import TextInput from "@/components/UI/TextInput";
import axiosApi from "@/config/axios";
import useHandleForm from "@/hooks/useHandleForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { values, errors, handleChange, handleSubmit, isLoading } =
    useHandleForm({
      firstName: "Himanshu",
      lastName: "Nishad",
      email: "himanshunishad620@gmail.com",
      password: "Himan@123",
      confirmPassword: "Himan@123",
    });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onSubmit = async (values) => {
    try {
      const res = await axiosApi.post("/auth/generateVerificationLink", values);
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
        type="info"
        title="Verification Link Generated!"
        description="Your verification link has been sent. Check your email to verify your account securely."
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
          Sign Up
        </h1>
        <p className="text-body label mb-3 w-4/5 text-center md:w-3/5">
          Create your account to generate, manage, and track QR codes
          effortlessly.
        </p>
        <div className="flex w-full gap-4">
          <TextInput
            onChange={handleChange}
            name="firstName"
            label="First Name"
            value={values.firstName}
            placeholder="ex:John"
            error={errors.firstName}
            helperText="Between 4 to 16"
          />
          <TextInput
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            value={values.lastName}
            placeholder="ex:Doe"
            error={errors.lastName}
            helperText="Between 4 to 16"
          />
        </div>
        <EmailInput
          onChange={handleChange}
          name="email"
          label="Email"
          value={values.email}
          placeholder="ex:abc@zyz.com"
          error={errors.email}
          helperText="Valid email"
        />
        <PasswordInput
          onChange={handleChange}
          name="password"
          label="Password"
          value={values.password}
          placeholder="ex:Abcd@1235"
          error={errors.password}
          helperText="A-Z,0-9,special characters"
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
          label="Confirm Password"
          value={values.confirmPassword}
          placeholder="ex:Abcd@1235"
          error={errors.confirmPassword}
          helperText="A-Z,0-9,special characters"
        />
        <div id="clerk-captcha"></div>
        <span className="label text-body my-4">
          Already have an account? Go to{" "}
          <Link className="link" to={"/auth"} replace={true}>
            Login
          </Link>
        </span>
        <Button
          label="Sign Up"
          isLoading={isLoading}
          onClick={() => console.log("Form Submisson")}
          // Icon={<MdSubject className="text-xl text-white" />}
          left={false}
        />
      </FormContainer>
    </div>
  );
};

export default SignUp;
