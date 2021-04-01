import { Head } from "next/document";

const MetaTags = () => {
  return (
    <Head>
      {/* Normal tags */}
      <meta
        name="description"
        content="Proto is a project manager. You can create projects and track them."
      />
      <meta property="og:title" content="Proto - Project Manager" />

      {/* og tags */}
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Proto is a project manager. You can create projects and track them."
      />
      <meta
        property="og:image"
        content="https://proto-lilac.vercel.app/images/og.jpg"
      />
      <meta property="og:url" content="https://proto-lilac.vercel.app/" />
      <meta property="og:site_name" content="Proto" />

      {/* twitter tags */}
      <meta name="twitter:title" content="Proto - Project Manager" />
      <meta
        name="twitter:description"
        content="Proto is a project manager. You can create projects and track them."
      />
      <meta
        name="twitter:image"
        content="https://proto-lilac.vercel.app/images/og.jpg"
      />
    </Head>
  );
};

export default MetaTags;
