"use client";
import { getUserData } from "@/actions/recipe";
import AllRecipes from "@/components/UI/AllRecipes";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/User/User.module.scss";
import Layout from "@/components/Layout";

function UserPage({ username }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData(username);
      if (!res) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      setData(res);
    };
    fetchUserData();
  }, []);
  return (
    <>
      {loading && <div className={styles.container}>Loading...</div>}
      {error && (
        <Layout>
          <div className={styles.container}>User not found</div>
        </Layout>
      )}
      {data && (
        <AllRecipes filterBy="author" filterValue={data._id}>
          <div className={styles.container}>
            <div className={styles.img}>
              <img src={data.image} alt={data.username} />
            </div>
            <div>
              <h2>{data.name}</h2>
              <h4>{data.username}</h4>
              <div>{data.totalRecipes}</div>
            </div>
          </div>
        </AllRecipes>
      )}
    </>
  );
}

export default UserPage;
