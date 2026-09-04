import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import GuestRoutes from "./GuestRoute";
import ProtectedRoutes from "./ProtectedRoutes";

import Layout from "@/pages/Layout";
import LoadingPage from "@/pages/LoadingPage";

// Lazy-loaded pages
const LandingPage = lazy(() =>
  import("@/pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);

const EmailVerification = lazy(
  () => import("@/pages/authPages/EmailVerification"),
);

const UpdateEmailVerification = lazy(
  () => import("@/pages/authPages/UpdateEmailVerification"),
);

const Login = lazy(() => import("@/pages/authPages/Login"));
const SignUp = lazy(() => import("@/pages/authPages/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/authPages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/authPages/ResetPassword"));

const Overview = lazy(() => import("@/pages/dashboardPages/Overview"));
const CreateQRPage = lazy(() => import("@/pages/dashboardPages/CreateQRPage"));
const Setting = lazy(() => import("@/pages/dashboardPages/Setting"));
const QRListPage = lazy(() => import("@/pages/dashboardPages/QRListPage"));
const QRDetailsPage = lazy(
  () => import("@/pages/dashboardPages/QRDetailsPage"),
);

const NotFound = lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Email verification */}
        <Route path="/verifyEmail/:token" element={<EmailVerification />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/verifyUpdateEmail/:token"
          element={<UpdateEmailVerification />}
        />

        {/* Auth */}
        <Route
          path="/auth"
          element={
            <GuestRoutes>
              <Outlet />
            </GuestRoutes>
          }
        >
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Overview />} />

          <Route path="create" element={<CreateQRPage />} />

          <Route path="settings" element={<Setting />} />

          <Route path="allqrs">
            <Route index element={<QRListPage />} />

            <Route path="details/:shortCode" element={<QRDetailsPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
