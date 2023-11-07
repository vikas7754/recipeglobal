import { getAllRecipes } from "@/actions/recipe";
import Recipe from "@/components/Cards/Recipe";
import styles from "@/styles/pages/home/Recipes.module.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Recipes() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState();

  const fetchRecipes = async () => {
    if (data.length >= total) return setHasMore(false);
    const res = await getAllRecipes(page);
    if (!res) return setHasMore(false);
    console.log(res);
    setData([...data, ...res.recipes]);
    setTotal(res.total);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className={styles.recipes}>
      {data.length === 0 && !hasMore && <h4>No recipes found</h4>}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchRecipes}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>End of recipes</h4>}
        className={styles.recipes__grid}
      >
        {data.length > 0 &&
          data.map((recipe, i) => <Recipe key={i} data={recipe} />)}
      </InfiniteScroll>
    </div>
  );
}

export default Recipes;
