import "./Footer.css";

const Footer = () => {
  return (
    <section id="Footer">
        <p id="github-footer" className="footer-text">Created by <a href="https://github.com/rJefferyXie" className="footer-link" target="_blank" rel="noreferrer">Jeffery Xie</a></p>
        <p id="pokeapi-footer" className="footer-text">Powered by <a href="https://pokeapi.co/" className="footer-link" target="_blank" rel="noreferrer">Pokeapi</a></p>
    </section>
  );
};

export default Footer;
