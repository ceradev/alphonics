import Layout from "../../components/layouts/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
          Contact Us
        </h1>
        <div className="mt-8 max-w-lg text-lg text-center">
          <p>
            If you have any questions, suggestions, or concerns, please feel
            free to contact us via email or phone. We&apos;re here to help!
          </p>
          <div className="mt-6">
            <p className="font-semibold">Email:</p>
            <a href="mailto:info@alphonics.com" className="text-red-500 hover:underline hover:text-red-700 transition duration-300 ease-in-out cursor-pointer">
              info@alphonics.com
            </a>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Phone:</p>
            <a  href="tel:+15551234567" className="text-red-500 hover:underline hover:text-red-700 transition duration-300 ease-in-out">+1 (555) 123-4567</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;