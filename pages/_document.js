import Document, { Html, Main, NextScript } from "next/document";
import MetaTags from "../components/MetaTags";

export default class MyDoc extends Document {
  render() {
    return (
      <Html lang="en">
        <MetaTags />
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
