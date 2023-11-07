"use client";
import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import styles from "@/styles/LoginSignupComponent.module.scss";
import Signup from "./Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LoginSignup({ isShowLogin = true, hideCloseBtn = false, onClose }) {
  const [toggle, setToggle] = useState(isShowLogin);
  const Ref = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!Ref?.current?.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={Ref}>
      <div className={styles.wrapper}>
        {!hideCloseBtn && (
          <button className={styles.close_btn} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        <div className={styles.leftPanel}>
          <div>
            <div className={styles.title}>
              <h2>{toggle ? "Login Here" : "Signup Here"}</h2>
            </div>
            <div className={styles.middle}>
              <div>
                <img src="/user.png" alt="logo" height="180px" />
              </div>
            </div>
            <div className={styles.account_check}>
              <p>
                {toggle ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button onClick={() => setToggle(!toggle)}>
                {toggle ? "Signup Here" : "Login Here"}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.form_container}>
          {toggle ? (
            <Login onSuccess={onClose} />
          ) : (
            <Signup onSuccess={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
