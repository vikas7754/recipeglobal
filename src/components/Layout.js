import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useUser from "@/redux/hooks/useUser";
import { useGoogleOneTapLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import { getLoginUser, googleLogin } from "@/services/user";
// import { getLoggedInUser } from "@/actions/user";

const LoginWithGoogleButton = () => {
  const { login } = useUser();
  const handleLogin = async (data) => {
    try {
      const res = await googleLogin({ credential: data.credential });
      login(res.data);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
    }
  };
  useGoogleOneTapLogin({
    onSuccess: handleLogin,
    useOneTap: true,
  });
  return;
};

function Layout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const { user, isLoggedIn, login } = useUser();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) setShowLogin(true);
    }, 3000);
    setShowLogin(false);
    return () => clearTimeout(timer);
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      const getLoggedinUser = async () => {
        const res = await getLoginUser();
        if (res?.data?.username) login(res.data);
      };
      getLoggedinUser();
    }
  }, []);
  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
