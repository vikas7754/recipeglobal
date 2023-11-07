import React, { useEffect, useState } from "react";
import styles from "@/styles/LoginSignup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { login as loginUser } from "@/services/user";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginWithGoogle from "./Buttons/LoginWithGoogle";
import useUser from "@/redux/hooks/useUser";

function Login({ onSuccess = () => {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const [togglePassword, setTogglePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user, login } = useUser();
  useEffect(() => {
    if (isLoggedIn && (pathname === "/login" || pathname === "/signup"))
      router.push(`/u/${user.username}`);
  }, [isLoggedIn]);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return setError("Username is required");
    if (!password) return setError("Password is required");
    setLoading(true);
    loginUser({ userId: username, password })
      .then((res) => {
        login(res.data);
        setLoading(false);
        setUsername("");
        setPassword("");
        setError("");
        toast.success("Login Successful");
        if (pathname !== "/login" || pathname !== "/signup") onSuccess();
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.message || err?.message);
      });
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setError("");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  return (
    <div className={styles.container}>
      {error && <div className="error">{error}</div>}
      <form action="" onSubmit={handleLogin}>
        <div className={styles.input}>
          <input
            type="text"
            name="userid"
            id="userid"
            value={username}
            placeholder="Username or Email"
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
            value={password}
            placeholder="Password"
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
        <div className={styles.forgotPassword}>
          <a href="/forgotPassword">Forgot Password</a>
        </div>
        <div className={styles.submit}>
          <button type="submit">
            {loading ? "Please Wait" : "Submit for Login"}
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </div>
      </form>
      <div className={styles.or}>-------- OR --------</div>
      <LoginWithGoogle onSuccess={onSuccess} />
    </div>
  );
}

export default Login;
