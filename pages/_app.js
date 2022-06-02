import "../styles/globals.css";
import { Nav } from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-screen h-screen">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
