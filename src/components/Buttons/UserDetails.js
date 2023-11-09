import useUser from "@/redux/hooks/useUser";
import styles from "@/styles/Buttons/UserDetails.module.scss";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoginSignup from "../LoginSignup";

function UserDetails() {
  const { isLoggedIn, user, logout } = useUser();
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        detailsRef.current &&
        !detailsRef.current.contains(e.target)
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!isLoggedIn && show && (
        <div className={styles.LoginSignup}>
          <LoginSignup isShowLogin={true} onClose={() => setShow(false)} />
        </div>
      )}
      <div className={styles.container}>
        {isLoggedIn ? (
          <>
            <button
              ref={btnRef}
              className="btn"
              onClick={() => setToggle(!toggle)}
            >
              <img src={user.image} alt={user.username} width="100%" />
            </button>
            {toggle && (
              <div ref={detailsRef} className={styles.details}>
                <Link href={`/u/${user.username}`}>View Profile</Link>
                <Link href={`/u/${user.username}`}>{user.username}</Link>
                <Link href={`/u/${user.username}`}>{user.name}</Link>
                <Link href={`/u/${user.username}`}>{user.email}</Link>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className={styles.login + " btn"}
            onClick={() => setShow(true)}
          >
            Login <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        )}
      </div>
    </>
  );
}

export default UserDetails;
