"use client";
import styles from "@/styles/Buttons/LoginWithGoogle.module.scss";
import Image from "next/image";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/services/user";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useUser from "@/redux/hooks/useUser";

const LoginWithGoogleButton = ({ onSuccess }) => {
  const { login } = useUser();
  const pathname = usePathname();
  const handleLogin = async (data) => {
    try {
      const res = await googleLogin({ accessToken: data.access_token });
      login(res.data);
      toast.success("Login Successful");
      if (pathname !== "/login" || pathname !== "/signup") onSuccess();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
    }
  };
  const handleGoogleLogin = useGoogleLogin({ onSuccess: handleLogin });
  return (
    <button onClick={() => handleGoogleLogin()}>
      <Image
        src={`/svg/google_logo.svg`}
        width={40}
        height={40}
        alt="Google icon"
      />
      <span>Continue With Google</span>
    </button>
  );
};

function LoginWithGoogle({ onSuccess }) {
  return (
    <div className={styles.withGoogle}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GCID}>
        <LoginWithGoogleButton onSuccess={onSuccess} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginWithGoogle;
