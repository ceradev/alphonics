import Layout from "../../components/layouts/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
          Privacy Policy
        </h1>
        <div className="max-w-2xl mt-4 text-lg text-gray-800 animate-fade-in-up text-justify">
          <p className="mb-4">
            At Alphonics, accessible from www.alphonics.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Alphonics and how we use it.
          </p>
          <p className="mb-4">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us through email at
            info@alphonics.com
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-2 text-red-500">Log Files</h2>
          <p className="mb-4">
            Alphonics follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies do this.
          </p>
          <p className="mb-4">
            The information collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service Provider (ISP), date
            and time stamp, referring/exit pages, and possibly the number of
            clicks. These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users’ movement on the
            website, and gathering demographic information. Our Privacy Policy
            was created with the help of the{" "}
            <a
              href="https://www.privacypolicygenerator.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy Generator
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
