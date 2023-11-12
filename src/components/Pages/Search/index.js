"use client";
import { searchRecipes } from "@/actions/recipe";
import Recipe from "@/components/Cards/Recipe";
import Layout from "@/components/Layout";
import RecipeSkeleton from "@/components/Skeleton/RecipeSkeleton";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "@/styles/pages/home/Recipes.module.scss";

function Search({ query }) {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchRecipes = async () => {
    if (!query) return;
    if (!hasMore) return;
    if (recipes.length === total) return setHasMore(false);
    const res = await searchRecipes(query, page);
    if (!res) return setHasMore(false);
    setRecipes([...recipes, ...res.recipes]);
    setTotal(res.total);
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <Layout>
      <div className={styles.recipes}>
        <InfiniteScroll
          dataLength={recipes.length}
          next={fetchRecipes}
          hasMore={hasMore}
          loader={
            <div className={styles.loader}>
              <RecipeSkeleton />
              <RecipeSkeleton />
            </div>
          }
          endMessage={<h4 className="end-msg">No more recipes</h4>}
          scrollThreshold={0.2}
        >
          <div className={styles.recipes__grid}>
            {recipes.map((recipe, i) => (
              <Recipe key={i} data={recipe} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export default Search;
