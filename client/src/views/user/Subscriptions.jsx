import { FaCheck } from "react-icons/fa";
import DefaultLayout from "../../components/layouts/DefaultLayout";
const Subscriptions = () => {
  return (
    <DefaultLayout>
      <div className="text-red-500 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
        <p className="text-black text-lg mb-6">
          Choose your plan and start enjoying the best music without ads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Premium Plans */}
          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Individual Premium</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Listen to music without ads
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Download songs to listen offline
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Listen to songs in any order
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Higher audio quality
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Organize the playback queue
              </li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Free trial for 1 month
            </button>
          </div>

          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Student Premium</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> 1 verified Premium account
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Discount for students who meet the requirements
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Cancel at any time
              </li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Free trial for 1 month
            </button>
          </div>

          <div className="border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Family Premium</h2>
            <p className="text-2xl font-bold mb-4">69,99 €/month</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Up to 6 Premium accounts
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Control content tagged as explicit
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Cancel at any time
              </li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Get Family Premium
            </button>
          </div>

          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Duo Premium</h2>
            <p className="text-2xl font-bold mb-4">49,99 €/month</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> 2 Premium accounts
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-500" /> Cancel at any time
              </li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Get Duo Premium
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Subscriptions;

