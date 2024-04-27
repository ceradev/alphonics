import PropTypes from "prop-types";
import DefaultHeader from "./headers/DefaultHeader";
import DefaultFooter from "./footers/DefaultFooter";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-b from-red-700 via-red-500 to-gray-300 py-4">
        <DefaultHeader />
      </header>
      <main className="flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0 bg-gray-300">
        {children}
      </main>
      <footer className="bg-gradient-to-b from-gray-300 via-red-500 to-red-700 py-3">
        <DefaultFooter />
      </footer>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
