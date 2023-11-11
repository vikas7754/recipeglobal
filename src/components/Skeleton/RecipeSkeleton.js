import styles from "@/styles/Skeleton/Recipe.module.scss";

function RecipeSkeleton() {
  return (
    <div className={styles.container}>
      <div></div>
      <div></div>
      <div></div>
      <div className={styles.content}>
        <div></div>
        <div></div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default RecipeSkeleton;
