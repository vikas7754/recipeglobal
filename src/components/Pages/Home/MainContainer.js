import useTheme from "@/redux/hooks/useTheme";
import React from "react";
import styles from "@/styles/pages/home/Main.module.scss";
import Link from "next/link";

function MainContainer() {
  const { isDark } = useTheme();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>INSTEAD OF GOING OUT TO DINNER, COOK GOOD FOOD.</h1>
        <p>
          Food is symbolic of love when words are inadequate. People who love to
          eat are always the best people. Cooking is like love. It should be
          entered into with abandon or not at all.
        </p>
        <div className={styles.btns}>
          <Link href="/login" className="btn-primary">
            Login
          </Link>
          <Link href="/signup" className="btn-secondary">
            Signup
          </Link>
        </div>
        <div className={styles.rating}></div>
      </div>
      <div className={styles.right}>
        <img
          src={isDark ? "/dark.webp" : "/light.webp"}
          alt="Main image"
          width="100%"
          priority="true"
        />
      </div>
    </div>
  );
}

export default MainContainer;
