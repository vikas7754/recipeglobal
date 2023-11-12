import styles from "@/styles/Skeleton/LogoLoader.module.scss";

function LogoLoader() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <svg width="100%" height="100%">
          <text x="0" y="100">
            RG
          </text>
        </svg>
      </div>
    </div>
  );
}

export default LogoLoader;
