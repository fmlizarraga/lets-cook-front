import { Outlet } from "react-router-dom";
import { Footer, Header, LoaderStatus } from "../components";

export const Home = () => {
  return (
    <>
        <header>
          <Header />
        </header>
        <main>
          <LoaderStatus />
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
    </>
  )
};
