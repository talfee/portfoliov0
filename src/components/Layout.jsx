import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

export default function Layout({ children }) {
  return (
    <div className="page">
      <Header />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}
