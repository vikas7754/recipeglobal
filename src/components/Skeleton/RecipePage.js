import styles from "@/styles/Skeleton/RecipePage.module.scss";

function RecipePageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.content}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.img}></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.btns}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.recipe}>
          {[...Array(6)].map((_, i) => (
            <div key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipePageSkeleton;
