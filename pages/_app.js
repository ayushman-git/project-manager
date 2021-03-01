import "../sass/main.scss";
import { AuthProvider } from "../auth/auth";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
