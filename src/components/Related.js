"use client";
import { getFilteredRecipes } from "@/actions/recipe";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Related.module.scss";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

function Related({ category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFilteredRecipes(1, "category", category);
      if (!res) return setLoading(false);
      setData(res.recipes);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {!loading && data.length != 0 && (
        <div className={styles.container}>
          <h3 className="title">
            Related <span className="gradient">Recipes</span>
          </h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
            }}
          >
            {data.map((recipe, i) => (
              <SwiperSlide key={i}>
                <div
                  className={styles.card}
                  style={{ backgroundImage: `url(${recipe.image})` }}
                >
                  <div className={styles.content}>
                    <h3>{recipe.title}</h3>
                    <Link
                      href={`/recipe/${recipe.title.replace(/ /g, "-")}-${
                        recipe.slug
                      }`}
                      className="btn-primary"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}

export default Related;
