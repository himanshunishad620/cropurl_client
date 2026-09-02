import FormContainer from "@/components/core/FormContainer";
import Button from "@/components/UI/Button";
import CheckBox from "@/components/UI/CheckBox";
import CustomToast from "@/components/UI/CustomToast";
import EmailInput from "@/components/UI/EmailInput";
import PasswordInput from "@/components/UI/PasswordInput";
import axiosApi from "@/config/axios";
import useAuthHook from "@/hooks/useAuthHook";
import useHandleForm from "@/hooks/useHandleForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// Handles user authentication and session setup.
const Login = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const { setAuth } = useAuthHook();
  const { values, errors, handleChange, handleSubmit, isLoading } =
    useHandleForm({
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
    });
  // Submits the login credentials.
  const onSubmit = async (values) => {
    localStorage.setItem("email", checked ? values.email : "");
    localStorage.setItem("password", checked ? values.password : "");
    try {
      const res = await axiosApi.post("/auth/login", values);
      setAuth(true, res.data.user);
      console.log(res);
      console.log("himanshu");
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("wasLoggedOut", false);

      toast.custom(
        <CustomToast type={"success"} description={res.data.message} />,
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
      toast.custom(<CustomToast type={"error"} description={err.message} />);
    }
  };
  const onChange = () => {
    setChecked((pre) => !pre);
  };
  return (
    <div className="full center">
      <FormContainer
        className={"w-90 p-4 md:w-100 md:p-10"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 role="h1" className="text-brand subheading mb-1">
          Login
        </h1>
        <p className="text-body label mb-3 w-4/5 text-center">
          Login securely to access your account and continue where you left off.
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
        <PasswordInput
          onChange={handleChange}
          name="password"
          label="Password"
          value={values.password}
          placeholder="ex:Abcd@1235"
          error={errors.password}
          helperText="A-Z,0-9,special characters"
        />

        <span className="mb-4 flex w-full items-center justify-between">
          <CheckBox onChange={onChange} checked={checked} label={"Remember"} />
          <Link className="label link" to={"/auth/forgotPassword"} replace>
            Forgot Password
          </Link>
        </span>
        <Button label="Login" isLoading={isLoading} left={false} />
        <span className="label text-body my-4">
          Don't have an account?{" "}
          <Link className="link" to={"/auth/signup"}>
            Create account
          </Link>
        </span>
      </FormContainer>
    </div>
  );
};

export default Login;
