import StatusPage from "@/components/UI/StatusPage";
import axiosApi from "@/config/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
  const { token } = useParams();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axiosApi.post("/auth/verifyLink", {
          rawToken: token,
        });
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setPending(false);
      }
    };
    verifyToken();
  }, []);
  if (pending)
    return (
      <StatusPage
        key="pending"
        type="pending"
        title="Verification Pending"
        description="Please wait while verification is pending."
      />
    );
  return error ? (
    <StatusPage
      key="error"
      type="error"
      title="Verification failed!"
      description={error}
      primaryText="Go to"
      linkText="Signup"
      redirect={"/auth/signup"}
    />
  ) : (
    <StatusPage
      key="success"
      type="success"
      title="Welcome to QRPilot!"
      description="Your account has been created successfully. Start creating and managing your QR codes."
      primaryText="Go to"
      linkText="Login"
      redirect={"/auth"}
    />
  );
};

export default EmailVerification;
