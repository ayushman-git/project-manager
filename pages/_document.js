import Document, { Html, Head, Main, NextScript } from "next/document";
import firebaseClient from "../auth/firebaseClient";

export default class MyDoc extends Document {
  render() {
    firebaseClient();
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
