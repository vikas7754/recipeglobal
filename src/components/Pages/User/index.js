"use client";
import { getUserData } from "@/actions/recipe";
import AllRecipes from "@/components/UI/AllRecipes";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/User/User.module.scss";
import Layout from "@/components/Layout";
import LogoLoader from "@/components/Skeleton/LogoLoader";
import Link from "next/link";
import useUser from "@/redux/hooks/useUser";

function UserPage({ username }) {
  const { user } = useUser();
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
      {loading && (
        <div className={styles.container}>
          <LogoLoader />
        </div>
      )}
      {error && (
        <Layout>
          <div className={styles.err}>
            <h3>User not found</h3>
          </div>
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
              {user && user.username === username && (
                <div>
                  <Link href="/update-profile">Edit Profile</Link>
                </div>
              )}
              <div>
                <a href={`https://freecodez.com/u/${username}`} target="_blank">
                  View on Freecodez
                </a>
              </div>
            </div>
          </div>
        </AllRecipes>
      )}
    </>
  );
}

export default UserPage;
