"use client";
import useTheme from "@/redux/hooks/useTheme";
import useUser from "@/redux/hooks/useUser";
import styles from "@/styles/pages/home/Home.module.scss";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContainer from "@/components/Pages/Home/MainContainer";
import Layout from "@/components/Layout";

function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { isLoggedIn } = useUser();

  return (
    <Layout>
      <div className={styles.container}>
        <MainContainer />
        <div>
          <h1>Hello</h1>
          <button onClick={toggleTheme}>
            Toggle Theme <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
