import { Header } from "./components";
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primeicons/primeicons.css';
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { BlogRepositoryProvider } from "./repository";
import LocalBlogRepository from "./repository/LocalBlogRepository";

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
            <AppRouter />
          </main>
          <footer />
        </BlogRepositoryProvider>
      </Provider>
    </>
  )
}

export default LetsCookApp;
