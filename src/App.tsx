import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

function LetsCookApp() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Gallery />
      </main>
      <footer></footer>
    </>
  )
}

export default LetsCookApp
