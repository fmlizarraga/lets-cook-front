import { Header } from "./components";
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primeicons/primeicons.css';
import AppRouter from "./router/AppRouter";

function LetsCookApp() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <AppRouter />
      </main>
      <footer />
    </>
  )
}

export default LetsCookApp;
