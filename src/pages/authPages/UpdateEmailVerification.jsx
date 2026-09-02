import StatusPage from "@/components/UI/StatusPage";
import axiosApi from "@/config/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Handles verification for an email update.
const UpdateEmailVerification = () => {
  const { token } = useParams();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  // Verifies the token when the page loads.
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axiosApi.patch("/auth/updateEmail", {
          rawToken: token,
        });
        console.log(res);
      } catch (err) {
        setError(err);
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
        title="Email Verfication Pending!"
        description="Please wait, email verificaiton is pending!"
        primaryText="Go to"
        linkText="Login"
        redirect={"/auth"}
      />
    );
  return error ? (
    <StatusPage
      key="error"
      type="error"
      title={error.status}
      description={error.message}
      primaryText="Go to"
      linkText="Login"
      redirect={"/auth"}
    />
  ) : (
    <StatusPage
      key="success"
      type="success"
      title="Email Verified Successfully!"
      description="Your email has verified successfully. Start creating and managing your QR codes."
      primaryText="Go to"
      linkText="Login"
      redirect={"/auth"}
    />
  );
};

export default UpdateEmailVerification;
