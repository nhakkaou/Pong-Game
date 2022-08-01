import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SocketContext } from "./Context/SocketContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext>
      <Component {...pageProps} />
    </SocketContext>
  );
}

export default MyApp;
