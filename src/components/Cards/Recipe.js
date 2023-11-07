import { elapsedTime } from "@/modules/elapsedTime";
import styles from "@/styles/Cards/Recipe.module.scss";
import { faAnglesRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Rating from "../Buttons/Rating";

function Recipe({ data }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {data.title.length > 70
          ? data.title.substr(0, 70).concat("...")
          : data.title}
      </h3>
      <div className={styles.author}>
        <Link href={`/u/${data.author.username}`}>
          <img
            src={data.author.image}
            alt={data.author.username}
            width="30px"
          />
          <span>@{data.author.username}</span>
        </Link>
        <span>&bull;</span>
        <span>{elapsedTime(data.createdAt)}</span>
      </div>
      <div className={styles.tags}>
        <Link
          href={`/${data.category}`}
          className={data.category === "veg" ? styles.veg : ""}
        >
          <i>
            <FontAwesomeIcon icon={faCircle} />
          </i>
          <span>{data.category}</span>
        </Link>
        <Link href={`/tag/${data.tags[0]}`}>#{data.tags[0]}</Link>
        <Link href={`/tag/${data.tags[1]}`}>#{data.tags[1]}</Link>
      </div>
      <p className={styles.description}>
        <img
          src={data.image}
          alt={data.category}
          width="100px"
          className={styles.img}
        />
        {data.description.length > 300
          ? data.description.substr(0, 300).concat("...")
          : data.description}
      </p>
      <Rating
        id={data._id}
        currentRating={data.rating}
        isRated={data.isRated}
      />
      <div className={styles.btn}>
        <Link href={`/recipe/xyz`}>
          <span>View Recipe</span>
          <i>
            <FontAwesomeIcon icon={faAnglesRight} />
          </i>
        </Link>
      </div>
    </div>
  );
}

export default Recipe;
