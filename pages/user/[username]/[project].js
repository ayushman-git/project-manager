import React from "react";
import nookies from "nookies";
import Navbar from "../../../components/Navbar/Navbar";
import { useRouter } from "next/router";

export default function project({ session }) {
  const router = useRouter();
  console.log(router);
  return (
    <div className="maxWidth">
      <Navbar image={session.picture} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const session = cookies.session;
    return {
      props: { session: JSON.parse(session) },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: null,
    };
  }
}
