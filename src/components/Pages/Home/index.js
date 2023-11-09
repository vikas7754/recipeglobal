"use client";
import useTheme from "@/redux/hooks/useTheme";
import useUser from "@/redux/hooks/useUser";
import styles from "@/styles/pages/home/Home.module.scss";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContainer from "@/components/Pages/Home/MainContainer";
import Layout from "@/components/Layout";
import Recipes from "./Recipes";
import { useEffect } from "react";

function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { isLoggedIn } = useUser();

  return (
    <Layout>
      <div className={styles.container}>
        <MainContainer />
        <h3 className="title">
          Amazing <span className="gradient">Recipes</span>
        </h3>
        <Recipes />
      </div>
    </Layout>
  );
}

export default HomePage;
