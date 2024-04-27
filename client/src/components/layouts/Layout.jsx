import PropTypes from "prop-types";
import Header from "./headers/Header";
import { useState, useEffect } from "react";
import DefaultFooter from "./footers/DefaultFooter";

const Layout = ({ children }) => {
  const [isAuth, setIsAuth]  = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-b from-red-700 via-red-500 to-gray-300 py-4">
        <Header />
      </header>
      <main className="flex-grow bg-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      {!isAuth ? (
        <footer className="bg-gradient-to-b from-gray-300 via-red-500 to-red-700 py-3">
          <DefaultFooter />
        </footer>
      ) : null}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
