"use client";
import Layout from "../Layout";
import { getAllRecipes, getFilteredRecipes } from "@/actions/recipe";
import Recipe from "@/components/Cards/Recipe";
import RecipeSkeleton from "@/components/Skeleton/RecipeSkeleton";
import styles from "@/styles/pages/home/Recipes.module.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function AllRecipes({ filterBy, filterValue, children }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState();

  const fetchRecipes = async () => {
    if (data.length >= total) return setHasMore(false);

    if (filterBy && filterValue) {
      const res = await getFilteredRecipes(page, filterBy, filterValue);
      if (!res) return setHasMore(false);
      setData([...data, ...res.recipes]);
      setTotal(res.total);
      setPage(page + 1);
    } else {
      const res = await getAllRecipes(page);
      if (!res) return setHasMore(false);
      setData([...data, ...res.recipes]);
      setTotal(res.total);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <Layout>
      {children}
      <div className={styles.recipes}>
        {data.length === 0 && !hasMore && <h4>No recipes found</h4>}
        <InfiniteScroll
          dataLength={data.length}
          next={fetchRecipes}
          hasMore={hasMore}
          loader={
            <div className={styles.loader}>
              <RecipeSkeleton />
              <RecipeSkeleton />
            </div>
          }
          endMessage={<h4 className="end-msg">End of recipes</h4>}
        >
          <div className={styles.recipes__grid}>
            {data.length > 0 &&
              data.map((recipe, i) => <Recipe key={i} data={recipe} />)}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export default AllRecipes;
