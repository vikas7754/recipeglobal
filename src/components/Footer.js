"use client";
import styles from "@/styles/Footer.module.scss";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.top}>
        <Link href="/">Recipe Global</Link>
        <div className={styles.social}>
          <Link href="https://www.linkedin.com/in/vikas7754/">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </Link>
          <Link href="https://github.com/vikas7754">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link href="https://www.instagram.com/freecodez.dev/">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="https://www.youtube.com/@freecodez">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/recipes">Recipes</Link>
        <Link href="/publish">Publish</Link>
        <Link href="/veg">Veg Recipes</Link>
        <Link href="/non-veg">Non-Veg Recipes</Link>
        <Link href="https://freecodez.com">Other</Link>
      </div>
      <hr />
      <div className={styles.bottom}>
        <p>© 2023 Recipe Global</p>
      </div>
    </footer>
  );
}

export default Footer;
