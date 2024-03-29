import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css";
import themes from "devextreme/ui/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>NOTEThat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/pencil.png" />
      </Head>
      <Component {...pageProps} />;
    </>
  )
};

export default MyApp;
