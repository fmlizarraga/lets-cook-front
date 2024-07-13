import { Footer, Header, LoaderStatus } from "./components";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { BlogRepositoryProvider } from "./repository";
import LocalBlogRepository from "./repository/LocalBlogRepository";

import 'primereact/resources/themes/lara-dark-amber/theme.css';
import 'primeicons/primeicons.css';

function LetsCookApp() {
  const blogRepository = LocalBlogRepository;
  return (
    <>
      <Provider store={store} >
        <BlogRepositoryProvider repository={blogRepository}>
          <header>
            <Header />
          </header>
          <main>
            <LoaderStatus />
            <AppRouter />
          </main>
          <footer>
            <Footer />
          </footer>
        </BlogRepositoryProvider>
      </Provider>
    </>
  )
}

export default LetsCookApp;
