import { useEffect } from "react";
import { useRouter } from "next/router";
import { userAuth } from "../auth/auth";
import Head from "next/head";

import nookies from "nookies";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Landing/Hero/Hero";
import OpenSource from "../components/Landing/OpenSource/OpenSource";
import Footer from "../components/Landing/Footer/Footer";
import VideoBackground from "../components/Landing/VideoBackground/VideoBackground";

const Home = () => {
  const router = useRouter();
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      router.push("/user/" + user.displayName.split(" ")[0].toLowerCase());
    }
  }, [user]);

  return (
    <div style={{ position: "relative", backgroundColor: "black" }}>
      <Head>
        <title>Proto</title>
      </Head>
      <Navbar />
      <Hero />
      <OpenSource />
      <Footer />
      <VideoBackground />
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const { user } = cookies;
  if (user) {
    context.res.setHeader(
      "location",
      `/user/${user.split(" ")[0].toLowerCase()}`
    );
    context.res.statusCode = 302;
    return { props: {} };
  }
  return { props: {} };
}

export default Home;
