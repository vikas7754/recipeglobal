import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecipeGlobal - Free Recipes",
  description: "Free recipes from around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
  );
}
