import React, { useState, useEffect } from "react";
import styles from "@/styles/LoginSignup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faShield,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { sendOtpForSignup, signup } from "@/services/user";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginWithGoogle from "./Buttons/LoginWithGoogle";
import useUser from "@/redux/hooks/useUser";

function Signup({ onSuccess = () => {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user, login } = useUser();
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setError("");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    setError("");
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const onChangeOtp = (e) => {
    setOtp(e.target.value);
    setError("");
  };
  const handleOtpSend = (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required");
    if (!name) return setError("Name is required");
    setSendingOtp(true);
    sendOtpForSignup({ email, name })
      .then((res) => {
        setToggle(true);
        setSendingOtp(false);
        toast.success("OTP sent to your email");
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err?.message);
        setSendingOtp(false);
      });
  };
  useEffect(() => {
    if (isLoggedIn && (pathname === "/login" || pathname === "/signup"))
      router.push(`/u/${user.username}`);
  }, [isLoggedIn]);
  const handleSignup = (e) => {
    e.preventDefault();
    if (!otp) return setError("OTP is required");
    if (!username) return setError("Username is required");
    if (!password) return setError("Password is required");
    setLoading(true);
    const payload = {
      name,
      email,
      username,
      password,
      otp,
    };
    signup(payload)
      .then((res) => {
        setLoading(false);
        login(res.data);
        setOtp("");
        setUsername("");
        setPassword("");
        toast.success("Signup success");
        if (pathname !== "/login" || pathname !== "/signup") onSuccess();
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err?.message);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      {toggle ? (
        <>
          {error && <div className="error">{error}</div>}
          <form action="" onSubmit={handleSignup}>
            <div className={styles.input}>
              <input
                type="number"
                placeholder="OTP"
                value={otp}
                onChange={onChangeOtp}
              />
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faShield} />
              </i>
            </div>
            <div className={styles.input}>
              <input
                type="text"
                name="userid"
                id="userid"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
              />
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div className={styles.input}>
              <input
                type={togglePassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faLock} />
              </i>
              <i
                className={styles.eye}
                onClick={() => setTogglePassword(!togglePassword)}
              >
                <FontAwesomeIcon icon={togglePassword ? faEye : faEyeSlash} />
              </i>
            </div>
            <div className={styles.submit}>
              <button type="submit" disabled={loading}>
                {loading ? "Please Wait " : "Signup"}
                {loading && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {error && <div className="error">{error}</div>}
          <form action="" onSubmit={handleOtpSend}>
            <div className={styles.input}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChangeEmail}
              />
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
            </div>
            <div className={styles.input}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={onChangeName}
              />
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div className={styles.submit}>
              <button type="submit" disabled={sendingOtp}>
                {sendingOtp ? "Please Wait " : "Proceed"}
                {sendingOtp && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </form>
          <div className={styles.or}>-------- OR --------</div>
          <LoginWithGoogle onSuccess={onSuccess} />
        </>
      )}
    </div>
  );
}

export default Signup;
