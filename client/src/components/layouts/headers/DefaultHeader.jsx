import logo from "../../../assets/images/logo-text.png";


const DefaultHeader = () => {

  return (
    <nav>
      <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center mr-4">
              <img
                className=" h-44 w-auto cursor-pointer hover:transition-transform duration-300 hover:transform hover:scale-110"
                src={logo}
                alt="Alphonics Logo"
                onClick={() => window.location.assign("/")}
              />
            </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default DefaultHeader;
