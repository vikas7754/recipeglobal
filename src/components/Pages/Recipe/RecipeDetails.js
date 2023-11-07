import Checkbox from "@/components/UI/Checkbox";
import styles from "@/styles/pages/Recipe/Recipe.module.scss";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouTubeEmbed from "@/components/UI/YouTubeEmbed";
import Link from "next/link";
import { elapsedTime } from "@/modules/elapsedTime";
import { useState } from "react";
import Related from "@/components/Related";

function RecipeDetails({ recipe }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.left}>
          <div
            className={recipe.category === "veg" ? styles.veg : styles.nonVeg}
          >
            <FontAwesomeIcon icon={faCircle} />
            <span>{recipe.category}</span>
          </div>
          <h1 className="title">{recipe.title}</h1>
          <div className={styles.author}>
            <Link href={`/u/${recipe.author.username}`}>
              <img
                src={recipe.author.image}
                alt={recipe.author.username}
                width="30px"
              />
              <span>{recipe.author.username}</span>
            </Link>
            <div>- {elapsedTime(recipe.createdAt)}</div>
          </div>
          <p>{recipe.description}</p>
        </div>
        <div className={styles.img}>
          {recipe.video ? (
            <div>
              <YouTubeEmbed video={recipe.video} />
            </div>
          ) : (
            <img src={recipe.image} alt={recipe.title} width="100%" />
          )}
        </div>
      </div>
      <div className={styles.tabs}>
        <button
          className={active === 0 ? styles.active : ""}
          onClick={() => setActive(0)}
        >
          Ingredients
        </button>
        <button
          className={active === 1 ? styles.active : ""}
          onClick={() => setActive(1)}
        >
          Instructions
        </button>
        <button
          className={active === 2 ? styles.active : ""}
          onClick={() => setActive(2)}
        >
          Photos
        </button>
      </div>
      <div className={styles.content}>
        <div
          className={styles.ingredients}
          style={{ display: active === 0 ? "flex" : "none" }}
        >
          {recipe.ingredients.map((ingredient, i) => (
            <Checkbox key={i} data={ingredient} />
          ))}
        </div>

        <div
          className={styles.instructions}
          style={{ display: active === 1 ? "flex" : "none" }}
        >
          {recipe.instructions.map((instruction, i) => (
            <Checkbox key={i} data={instruction} />
          ))}
        </div>

        <div
          className={styles.photos}
          style={{ display: active === 2 ? "flex" : "none" }}
        >
          {recipe.images.map((image, i) => (
            <div key={i}>
              <img src={image} alt={recipe.title} width="100%" />
            </div>
          ))}
        </div>
      </div>
      <Related />
    </div>
  );
}

export default RecipeDetails;
