import PropTypes from "prop-types";
import Header from "./headers/Header";
import Footer from "./footers/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-b from-red-700 via-red-500 to-gray-300 py-4">
        <Header />
      </header>
      <main className="flex-grow bg-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
