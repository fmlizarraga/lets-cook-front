import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

import '../assets/styles/footer.css';

export function Footer() {
  return (
    <div className="footer-content">
      <div className="subscription-notice">
        <h2>Subscribe via email</h2>
      </div>
      <div className="contact-links">
        <a href="#" className="footer-link pi pi-facebook"></a>
        <a href="#" className="footer-link pi pi-pinterest"></a>
        <a href="#" className="footer-link pi pi-twitter"></a>
        <a href="#" className="footer-link pi pi-instagram"></a>
      </div>
      <div className="subscription-form-container">
        <form>
          <div className="form-group">
            <label htmlFor="email">Enter your email here</label>
            <InputText id="email" />
          </div>
          <Button label="Subscribe now" />
        </form>
      </div>
      <div className="copyright-notice">
        <p>© 2029 by Let's Cook! Designed and developed by<a className="footer-link" href="https://github.com/fmlizarraga">Franco</a></p>
      </div>
    </div>
  );
};
