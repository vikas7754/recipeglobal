"use client";
import { elapsedTime } from "@/modules/elapsedTime";
import styles from "@/styles/Cards/Recipe.module.scss";
import { faAnglesRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Rating from "../Buttons/Rating";
import RecipeOptions from "../Buttons/RecipeOptions";
import useUser from "@/redux/hooks/useUser";
import { useState } from "react";

function Recipe({ data }) {
  const { user } = useUser();
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      {!deleted && (
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
            {data.description.length > 350
              ? data.description.substr(0, 350).concat("...")
              : data.description}
          </p>
          <Rating
            id={data._id}
            currentRating={data.rating}
            isRated={data.isRated}
          />
          <div className={styles.btn}>
            <Link
              href={`/recipe/${data.title.replace(/ /g, "-")}-${data.slug}`}
            >
              <span>View Recipe</span>
              <i>
                <FontAwesomeIcon icon={faAnglesRight} />
              </i>
            </Link>
            {user && (user.role === "admin" || data.author._id === user.id) && (
              <RecipeOptions
                id={data._id}
                slug={data.slug}
                onDelete={setDeleted}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Recipe;
