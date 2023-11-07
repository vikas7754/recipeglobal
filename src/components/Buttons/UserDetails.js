import useUser from "@/redux/hooks/useUser";
import styles from "@/styles/Buttons/UserDetails.module.scss";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function UserDetails() {
  const { isLoggedIn, user } = useUser();
  const [toggle, setToggle] = useState(false);
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
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <button
            ref={btnRef}
            className="btn"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src="https://res.cloudinary.com/freecodez/image/upload/v1698067298/images/fy8azbqxhgdrbbijhipe.webp"
              alt="user"
              width="100%"
            />
          </button>
          {toggle && (
            <div ref={detailsRef} className={styles.details}>
              <Link href={`/u/${user.username}`}>View Profile</Link>
              <Link href={`/u/${user.username}`}>John Doe</Link>
              <Link href={`/u/${user.username}`}>JohnDoe@gmail.com</Link>
              <button className="btn">Logout</button>
            </div>
          )}
        </>
      ) : (
        <Link href="/login">
          Login <FontAwesomeIcon icon={faAnglesRight} />
        </Link>
      )}
    </div>
  );
}

export default UserDetails;
