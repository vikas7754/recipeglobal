import "react-toastify/dist/ReactToastify.min.css";
import "@/styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import ReduxProvider from "@/redux/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "RecipeGlobal - Free Recipes",
  description: "Free recipes from around the world",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className="dark">
          <NextTopLoader
            color="var(--green)"
            height={2}
            shadow="none"
            showSpinner={false}
          />
          <ToastContainer
            position="top-center"
            closeOnClick
            hideProgressBar={false}
            newestOnTop={true}
            draggable={true}
            theme="light"
            pauseOnHover={true}
            autoClose={3000}
          />
          {process.env.NODE_ENV === "production" && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-CTRTE5HR7K`}
              />
              <Script id="google-analytics">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
         
                  gtag('config', 'G-CTRTE5HR7K');
                `}
              </Script>
              <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5332831846915728`}
                crossorigin="anonymous"
              />
            </>
          )}
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
